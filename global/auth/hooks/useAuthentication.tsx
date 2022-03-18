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

import { omit } from 'lodash';
import { Dispatch, SetStateAction, useEffect } from 'react';
import queryString from 'query-string';
import Router from 'next/router';
import { NextPageContext } from 'next';

import getJwt from 'global/auth/utils/getJwt';
import refreshJwt from 'global/auth/utils/refreshJwt';
import { sleep, OAUTH_QUERY_PARAM_NAME } from 'global/utils/common';
import { getPermissionsFromToken, isValidJwt } from 'global/utils/egoJwt';
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import { PageWithConfig } from 'global/utils/pages/types';

import { AuthState } from 'global/auth/utils/authReducer';

const useAuthentication = ({
  authState,
  ctx,
  Component,
  forceLogout,
  handleJwt,
  isLoadingLoginRedirect,
  setLoadingLoginRedirect,
}: {
  authState: AuthState;
  ctx: NextPageContext;
  Component: PageWithConfig;
  forceLogout: () => void;
  handleJwt: (token: string) => void;
  isLoadingLoginRedirect: boolean;
  setLoadingLoginRedirect: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    async function handleAuthentication() {
      const { userJwt = '' } = authState;

      if (userJwt) {
        if (!isValidJwt(userJwt)) {
          const newJwt = (await refreshJwt().catch(forceLogout)) as string;
          // TODO is the code below redundant?
          if (isValidJwt(newJwt)) {
            handleJwt(newJwt);
          } else {
            forceLogout();
          }
        }
      } else if (isLoadingLoginRedirect) {
        const egoToken = await getJwt(forceLogout);
        if (isValidJwt(egoToken)) {
          handleJwt(egoToken);
          const { redirect } = ctx.query;
          if (redirect) {
            const redirectFromURL = decodeURIComponent(redirect as string);
            const obj = queryString.parseUrl(redirectFromURL || '');
            const target = queryString.stringifyUrl({
              ...obj,
              query: omit(obj.query, OAUTH_QUERY_PARAM_NAME),
            });
            Router.push(target);
          } else {
            const redirectFromPermissions = getDefaultRedirectPathForUser(
              getPermissionsFromToken(egoToken),
            );
            Router.push(redirectFromPermissions);
          }
        } else {
          forceLogout();
        }
        await sleep();
        setLoadingLoginRedirect(false);
      } else if (!Component.isPublic) {
        forceLogout();
      }
    }
    handleAuthentication();
  }, []);
};

export default useAuthentication;
