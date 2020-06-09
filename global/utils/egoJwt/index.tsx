/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
