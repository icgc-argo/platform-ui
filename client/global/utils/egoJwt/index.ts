import { memoize } from 'lodash';
import TokenUtils from '@icgc-argo/ego-token-utils';

export const decodeToken: typeof TokenUtils.decodeToken = memoize(TokenUtils.decodeToken);
export const isValidJwt = TokenUtils.isValidJwt;
export const isDccMember = TokenUtils.isDccMember;
export const isRdpcMember = TokenUtils.isRdpcMember;
export const parseScope = TokenUtils.parseScope;
export const serializeScope = TokenUtils.serializeScope;
export const getAuthorizedProgramScopes = TokenUtils.getReadableProgramScopes;
export const canReadProgram = TokenUtils.canReadProgram;
export const canWriteProgram = TokenUtils.canWriteProgram;
export const isProgramAdmin = TokenUtils.isProgramAdmin;
export const canReadSomeProgram = TokenUtils.canReadSomeProgram;
