import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, isValidJwt } from 'global/utils/egoJwt';
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
};

const AuthContext = React.createContext<T_AuthContext>({
  token: undefined,
  logOut: () => {},
  updateToken: async () => {},
  data: null,
  fetchWithEgoToken: fetch,
});
let refreshJwtPromise = null;

export function AuthProvider({
  egoJwt,
  children,
}: {
  egoJwt?: string;
  children: React.ReactElement;
}) {
  const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();
  const updateTokenUrl = urlJoin(
    EGO_API_ROOT,
    `/api/oauth/update-ego-token?client_id=${EGO_CLIENT_ID}`,
  );

  const [token, setTokenState] = React.useState<string>(egoJwt);
  const router = useRouter();
  const setToken = (token: string) => {
    Cookies.set(EGO_JWT_KEY, token);
    setTokenState(token);
  };
  const removeToken = () => {
    Cookies.remove(EGO_JWT_KEY);
    setTokenState(null);
  };
  const logOut: T_AuthContext['logOut'] = (
    config = {
      toRoot: true,
    },
  ) => {
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

    if (token && !isValidJwt(token) && !refreshJwtPromise) {
      refreshJwtPromise = refreshJwt(token);
      const newJwt = await refreshJwtPromise;
      if (isValidJwt(newJwt)) {
        setToken(newJwt);
      } else {
        logOut();
      }
      refreshJwtPromise = null;
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
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
