import { createPolicy, Check, RequestType } from '../authUtils';

const SERVICE = 'bio.overture.ego.grpc.UserService';
const RPCS = { ListUsers: 'ListUsers', GetUser: 'GetUser' };

export default [
  createPolicy(
    'Ego - ListUsers - Admin Access Only',
    context => {
      const check = Check(context);
      return (
        check.requestType(RequestType.GRPC) && check.service(SERVICE) && check.rpc(RPCS.ListUsers)
      );
    },
    context =>
      Check(context)
        .jwt()
        .userType('ADMIN'),
    { error: 'Restricted to admin users' },
  ),
];
