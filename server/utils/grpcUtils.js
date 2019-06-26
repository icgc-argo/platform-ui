import grpc from 'grpc';

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
