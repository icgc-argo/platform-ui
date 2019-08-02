import grpc from 'grpc';
import retry from 'retry';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';
import transform from 'lodash/transform';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import has from 'lodash/has';

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
  resolve(response);
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

// Convert nested grpc object to gql object. Make sure your gql definitions matches proto definitions
export function grpcToGql(obj) {
  return transform(
    obj,
    (result, value, key) => {
      let v = value;
      if (keys(value).length === 1 && has(value, 'value')) {
        v = value.value;
      }
      v = timestampToDateTime(v);
      result[camelCase(key)] = isObject(v) && !isArray(v) ? grpcToGql(v) : v;
    },
    {},
  );
}

// Convert a Timestamp object to ISO datetime string, or return the same one if it's not a Timestamp
function timestampToDateTime(maybeTimestamp) {
  const isTimestamp =
    keys(maybeTimestamp).length === 2 &&
    has(maybeTimestamp, 'seconds') &&
    has(maybeTimestamp, 'nanos');
  if (isTimestamp) {
    const { seconds, nanos } = maybeTimestamp;
    return new Date(seconds * 1000 + nanos / 1000000).toISOString();
  }
  return maybeTimestamp;
}
