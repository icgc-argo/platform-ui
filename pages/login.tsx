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

import LoginPage from 'components/pages/login';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Router from 'next/router';
import React from 'react';
import queryString from 'query-string';

import { createRedirectURL } from 'global/utils/common';
import { getPermissionsFromToken } from 'global/utils/egoJwt';

export default createPage<{ redirect: string; egoJwt: string }>({
  isPublic: true,
  getInitialProps: async ({ query, egoJwt, res }) => {
    // temporarily disabling login path, may be restored in future: https://github.com/icgc-argo/platform-ui/issues/1487
    if (res) {
      res.writeHead(301, {
        Location: '/',
      });
      res.end();
    } else {
      Router.push('/');
    }

    return {};

    // const { redirect } = query;
    // if (egoJwt && res) {
    //   // TODO: res.redirect breaks if jwt exists and '/login' route is hard refreshed
    //   res.redirect(
    //     String(redirect || getDefaultRedirectPathForUser(getPermissionsFromToken(egoJwt))),
    //   );
    // }
    // return {
    //   redirect,
    //   egoJwt,
    // };
  },
})(({ redirect, egoJwt }) => {
  const [fullRedirect, setFullRedirect] = React.useState('');

  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getDefaultRedirectPathForUser(getPermissionsFromToken(egoJwt)));
    }
    if (redirect && !egoJwt) {
      const parsedRedirect = queryString.parseUrl(redirect);
      const existingQuery = queryString.stringify(parsedRedirect.query);

      setFullRedirect(
        createRedirectURL({
          origin: location.origin,
          path: parsedRedirect.url,
          query: existingQuery,
        }),
      );
    }
  }, []);
  return <LoginPage redirect={fullRedirect} />;
});
