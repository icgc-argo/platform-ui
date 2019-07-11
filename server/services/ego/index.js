/*
 * This file dynamically generates a gRPC client from Ego.proto.
 * The content of Ego.proto is copied directly from: https://github.com/overture-stack/ego/blob/develop/src/main/proto/Ego.proto
 */
import grpc from 'grpc';
import * as loader from '@grpc/proto-loader';
import { EGO_ROOT_GRPC } from '../../config';

import { grpcAuthWrapper } from '../../auth';

const PROTO_PATH = __dirname + '/Ego.proto';
const packageDefinition = loader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition).bio.overture.ego.grpc;

// const userService = new proto.UserService(EGO_ROOT_GRPC, grpc.credentials.createInsecure());
const userService = grpcAuthWrapper(
  new proto.UserService(EGO_ROOT_GRPC, grpc.credentials.createInsecure()),
);

const getUser = async (id, jwt = null) => {
  return await new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();

    if (jwt) {
      meta.add('jwt', jwt);
    }

    userService.getUser({ id }, meta, (err, response) => (err ? reject(err) : resolve(response)));
  });
};

const listUsers = async ({ pageNum, limit, sort, groups, query } = {}, jwt = null) => {
  const payload = {
    page: { page_number: pageNum, page_size: limit, sort },
    group_ids: groups,
    query: { value: query },
  };

  const meta = new grpc.Metadata();
  if (jwt) {
    meta.add('jwt', jwt);
  }

  return await new Promise((resolve, reject) =>
    userService.listUsers(payload, meta, (err, response) =>
      err ? reject(err) : resolve(response),
    ),
  );
};

export default { getUser, listUsers };
