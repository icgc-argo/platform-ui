// @flow
import * as React from 'react';
import fetch from 'isomorphic-fetch';
import urlJoin from 'url-join';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { decodeToken, isValidJwt } from 'global/utils/egoJwt';
import { EGO_JWT_KEY } from 'global/constants';
import { EGO_API_ROOT, EGO_CLIENT_ID } from 'global/config';
import { useRouter } from 'next/router';

const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);

type UseEgoTokenInput = {
  onError?: (error: Error) => void,
};

type T_AuthContext = {
  token: ?string,
  logOut: void => void,
  data: $Call<typeof decodeToken, ?string> | null,
};

const AuthContext = React.createContext<T_AuthContext | null>(null);

export function AuthProvider({ egoJwt, children }: { egoJwt: ?string, children: React.Node }) {
  const [token, setToken] = React.useState<?string>(egoJwt);
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

  const authData = new Proxy<T_AuthContext>(
    { token, logOut, data: null },
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
