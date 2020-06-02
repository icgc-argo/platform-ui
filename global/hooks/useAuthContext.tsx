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
import { decodeToken, isValidJwt, getPermissionsFromToken } from 'global/utils/egoJwt';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import * as React from 'react';
import urlJoin from 'url-join';
import refreshJwt from 'global/utils/refreshJwt';

type T_AuthContext = {
  token?: string;
  logOut: (config?: { toRoot?: boolean }) => void;
  updateToken: () => Promise<string | void>;
  data: ReturnType<typeof decodeToken> | null;
  fetchWithEgoToken: typeof fetch;
  permissions: string[];
  isLoggingOut: boolean;
};

const AuthContext = React.createContext<T_AuthContext>({
  token: undefined,
  logOut: () => {},
  updateToken: async () => {},
  data: null,
  fetchWithEgoToken: fetch,
  permissions: [],
  isLoggingOut: false,
});

export function AuthProvider({
  egoJwt,
  children,
  initialPermissions,
}: {
  egoJwt?: string;
  children: React.ReactElement;
  initialPermissions: string[];
}) {
  const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();
  const updateTokenUrl = urlJoin(
    EGO_API_ROOT,
    `/api/oauth/update-ego-token?client_id=${EGO_CLIENT_ID}`,
  );

  const [token, setTokenState] = React.useState<string>(egoJwt);
  const [permissions, setPermissions] = React.useState<Array<string>>(initialPermissions);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const router = useRouter();
  const setToken = (token: string) => {
    Cookies.set(EGO_JWT_KEY, token);
    setTokenState(token);
    setPermissions(getPermissionsFromToken(token));
  };
  const removeToken = () => {
    Cookies.remove(EGO_JWT_KEY);
    setTokenState(null);
    setPermissions([]);
  };
  const logOut: T_AuthContext['logOut'] = (
    config = {
      toRoot: true,
    },
  ) => {
    // this will be reset to false when user logs in again, and AuthContext is re-instantiated
    setIsLoggingOut(true);
    removeToken();
    if (config.toRoot) {
      router.push('/');
    }
  };

  const fetchWithEgoToken: T_AuthContext['fetchWithEgoToken'] = async (uri, options) => {
    const modifiedOption = {
      ...(options || {}),
      headers: { ...((options && options.headers) || {}), authorization: `Bearer ${token || ''}` },
    };

    if (token && !isValidJwt(token)) {
      const newJwt = (await refreshJwt()) as string;
      if (isValidJwt(newJwt)) {
        setToken(newJwt);
      } else {
        logOut();
      }
      return fetch(uri, {
        ...modifiedOption,
        headers: { ...modifiedOption.headers, authorization: `Bearer ${newJwt}` },
      });
    } else {
      return fetch(uri, modifiedOption);
    }
  };

  if (token && !isValidJwt(token)) {
    if (token !== egoJwt && isValidJwt(egoJwt)) {
      setToken(egoJwt);
    } else {
      logOut();
    }
  }

  const updateToken = () => {
    return fetch(updateTokenUrl, {
      credentials: 'include',
      headers: { Authorization: `Bearer ${token || ''}` },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.text())
      .then(egoToken => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        return egoToken;
      })
      .catch(err => {
        console.warn('err: ', err);
        throw err;
      });
  };

  const authData = {
    token,
    logOut,
    data: token ? decodeToken(token || '') : null,
    updateToken,
    fetchWithEgoToken,
    permissions,
    isLoggingOut,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
