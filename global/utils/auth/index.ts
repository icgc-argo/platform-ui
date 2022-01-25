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

import queryString from 'query-string';
import { get } from 'lodash';
import urlJoin from 'url-join';
import { createRedirectURL } from '../common';
import { getConfig } from '../../config';
import { LOGIN_PAGE_PATH } from '../../constants/pages';

const { EGO_URL } = getConfig();

export const createLoginURL = (asPath: string): string => {
  // split URL into path & query.
  // there could be a second level of queries inside the first &
  // pageContext.query is unreliable.
  const queryIndex = asPath.indexOf('?');
  const path = queryIndex === -1 ? asPath : asPath.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : asPath.slice(queryIndex + 1);
  const queryParsed = queryString.parse(query);

  const redirectParam = get(queryParsed, 'redirect') as string;

  if (redirectParam) {
    const parsedRedirect = queryString.parseUrl(redirectParam);
    const existingQuery = queryString.stringify(parsedRedirect.query);

    const queryRedirect = createRedirectURL({
      origin: location.origin,
      path: parsedRedirect.url,
      query: existingQuery,
    });
    return urlJoin(EGO_URL, queryRedirect);
  } else if (asPath === '/' || asPath === LOGIN_PAGE_PATH) {
    return EGO_URL;
  } else {
    const redirect = createRedirectURL({
      origin: location.origin,
      path,
      query,
    });
    return urlJoin(EGO_URL, redirect);
  }
};
