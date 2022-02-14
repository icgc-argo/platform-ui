/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';

import { getConfig } from 'global/config';
import { getPermissionsFromToken } from 'global/utils/egoJwt';
import { PageWithConfig } from 'global/utils/pages/types';
import { AuthState } from './authReducer';

const useAuthorization = ({
  authState,
  Component,
  ctx,
  loggingOut,
}: {
  authState: AuthState;
  Component: PageWithConfig;
  ctx: NextPageContext;
  loggingOut: boolean;
}) => {
  const [isAuthorized, setAuthorized] = useState(false);
  const { AUTH_DISABLED } = getConfig();

  useEffect(() => {
    async function handleAuthorization() {
      const { userToken = '' } = authState;
      const unauthorized = Component.isAccessible
        ? !(await Component.isAccessible({
            egoJwt: userToken,
            ctx,
            initialPermissions: getPermissionsFromToken(userToken),
          }))
        : false;

      const authorizationCheck = unauthorized && !AUTH_DISABLED && !loggingOut;
      setAuthorized(!authorizationCheck);
    }
    handleAuthorization();
  }, [authState, ctx.asPath]);

  return isAuthorized;
};

export default useAuthorization;
