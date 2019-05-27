/*
 * This file dynamically generates a gRPC client from Ego.proto.
 * The content of Ego.proto is copied directly from: https://github.com/icgc-argo/argo-proto/blob/4e2aeda59eb48b7af20b462aef2f04ef5d0d6e7c/ProgramService.proto
 */
import grpc from 'grpc';
import * as loader from '@grpc/proto-loader';

import { PROGRAM_SERVICE_ROOT } from '../../config';

const PROTO_PATH = __dirname + '/ProgramService.proto';
const packageDefinition = loader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition).program_service;

const programService = new proto.ProgramService(
  PROGRAM_SERVICE_ROOT,
  grpc.credentials.createInsecure(),
);

/*
 * Read Methods
 */
const getProgram = async (id, jwt = null) => {
  return await new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();

    if (jwt) {
      meta.add('jwt', jwt);
    }

    programService.getProgram({ id }, meta, (err, response) =>
      err ? reject(err) : resolve(response),
    );
  });
};

const listPrograms = async (jwt = null) => {
  return await new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();

    if (jwt) {
      meta.add('jwt', jwt);
    }

    programService.listPrograms({}, meta, (err, response) =>
      err ? reject(err) : resolve(response),
    );
  });
};

/*
 * Write Methods
 */
const createProgram = async (program, jwt = null) => {
  return await new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();

    if (jwt) {
      meta.add('jwt', jwt);
    }

    programService.createProgram({ program }, meta, (err, response) =>
      err ? reject(err) : resolve(response),
    );
  });
};
export default { getProgram, listPrograms, createProgram };
