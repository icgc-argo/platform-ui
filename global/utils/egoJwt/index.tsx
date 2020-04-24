import memoize from 'lodash/memoize';

import createEgoUtils from '@icgc-argo/ego-token-utils';
import { getConfig } from 'global/config';

const TokenUtils = createEgoUtils(getConfig().EGO_PUBLIC_KEY);

type PermissionScopeObj = {
  policy: string;
  permission: 'READ' | 'WRITE' | 'ADMIN' | 'DENY';
};

export const decodeToken = memoize((egoJwt?: string) =>
  egoJwt ? TokenUtils.decodeToken(egoJwt) : null,
);

export const isValidJwt = (egoJwt: string) => !!egoJwt && TokenUtils.isValidJwt(egoJwt);

export const getPermissionsFromToken: (egoJwt: string) => string[] = egoJwt =>
  isValidJwt(egoJwt) ? TokenUtils.getPermissionsFromToken(egoJwt) : [];

export const isDccMember = (permissions: string[]): boolean => TokenUtils.isDccMember(permissions);

export const isRdpcMember = (permissions: string[]): boolean =>
  TokenUtils.isRdpcMember(permissions);

export const canReadSomeProgram = (permissions: string[]): boolean =>
  TokenUtils.canReadSomeProgram(permissions);

export const canWriteSomeProgram = (permissions: string[]): boolean =>
  TokenUtils.canWriteSomeProgram(permissions);

export const parseScope = (scope: string): PermissionScopeObj => TokenUtils.parseScope(scope);

export const serializeScope = (scopeObj: PermissionScopeObj): string =>
  TokenUtils.serializeScope(scopeObj);

export const getAuthorizedProgramScopes = (permissions: string[]): Array<PermissionScopeObj> =>
  TokenUtils.getReadableProgramScopes(permissions);

export const canReadProgram = (args: { permissions: string[]; programId: string }): boolean =>
  TokenUtils.canReadProgram(args);

export const canWriteProgram = (args: { permissions: string[]; programId: string }): boolean =>
  TokenUtils.canWriteProgram(args);

export const isProgramAdmin: (args: {
  permissions: string[];
  programId: string;
}) => boolean = args => TokenUtils.isProgramAdmin(args);

export const getReadableProgramShortNames = (scopes: PermissionScopeObj[]): Array<string> =>
  TokenUtils.getReadableProgramShortNames(scopes);

export const canReadProgramData: (args: {
  permissions: string[];
  programId: string;
}) => boolean = args => TokenUtils.canReadProgramData(args);

export const canWriteProgramData: (args: {
  permissions: string[];
  programId: string;
}) => boolean = args => TokenUtils.canWriteProgramData(args);

export const canReadSomeProgramData: (permissions: string[]) => boolean = permissions =>
  TokenUtils.canReadSomeProgramData(permissions);

export const canWriteSomeProgramData: (permissions: string[]) => boolean = permissions =>
  TokenUtils.canWriteSomeProgramData(permissions);

export const getReadableProgramDataScopes: (
  permissions: string[],
) => PermissionScopeObj[] = permissions => TokenUtils.getReadableProgramDataScopes(permissions);

export const getWritableProgramDataScopes: (
  permissions: string[],
) => PermissionScopeObj[] = permissions => TokenUtils.getWritableProgramDataScopes(permissions);

export const getReadableProgramDataNames: (permissions: string[]) => string[] = permissions =>
  TokenUtils.getReadableProgramDataNames(permissions);

export const getWritableProgramDataNames: (permissions: string[]) => string[] = permissions =>
  TokenUtils.getWritableProgramDataNames(permissions);

export const isDataSubmitter: (args: { permissions: string[]; programId: string }) => boolean = ({
  permissions,
  programId,
}) => canWriteProgramData({ permissions, programId }) && canReadProgram({ permissions, programId });

export const isCollaborator: (args: { permissions: string[]; programId: string }) => boolean = ({
  permissions,
  programId,
}) =>
  canReadProgramData({ permissions, programId }) &&
  canReadProgram({ permissions, programId }) &&
  !canWriteProgramData({ permissions, programId });
