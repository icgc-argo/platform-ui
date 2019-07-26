// @flow
import * as React from 'react';
import fetch from 'isomorphic-fetch';
import urlJoin from 'url-join';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { decodeToken } from 'global/utils/egoJwt';
import { EGO_JWT_KEY } from 'global/constants';
import { EGO_API_ROOT, EGO_CLIENT_ID } from 'global/config';

const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);

type UseEgoTokenInput = {
  onError?: (error: Error) => void,
};
export default ({ onError = () => {} }: UseEgoTokenInput = {}) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [resolving, setResolving] = React.useState<boolean>(false);
  const logOut = () => {
    Cookies.remove(EGO_JWT_KEY);
    setToken(null);
    Router.push('/');
  };
  React.useEffect(() => {
    setResolving(true);
    const existingToken = Cookies.get(EGO_JWT_KEY);
    if (existingToken) {
      setToken(existingToken);
      setResolving(false);
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
          setResolving(false);
        })
        .catch(err => {
          console.warn('err: ', err);
          setResolving(false);
          onError(err);
        });
    }
  }, []);
  return new Proxy<{
    /* proxy to handle computed properties */
    token: typeof token,
    resolving: typeof resolving,
    logOut: typeof logOut,
    data: $Call<typeof decodeToken, string> | null,
  }>(
    { token, resolving, logOut, data: null },
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
};
