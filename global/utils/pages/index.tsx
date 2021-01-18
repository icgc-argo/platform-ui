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

import * as React from 'react';
import orderBy from 'lodash/orderBy';
import {
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  USER_PAGE_PATH,
  PROGRAM_MANAGE_PATH,
  PROGRAM_SHORT_NAME_PATH,
  RDPC_PATH,
  PROGRAM_DASHBOARD_PATH,
} from 'global/constants/pages';
import {
  isDccMember,
  isRdpcMember,
  canReadSomeProgram,
  getReadableProgramShortNames,
  getAuthorizedProgramScopes,
} from '../egoJwt';
import { PageConfigProps, PageWithConfig } from './types';

export const getDefaultRedirectPathForUser = (
  permissions: string[],
  useStatic: boolean = false,
): string => {
  if (isDccMember(permissions)) {
    return PROGRAMS_LIST_PATH;
  } else if (canReadSomeProgram(permissions)) {
    const readableProgramShortNames = getReadableProgramShortNames(
      getAuthorizedProgramScopes(permissions),
    );
    const orderedProgramShortNames = orderBy(readableProgramShortNames);
    return useStatic
      ? PROGRAM_DASHBOARD_PATH
      : PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, orderedProgramShortNames[0]);
  } else {
    return USER_PAGE_PATH;
  }
};
type CreatePageConfigs = {
  isPublic?: PageConfigProps['isPublic'];
  isAccessible?: PageConfigProps['isAccessible'];
  getInitialProps?: PageConfigProps['getInitialProps'];
  getGqlQueriesToPrefetch?: PageConfigProps['getGqlQueriesToPrefetch'];
  startWithGlobalLoader?: PageConfigProps['startWithGlobalLoader'];
};
export const createPage = <P extends {} = any>({
  isPublic,
  isAccessible,
  getInitialProps,
  getGqlQueriesToPrefetch,
  startWithGlobalLoader,
}: CreatePageConfigs) => (
  page: React.ComponentType<P> & CreatePageConfigs = () => <div>Here's a page</div>,
): PageWithConfig => {
  page.isPublic = isPublic || false;
  page.isAccessible = isAccessible || (async () => true);
  page.getGqlQueriesToPrefetch = getGqlQueriesToPrefetch || (async () => []);
  page.getInitialProps = getInitialProps || (async () => []);
  page.startWithGlobalLoader = startWithGlobalLoader || false;
  return page as PageWithConfig;
};
