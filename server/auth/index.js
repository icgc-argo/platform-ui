import { get } from 'lodash';

import { POLICIES } from './policies';
import { RequestType } from './authUtils';
import ExtendableError from '../utils/ExtendableError';

export class AuthorizationRulesError extends ExtendableError {
  constructor(message, rule) {
    super(`Authorization Failure${message ? ` - ${message}` : ''}`);
    this.rule = rule;
  }
}

const checkAuth = context => {
  // Get policies via selectors
  const policies = POLICIES.filter(policy => policy.select(context));

  // Get first failure by testing the selected policies validations
  const failure = policies.find(policy => !policy.validate(context));

  if (failure !== undefined) {
    throw new AuthorizationRulesError(failure.error, failure.name);
  }
  return true;
};

/* GRPC */
const grpcContext = (message, meta, { rpc, service }) => ({
  request: {
    type: RequestType.GRPC,
    service,
    rpc,
  },
  content: {
    message,
    meta,
  },
});

export const grpcAuthWrapper = service => {
  // Get service name (including package):
  //  Each method name has the package, Service, and method name in a string like: "/com.package.name.ServiceName/MethodName"
  const serviceName = get(Object.keys(service.$method_names), '[0]').match(/[a-zA-Z.]+/)[0];

  const methodNames = Object.getOwnPropertyNames(service.__proto__).filter(
    name => !(name.search(/^\$/) > -1 || name === 'constructor'),
  );

  // For each method, we need to copy it to a new hidden name in the proto so we can overwrite the original:
  methodNames.forEach(name => {
    const hiddenName = `__${name}__`;
    service.__proto__[hiddenName] = service.__proto__[name];
    service.__proto__[name] = function(message, meta, callback) {
      const authorized = checkAuth(grpcContext(message, meta, { rpc: name, service: serviceName }));
      if (authorized) {
        return service[hiddenName](message, meta, callback);
      } else {
        throw new AuthorizationRulesError('Unknown Authorization Issue');
      }
    };
  });

  return service;
};
