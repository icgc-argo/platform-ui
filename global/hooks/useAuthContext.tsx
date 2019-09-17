import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, isValidJwt } from 'global/utils/egoJwt';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import * as React from 'react';
import urlJoin from 'url-join';
import getConfig from 'next/config';

type UseEgoTokenInput = {
  onError?: (error: Error) => void;
};

type T_AuthContext = {
  token?: string;
  logOut: () => void;
  updateToken: () => Promise<string | void>;
  data: ReturnType<typeof decodeToken> | null;
};

const AuthContext = React.createContext<T_AuthContext>({});

export function AuthProvider({ egoJwt, children }: { egoJwt?: string; children: Node }) {
  const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig().publicRuntimeConfig;

  const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);
  const tokenRefreshUrl = urlJoin(
    EGO_API_ROOT,
    `/api/oauth/update-ego-token?client_id=${EGO_CLIENT_ID}`,
  );

  const [token, setToken] = React.useState<string>(egoJwt);
  const router = useRouter();
  const logOut = () => {
    Cookies.remove(EGO_JWT_KEY);
    setToken(null);
    router.push('/');
  };
  React.useEffect(() => {
    const existingToken = Cookies.get(EGO_JWT_KEY);
    if (existingToken) {
      setToken(existingToken);
    } else {
      fetch(egoLoginUrl, {
        credentials: 'include',
        headers: { accept: '*/*' },
        body: null,
        method: 'GET',
        mode: 'cors',
      })
        .then(res => res.text())
        .then(egoToken => {
          decodeToken(egoToken);
          Cookies.set(EGO_JWT_KEY, egoToken);
          setToken(egoToken);
        })
        .catch(err => {
          console.warn('err: ', err);
        });
    }
  }, []);
  React.useEffect(() => {
    if (token && !isValidJwt(token)) {
      logOut();
    }
  });

  const updateToken = () => {
    return fetch(tokenRefreshUrl, {
      credentials: 'include',
      headers: { Authorization: `Bearer ${token || ''}` },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.text())
      .then(egoToken => {
        Cookies.set(EGO_JWT_KEY, egoToken);
        setToken(egoToken);
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
