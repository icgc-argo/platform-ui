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

import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import useAuthContext from 'global/hooks/useAuthContext';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Cookies from 'js-cookie';
import React from 'react';
import { css } from 'uikit';
import DnaLoader from 'uikit/DnaLoader';
import useTheme from 'uikit/utils/useTheme';
import urlJoin from 'url-join';
import { getPermissionsFromToken } from 'global/utils/egoJwt';

export default createPage({ isPublic: true })(() => {
  const theme = useTheme();
  const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();

  const redirect = (token: string) => {
    location.assign(getDefaultRedirectPathForUser(getPermissionsFromToken(token)));
  };

  React.useEffect(() => {
    const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);
    fetch(egoLoginUrl, {
      credentials: 'include',
      headers: { accept: '*/*' },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.text())
      .then(egoToken => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        redirect(egoToken);
      })
      .catch(err => {
        console.warn('err: ', err);
        redirect(null);
      });
  });

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 58px 1fr;
        min-height: 100vh;
      `}
    >
      <div
        css={css`
          background-color: ${theme.colors.primary};
        `}
      />
      <div
        css={css`
          background-color: ${theme.colors.grey_4};
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <DnaLoader />
      </div>
      {/*       <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
});
