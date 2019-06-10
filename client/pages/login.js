//@flow
import React from 'react';
import urlJoin from 'url-join';
import Router from 'next/router';

import GoogleLogin from 'uikit/SocialLoginButtons/GoogleLogin';
import { EGO_API_ROOT, EGO_CLIENT_ID } from 'global/config';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';
import { getRedirectPathForUser } from 'global/utils/pages';
import { createPage } from 'global/utils/pages';

export default createPage({
  isPublic: true,
  getInitialProps: async ({ query, egoJwt, res }) => {
    const { redirect } = query;
    if (egoJwt && res) {
      res.redirect(redirect || getRedirectPathForUser(egoJwt));
    }
    return {
      redirect,
      egoJwt,
    };
  },
})(({ redirect, egoJwt }) => {
  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getRedirectPathForUser(egoJwt));
    } else {
      if (redirect) {
        localStorage.setItem(LOCAL_STORAGE_REDIRECT_KEY, redirect);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
      }
    }
  }, []);
  return (
    <div>
      <GoogleLogin
        id="google-login"
        link={urlJoin(EGO_API_ROOT, `/oauth/login/google?client_id=${EGO_CLIENT_ID}`)}
      />
    </div>
  );
});
