//@flow
// $FlowFixMe
import createEgoUtils from '@icgc-argo/ego-token-utils/dist/lib/ego-token-utils';
import { memoize, isEmpty } from 'lodash';

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

export const decodeToken = memoize<[?string], EgoJwtData | null>(egoJwt =>
  egoJwt ? TokenUtils.decodeToken(egoJwt) : null,
);

export const isValidJwt = (egoJwt: ?string): boolean => !!egoJwt && TokenUtils.isValidJwt(egoJwt);

export const isDccMember = (egoJwt: ?string): boolean => !!egoJwt && TokenUtils.isDccMember(egoJwt);

export const isRdpcMember = (egoJwt: ?string): boolean =>
  !!egoJwt && TokenUtils.isRdpcMember(egoJwt);

export const canReadSomeProgram = (egoJwt: ?string): boolean =>
  !!egoJwt && TokenUtils.canReadSomeProgram(egoJwt);

export const canWriteSomeProgram = (egoJwt: ?string): boolean =>
  !!egoJwt && TokenUtils.canWriteSomeProgram(egoJwt);

export const parseScope = (scope: string): PermissionScopeObj => TokenUtils.parseScope(scope);

export const serializeScope = (scopeObj: PermissionScopeObj): string =>
  TokenUtils.serializeScope(scopeObj);

export const getAuthorizedProgramScopes = (egoJwt: string): Array<PermissionScopeObj> =>
  TokenUtils.getReadableProgramScopes(egoJwt);

export const canReadProgram = (args: { egoJwt: ?string, programId: string }): boolean =>
  !!args.egoJwt && TokenUtils.canReadProgram(args);

export const canWriteProgram = (args: { egoJwt: ?string, programId: string }): boolean =>
  !!args.egoJwt && TokenUtils.canWriteProgram(args);

export const isProgramAdmin = (args: { egoJwt: ?string, programId: string }): boolean =>
  !!args.egoJwt && TokenUtils.isProgramAdmin(args);

export const getReadableProgramShortNames = (egoJwt: string): Array<string> =>
  TokenUtils.getReadableProgramShortNames(egoJwt);
