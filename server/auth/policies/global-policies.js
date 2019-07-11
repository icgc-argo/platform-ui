import { createPolicy, Check, RequestType } from '../authUtils';

export default [
  createPolicy(
    'Global - GRPC - Must have Valid JWT',
    context => Check(context).requestType(RequestType.GRPC),
    context =>
      Check(context)
        .jwt()
        .isValid(),
    { error: 'Missing Valid JWT' },
  ),
];
