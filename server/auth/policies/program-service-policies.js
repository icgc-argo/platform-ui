import { createPolicy, Check, RequestType, Masks } from '../authUtils';

const SERVICE = 'program_service.ProgramService';
const RPCS = {
  CreateProgram: 'CreateProgram',
  RemoveProgram: 'RemoveProgram',
  UpdateProgram: 'UpdateProgram',
  ListPrograms: 'ListPrograms',
  GetProgram: 'GetProgram',
  InviteUser: 'InviteUser',
  JoinProgram: 'JoinProgram',
  RemoveUser: 'RemoveUser',
  ListUser: 'ListUser',
  UpdateUser: 'UpdateUser',
};

export default [
  createPolicy(
    'ProgramService - CreateProgram - Write/Admin Scoped',
    context => {
      const check = Check(context);
      return (
        check.requestType(RequestType.GRPC) && check.service(SERVICE) && check.rpc(RPCS.GetUser)
      );
    },
    context =>
      Check(context)
        .jwt()
        .hasScope('program-service', [Masks.ADMIN, Masks.WRITE]),
    { error: 'Requires Program-Service Write Access' },
  ),
];
