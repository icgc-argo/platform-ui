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

import React from 'react';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';
import { createRedirectURL } from 'global/utils/common';
import { get } from 'lodash';
import usePageContext from './usePageContext';
import queryString from 'query-string';
import urlJoin from 'url-join';
import { getConfig } from 'global/config';

function useAuthRedirect() {
  console.log('auth redirect function');
  const { EGO_URL } = getConfig();

  const { asPath: path, query } = usePageContext();
  const [loginPath, setLoginPath] = React.useState('');

  React.useEffect(() => {
    console.log('auth redirect use effect');
    const redirect = get(query, 'redirect') as string;
    if (redirect) {
      const parsedRedirect = queryString.parseUrl(redirect);
      const existingQuery = queryString.stringify(parsedRedirect.query);

      const queryRedirect = createRedirectURL({
        origin: location.origin,
        path: parsedRedirect.url,
        query: existingQuery,
      });

      setLoginPath(urlJoin(EGO_URL, queryRedirect));
    } else if (path === '/' || path === LOGIN_PAGE_PATH) {
      setLoginPath(EGO_URL);
    } else {
      const queryString = path.split('?')[1] || '';
      const pathRoot = path.split('?')[0];

      const redirect = createRedirectURL({
        origin: location.origin,
        path: pathRoot,
        query: queryString,
      });
      setLoginPath(urlJoin(EGO_URL, redirect));
    }
  }, [path, query]);

  return loginPath;
}

export default useAuthRedirect;
