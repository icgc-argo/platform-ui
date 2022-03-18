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
import { ServerResponse } from 'http';
import Router from 'next/router';
import queryString from 'query-string';
import { get, isEmpty } from 'lodash';

import { OAUTH_QUERY_PARAM_NAME } from 'global/utils/common';

export const redirectTo = (res: ServerResponse, url: string) => {
  if (res) {
    // server-side
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } else {
    // client-side
    Router.push(url);
  }
};

export const createLogoutRedirectUrl = (ctxAsPath: string | undefined): string =>
  // login path for redirect may be restored in future, see https://github.com/icgc-argo/platform-ui/issues/1487
  ctxAsPath ? `/?redirect=${encodeURI(ctxAsPath)}` : '/';

export const redirectForcedLogout = (ctx: NextPageContext) => {
  const redirectPath = createLogoutRedirectUrl(ctx.asPath);
  redirectTo(ctx.res as ServerResponse, redirectPath);
};

export const redirectOauth = (ctx: NextPageContext) => {
  // redirect from /?isOauth=true due to encoded URL causing 404 error
  const checkOauth = (query: NextPageContext['query']) =>
    get(query, OAUTH_QUERY_PARAM_NAME) === 'true';

  const isOauth = checkOauth(
    isEmpty(ctx.query)
      ? queryString.parseUrl(decodeURIComponent(ctx.asPath as string)).query
      : ctx.query,
  );

  if (isOauth) {
    const strippedPath = queryString.exclude(decodeURIComponent(ctx.asPath), [
      OAUTH_QUERY_PARAM_NAME,
    ]);
    redirectTo(ctx.res, `/logged-in?redirect=${encodeURI(strippedPath)}`);
  }
};
