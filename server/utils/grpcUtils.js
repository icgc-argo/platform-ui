import grpc from 'grpc';
import retry from 'retry';

/* When building gRPC requests we frequently need to provide a value as:
 * { value: "asdf" }
 */
export const wrapValue = value => ({
  value,
});

export const getAuthMeta = jwt => {
  const meta = new grpc.Metadata();

  if (jwt) {
    meta.add('jwt', jwt);
  }

  return meta;
};

export const getGrpcMethodsNames = grpcService =>
  Object.getOwnPropertyNames(grpcService.__proto__).filter(
    name => !(name.search(/^\$/) > -1 || name === 'constructor'),
  );

export const withRetries = (
  grpcClient,
  retryConfig = {
    retries: 5,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
    randomize: true,
  },
  errorCodes = [],
) => {
  //converts to a hasmap for run-time performance
  const STREAM_REMOVED_ERROR = 14;
  const methodNames = getGrpcMethodsNames(grpcClient).reduce(
    (acc, methodName) => ({
      ...acc,
      [methodName]: methodName,
    }),
    {},
  );
  const methodWithRetry = (methodName, originalMethod) => (payload, metadata, cb) => {
    const operation = retry.operation(retryConfig);
    operation.attempt(currentAttempt => {
      originalMethod(payload, metadata, (err, response) => {
        if (operation.retry(err) && [...errorCodes, STREAM_REMOVED_ERROR].includes(err.code)) {
          console.warn(
            `grpc method ${methodName} failed with errorCode ${
              err.code
            }, retrying after ${currentAttempt} attempt(s)`,
          );
          return;
        }
        cb(err, response);
      });
    });
  };
  return new Proxy(grpcClient, {
    get: (obj, key) => {
      const originalMethod = obj[key].bind(obj);
      if (methodNames[key]) {
        return methodWithRetry(key, originalMethod);
      } else {
        return originalMethod;
      }
    },
  });
};
