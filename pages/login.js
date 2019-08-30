//@flow
import LoginPage from 'components/pages/login';
import { LOCAL_STORAGE_REDIRECT_KEY } from 'global/constants';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Router from 'next/router';
import React from 'react';

export default createPage({
  isPublic: true,
  getInitialProps: async ({ query, egoJwt, res }) => {
    const { redirect } = query;
    if (egoJwt && res) {
      res.redirect(redirect || getDefaultRedirectPathForUser(egoJwt));
    }
    return {
      redirect,
      egoJwt,
    };
  },
})(({ redirect, egoJwt }) => {
  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getDefaultRedirectPathForUser(egoJwt));
    } else {
      if (redirect) {
        localStorage.setItem(LOCAL_STORAGE_REDIRECT_KEY, redirect);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_REDIRECT_KEY);
      }
    }
  }, []);
  return <LoginPage />;
});
