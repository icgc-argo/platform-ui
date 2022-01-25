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

import { createContext, ReactElement, useContext, useState } from 'react';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, getPermissionsFromToken, isValidJwt } from 'global/utils/egoJwt';

type T_AuthContext = {
  data: ReturnType<typeof decodeToken> | null;
  egoJwt?: string;
  isLoggingOut: boolean;
  logOut: (path?: string) => void;
  permissions: string[];
  setToken: (token: string) => void;
  updateToken: () => Promise<string | void>;
};

const AuthContext = createContext<T_AuthContext>({
  data: null,
  egoJwt: undefined,
  isLoggingOut: false,
  logOut: () => {},
  permissions: [],
  setToken: (token: string) => {},
  updateToken: async () => {},
});

export function AuthProvider({
  egoJwt,
  children,
}: {
  egoJwt?: T_AuthContext['egoJwt'];
  children: ReactElement;
}) {
  const { EGO_UPDATE_URL } = getConfig();
  const router = useRouter();
  const permissions: T_AuthContext['permissions'] = getPermissionsFromToken(egoJwt);
  const [isLoggingOut, setIsLoggingOut] = useState<T_AuthContext['isLoggingOut']>(false);

  const setToken: T_AuthContext['setToken'] = (token: string) => {
    Cookies.set(EGO_JWT_KEY, token);
  };

  const removeToken = () => {
    Cookies.remove(EGO_JWT_KEY);
  };

  const logOut: T_AuthContext['logOut'] = async (path) => {
    // this will be reset to false when user logs in again, and AuthContext is re-instantiated
    setIsLoggingOut(true);
    removeToken();
    if (path) {
      let { url, query } = queryString.parseUrl(path);
      // Temp until we can remove private filters
      delete query.filters;
      router.push({ pathname: url, query: { ...query, loggingOut: true } }).then(router.reload);
    } else {
      router.push('/').then(router.reload);
    }
  };

  if (egoJwt && !isValidJwt(egoJwt)) {
    logOut();
  }

  const updateToken: T_AuthContext['updateToken'] = () => {
    return fetch(EGO_UPDATE_URL, {
      credentials: 'include',
      headers: { Authorization: `Bearer ${egoJwt || ''}` },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.text())
      .then((egoToken) => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        return egoToken;
      })
      .catch((err) => {
        console.warn('err: ', err);
        throw err;
      });
  };

  const authContextValue: T_AuthContext = {
    data: egoJwt ? decodeToken(egoJwt || '') : null,
    egoJwt,
    isLoggingOut,
    logOut,
    permissions,
    setToken,
    updateToken,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return useContext(AuthContext);
}
