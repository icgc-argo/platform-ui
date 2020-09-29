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
import { useRouter } from 'next/router';

export const getParams = (router: ReturnType<typeof useRouter>): { [k: string]: string } | null => {
  const queryString = router.asPath.split('?')[1] || '';
  const currentQueryEntries = [...new URLSearchParams(queryString).entries()];
  return currentQueryEntries.length
    ? currentQueryEntries.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
    : {};
};

const getSanitizedValue = (v: string): null | undefined | string => (v ? v : null);

export const useHook = <T>(
  key: string,
  initialValue: T,
  {
    pushNavigation = false,
    serialize,
    deSerialize,
  }: {
    pushNavigation?: boolean;
    serialize: (val: T) => string;
    deSerialize: (val: string | null | undefined) => T;
  },
) => {
  const router = useRouter();
  const currentQuery = getParams(router);
  const [firstRender, setFirstRender] = React.useState(true);
  const [previousQuery, setPreviousQuery] = React.useState(null);
  console.log('router', router.asPath);

  React.useEffect(() => {
    const hasQueryParms = !!router.asPath.split('?')[1];
    const previousValue = !hasQueryParms && previousQuery;
    console.log(
      'has q params',
      hasQueryParms,
      'prev val',
      previousValue,
      'pv query params',
      previousQuery,
    );

    const query = {
      [key]: serialize(initialValue),
      ...currentQuery,
    };

    setPreviousQuery(query);

    const urlParams = new window.URLSearchParams(previousValue ? previousValue : query).toString();
    const newPath = `${router.asPath.split('?')[0]}?${urlParams}`;
    console.log('current query', currentQuery, 'url params', urlParams);

    if (firstRender) {
      router.replace(router.pathname, newPath).then(() => setFirstRender(false));
    } else if (!hasQueryParms) {
      router.replace(router.pathname, newPath);
    }
  }, [router.asPath]);

  const setUrlState = (value: T) => {
    const newPath = `${router.asPath.split('?')[0]}?${new window.URLSearchParams({
      ...currentQuery,
      [key]: serialize(value),
    }).toString()}`;
    if (pushNavigation) {
      router.push(router.pathname, newPath);
    } else {
      router.replace(router.pathname, newPath);
    }
  };

  const deserializeValue = (v: string) => {
    const sanitized = getSanitizedValue(v);
    return deSerialize(sanitized);
  };

  return [firstRender ? initialValue : deserializeValue(currentQuery[key]), setUrlState] as [
    T,
    typeof setUrlState,
  ];
};

export default useHook;
