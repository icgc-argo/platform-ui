//@flow
import jwtDecode from 'jwt-decode';
import { get, memoize } from 'lodash';

// $FlowFixMe
import createEgoUtils from '@icgc-argo/ego-token-utils/dist/lib/ego-token-utils';

const TokenUtils = createEgoUtils();
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
  permission: 'READ' | 'WRITE' | 'ADMIN' | 'DENY',
};

export const decodeToken = memoize<[string], EgoJwtData>(egoJwt => TokenUtils.decodeToken(egoJwt));

export const isValidJwt = (egoJwt: string): boolean => TokenUtils.isValidJwt(egoJwt);

export const isDccMember = (egoJwt: string): boolean => TokenUtils.isDccMember(egoJwt);

export const isRdpcMember = (egoJwt: string): boolean => TokenUtils.isRdpcMember(egoJwt);

export const canReadSomeProgram = (egoJwt: string): boolean =>
  TokenUtils.canReadSomeProgram(egoJwt);

export const canWriteSomeProgram = (egoJwt: string): boolean =>
  TokenUtils.canWriteSomeProgram(egoJwt);

export const parseScope = (scope: string): PermissionScopeObj => TokenUtils.parseScope(scope);

export const serializeScope = (scopeObj: PermissionScopeObj): string =>
  TokenUtils.serializeScope(scopeObj);

export const getAuthorizedProgramScopes = (egoJwt: string): Array<PermissionScopeObj> =>
  TokenUtils.getReadableProgramScopes(egoJwt);

export const canReadProgram = (args: { egoJwt: string, programId: string }): boolean =>
  TokenUtils.canReadProgram(args);

export const canWriteProgram = (args: { egoJwt: string, programId: string }): boolean =>
  TokenUtils.canWriteProgram(args);

export const isProgramAdmin = (args: { egoJwt: string, programId: string }): boolean =>
  TokenUtils.isProgramAdmin(args);

export const getReadableProgramShortNames = (egoJwt: string): Array<string> =>
  TokenUtils.getReadableProgramShortNames(egoJwt);
