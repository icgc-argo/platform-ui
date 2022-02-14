import { omit } from 'lodash';
import { useEffect } from 'react';
import queryString from 'query-string';
import Router from 'next/router';
import { NextPageContext } from 'next';

import getUserToken from 'global/utils/auth/getUserToken';
import refreshJwt from 'global/utils/auth/refreshJwt';
import { sleep, OAUTH_QUERY_PARAM_NAME } from 'global/utils/common';
import { getPermissionsFromToken, isValidJwt } from 'global/utils/egoJwt';
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import { PageWithConfig } from 'global/utils/pages/types';

import { AuthState } from './authReducer';

const useAuthentication = ({
  authState,
  ctx,
  Component,
  forceLogout,
  handleUserToken,
  isLoadingLoginRedirect,
  setLoadingLoginRedirect,
}: {
  authState: AuthState;
  ctx: NextPageContext;
  Component: PageWithConfig;
  forceLogout: any;
  handleUserToken: any;
  isLoadingLoginRedirect: boolean;
  setLoadingLoginRedirect: any;
}) => {
  useEffect(() => {
    async function handleAuthentication() {
      const { userToken = '' } = authState;
      if (userToken) {
        if (!isValidJwt(userToken)) {
          const newJwt = (await refreshJwt().catch(forceLogout)) as string;
          if (isValidJwt(newJwt)) {
            handleUserToken(newJwt);
          } else {
            forceLogout();
          }
        }
      } else if (isLoadingLoginRedirect) {
        const egoToken = await getUserToken(this.props, forceLogout);
        if (isValidJwt(egoToken)) {
          handleUserToken(egoToken);
          const { redirect } = ctx.query;
          if (redirect) {
            const redirectFromURL = decodeURIComponent(redirect as string);
            const obj = queryString.parseUrl(redirectFromURL || '');
            const target = queryString.stringifyUrl({
              ...obj,
              query: omit(obj.query, OAUTH_QUERY_PARAM_NAME),
            });
            Router.push(target);
          } else {
            const redirectFromPermissions = getDefaultRedirectPathForUser(
              getPermissionsFromToken(egoToken),
            );
            Router.push(redirectFromPermissions);
          }
        } else {
          forceLogout();
        }
        await sleep();
        setLoadingLoginRedirect(false);
      } else if (!Component.isPublic) {
        forceLogout();
      }
    }
    handleAuthentication();
  }, []);
};

export default useAuthentication;
