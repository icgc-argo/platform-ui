import { get, isEmpty } from 'lodash';

export const RequestType = {
  GRPC: 'grpc',
};

export const Masks = {
  ADMIN: 'ADMIN',
  WRITE: 'WRITE',
  READ: 'READ',
};

export const Check = context => ({
  requestType: type => get(context, 'request.type') === type,
  service: service => get(context, 'request.service', '').toLowerCase() === service.toLowerCase(),
  rpc: rpc => get(context, 'request.rpc', '').toLowerCase() === rpc.toLowerCase(),

  jwt: () => {
    const encodedToken = get(context, 'content.meta', {}).get('jwt');
    const token = encodedToken;
    return {
      content: () => token,
      isValid: () => !isEmpty(token), //TODO: validate
      userType: type => true, //type => get(token, 'context.user.type', '') === type,
      hasScope: (policy, masks) =>
        masks.find(mask => get(token, 'scope', []).includes(`${policy}.${mask}`)) ? true : false,
    };
  },
});

export const createPolicy = (name, select, validate, { description = '', error = '' } = {}) => {
  return { name, description, select, validate, error };
};
