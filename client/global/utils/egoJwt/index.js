//@flow
import jwtDecode from 'jwt-decode';
import { get, memoize } from 'lodash';

import { asEnum } from '../common';

const PERMISSIONS: {
  READ: string,
  WRITE: string,
  ADMIN: string,
  DENY: string,
} = {
  READ: 'READ',
  WRITE: 'WRITE',
  ADMIN: 'ADMIN',
  DENY: 'DENY',
};
const DCC_PREFIX = 'program-service.WRITE';
const RDPC_PREFIX = 'RDPC-';
const PROGRAM_PREFIX = 'PROGRAM-';
const PROGRAM_DATA_PREFIX = 'PROGRAMDATA-';

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

type PermissionScopeObj = {
  policy: string,
  permission: $Values<typeof PERMISSIONS>,
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
    return permissions.some(p => p.includes(DCC_PREFIX));
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

export const parseScope = (scope: string): PermissionScopeObj => {
  const permission = scope.split('.')[1];
  if (Object.values(PERMISSIONS).includes(permission)) {
    return {
      policy: scope.split('.')[0],
      permission,
    };
  } else {
    throw new Error(`invalid scope: ${scope}`);
  }
};

export const serializeScope = (scopeObj: PermissionScopeObj): string =>
  `${scopeObj.policy}.${scopeObj.permission}`;

export const getAuthorizedProgramScopes = (egoJwt: string): Array<PermissionScopeObj> => {
  const data = decodeToken(egoJwt);
  const permissions = data.context.user.permissions;
  const programPermissions = permissions.filter(p => {
    const policy = p.split('.')[0];
    const output =
      policy.indexOf(PROGRAM_PREFIX) === 0 && policy.indexOf(PROGRAM_DATA_PREFIX) !== 0;
    return output;
  });
  return programPermissions.reduce((acc, p) => {
    const scopeObj = parseScope(p);
    if (
      [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.ADMIN].includes(scopeObj.permission) &&
      ![PERMISSIONS.DENY].includes(scopeObj.permission)
    ) {
      acc.push(scopeObj);
    }
    return acc;
  }, []);
};

export const canReadProgram = (args: { egoJwt: string, programId: string }): boolean => {
  const authorizedProgramScopes = getAuthorizedProgramScopes(args.egoJwt);
  return authorizedProgramScopes.some(({ policy }) => policy.includes(args.programId));
};

export const canWriteProgram = (args: { egoJwt: string, programId: string }): boolean => {
  const authorizedProgramScopes = getAuthorizedProgramScopes(args.egoJwt);
  return authorizedProgramScopes.some(
    ({ policy, permission }) =>
      policy.includes(args.programId) &&
      [PERMISSIONS.WRITE, PERMISSIONS.ADMIN].includes(permission),
  );
};

export const isProgramAdmin = (args: { egoJwt: string, programId: string }): boolean => {
  return canWriteProgram(args);

  /** TODO: switch to below logic when .ADMIN scope is available */

  // const authorizedProgramScopes = getAuthorizedProgramScopes(args.egoJwt);
  // return authorizedProgramScopes.some(
  //   ({ policy, permission }) => policy.includes(args.programId) && permission === PERMISSIONS.ADMIN,
  // );
};
