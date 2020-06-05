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

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import urlJoin from 'url-join';
import createInMemoryCache from './createInMemoryCache';
import { getConfig } from 'global/config';

// if/when this is used, check how ApplicationRoot ApolloClient implements a
// custom fetch with ego authorization headers, and verify the fetch call and
// authorization headers are being properly updated when a jwt is refreshed.
export default (queries: Array<{ query: any; variables?: { [key: string]: any } }>) => async (
  egoJwt?: string,
) => {
  const { GATEWAY_API_ROOT } = getConfig();
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: urlJoin(GATEWAY_API_ROOT, '/graphql'),
      fetch: fetch,
      headers: egoJwt
        ? {
            authorization: `Bearer ${egoJwt}`,
          }
        : {},
    }),
    cache: createInMemoryCache(),
  });
  await Promise.all(
    queries.map(({ query, variables }) =>
      apolloClient.query({
        query,
        variables,
      }),
    ),
  );
  return apolloClient.extract();
};
