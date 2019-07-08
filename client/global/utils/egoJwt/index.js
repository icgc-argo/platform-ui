//@flow
import jwtDecode from 'jwt-decode';
import { get, memoize } from 'lodash';

import { asEnum } from '../common';

const PERMISSIONS = asEnum(
  {
    READ: 'READ',
    WRITE: 'WRITE',
    ADMIN: 'ADMIN',
    DENY: 'DENY',
  },
  { name: 'Ego permission' },
);
const DCC_PREFIX = 'DCC_';
const RDPC_PREFIX = 'RDPC_PREFIX_';
const PROGRAM_PREFIX = 'PROGRAM_';
const PROGRAM_DATA_PREFIX = 'PROGRAM_DATA_';

type EgoJwtData = {
  iat: number,
  exp: number,
  sub: string,
  iss: string,
  aud: string[],
  jti: string,
  context: {
    scope: string[],
    user: {
      name: string,
      email: string,
      status: 'APPROVED' | 'DISABLED' | 'PENDING' | 'REJECTED',
      firstName: string,
      lastName: string,
      createdAt: number,
      lastLogin: number,
      preferredLanguage: ?string,
      type: 'ADMIN' | 'USER',
      permissions: string[],
    },
  },
  scope: string[],
};

export const decodeToken = memoize<[string], EgoJwtData>(egoJwt => {
  return jwtDecode(egoJwt);
});

export const isValidJwt = (egoJwt: string) => {
  try {
    const { exp } = decodeToken(egoJwt);
    return exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

export const isDccMember = (egoJwt: string) => {
  try {
    const data = decodeToken(egoJwt);
    const permissions = data.context.user.permissions;
    const dccPermissions = permissions.filter(p => {
      const policy = p.split('.')[0];
      return policy.indexOf(DCC_PREFIX) === 0;
    });
    const isMember =
      dccPermissions.some(p =>
        [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN].includes(p.split('.')[1]),
      ) && !dccPermissions.some(p => [PERMISSIONS.DENY].includes(p.split('.')[1]));
    return isMember;
  } catch (err) {
    return false;
  }
};

export const isRdpcMember = (egoJwt: string) => {
  try {
    const data = decodeToken(egoJwt);
    const permissions = data.context.user.permissions;
    const rdpcPermissions = permissions.filter(p => {
      const policy = p.split('.')[0];
      return policy.indexOf(RDPC_PREFIX) === 0;
    });
    const isMember =
      rdpcPermissions.some(p =>
        [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN].includes(p.split('.')[1]),
      ) && !rdpcPermissions.some(p => [PERMISSIONS.DENY].includes(p.split('.')[1]));
    return isMember;
  } catch (err) {
    return false;
  }
};

export const getAuthorizedProgramPolicies = (egoJwt: string) => {
  const data = decodeToken(egoJwt);
  const permissions = data.context.user.permissions;
  const programPermissions = permissions.filter(p => {
    const policy = p.split('.')[0];
    const output =
      policy.indexOf(PROGRAM_PREFIX) === 0 && policy.indexOf(PROGRAM_DATA_PREFIX) !== 0;
    return output;
  });
  return programPermissions.reduce((acc: string[], p) => {
    const permission = p.split('.')[1];
    const policy = p.split('.')[0];
    if (
      [(PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN)].includes(permission) &&
      ![PERMISSIONS.DENY].includes(permission)
    ) {
      acc.push(policy);
    }
    return acc;
  }, []);
};

export const hasAccessToProgram = ({
  egoJwt,
  programId,
}: {
  egoJwt: string,
  programId: string,
}) => {
  const authorizedProgramPolicies = getAuthorizedProgramPolicies(egoJwt);
  return authorizedProgramPolicies.some(policy => policy.includes(programId));
};

export const isProgramAdmin = (args: { egoJwt: string, programId: string }) => {
  const authorizedProgramPolicies = getAuthorizedProgramPolicies(args.egoJwt);
  return true;
};
