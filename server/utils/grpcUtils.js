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

export const defaultPromiseCallback = (resolve, reject, serviceName) => (err, response) => {
  if (err) {
    console.log(`GRPC error - ${serviceName}: ${err}`);
    reject(err);
  }
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
  const STREAM_REMOVED_CODE = 2;
  const STREAM_REMOVED_DETAILS = 'Stream removed';
  const methodNames = getGrpcMethodsNames(grpcClient).reduce(
    //converts to a hasmap for run-time performance
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
        if (
          err &&
          err.code === STREAM_REMOVED_CODE &&
          err.details === STREAM_REMOVED_DETAILS &&
          operation.retry(err)
        ) {
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
    get: (client, methodName) => {
      const originalValue = client[methodName];
      if (typeof originalValue === 'function') {
        const originalMethod = originalValue.bind(client);
        if (methodNames[methodName]) {
          return methodWithRetry(methodName, originalMethod);
        } else {
          return originalMethod;
        }
      } else {
        return originalValue;
      }
    },
  });
};
