import { getConfig } from 'global/config';
import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, isValidJwt } from 'global/utils/egoJwt';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import * as React from 'react';
import urlJoin from 'url-join';

type T_AuthContext = {
  token?: string;
  logOut: (config?: { toRoot?: boolean }) => void;
  updateToken: () => Promise<string | void>;
  data: ReturnType<typeof decodeToken> | null;
};

const AuthContext = React.createContext<T_AuthContext>({
  token: undefined,
  logOut: () => {},
  updateToken: async () => {},
  data: null,
});

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

  const [token, setToken] = React.useState<string>(egoJwt);
  const router = useRouter();
  const logOut: T_AuthContext['logOut'] = (
    config = {
      toRoot: true,
    },
  ) => {
    Cookies.remove(EGO_JWT_KEY);
    setToken(null);
    if (config.toRoot) {
      router.push('/');
    }
  };

  // checks for updated egoJwt from refresh
  if (token !== egoJwt) {
    if (!isValidJwt(token) && isValidJwt(egoJwt)) {
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

  const authData = new Proxy<T_AuthContext>(
    { token, logOut, data: null, updateToken },
    {
      get: (obj, key) => {
        switch (key) {
          case 'data':
            return token ? decodeToken(token || '') : null;
          default:
            return obj[key];
        }
      },
    },
  );

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
