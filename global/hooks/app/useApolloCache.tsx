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

import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';
import { useEffect, useState } from 'react';
import { GqlQueriesToPrefetch, PageWithConfig } from 'global/utils/pages/types';
import { NextPageContext } from 'next';

const useApolloCache = ({
  Component,
  ctx,
  userToken = '',
}: {
  Component: PageWithConfig;
  ctx: NextPageContext;
  userToken: string;
}) => {
  const [apolloCache, setApolloCache] = useState({});

  useEffect(() => {
    async function handleApolloCache() {
      let graphqlQueriesToCache: GqlQueriesToPrefetch;
      try {
        graphqlQueriesToCache = Component.getGqlQueriesToPrefetch
          ? await Component.getGqlQueriesToPrefetch({ ...ctx, egoJwt: userToken })
          : [];
        const newApolloCache = graphqlQueriesToCache
          ? await getApolloCacheForQueries(graphqlQueriesToCache)(userToken)
          : {};
        setApolloCache(newApolloCache);
      } catch (e) {
        setApolloCache({});
        console.log(e);
      }
    }
    handleApolloCache();
  }, []);

  return apolloCache;
};

export default useApolloCache;
