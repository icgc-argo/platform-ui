import LoginPage from 'components/pages/login';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Router from 'next/router';
import React from 'react';
import { trimEnd } from 'lodash';

export default createPage<{ redirect: string; egoJwt: string }>({
  isPublic: true,
  getInitialProps: async ({ query, egoJwt, res }) => {
    const { redirect } = query;
    if (egoJwt && res) {
      // TODO: res.redirect breaks if jwt exists and '/login' route is hard refreshed
      res.redirect(String(redirect || getDefaultRedirectPathForUser(egoJwt)));
    }
    return {
      redirect,
      egoJwt,
    };
  },
})(({ redirect, egoJwt }) => {
  const [fullRedirect, setFullRedirect] = React.useState('');

  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getDefaultRedirectPathForUser(egoJwt));
    }
    if (redirect && !egoJwt) {
      // google login will not work if any query params are passed in redirect_uri
      const trimmedRedirect = trimEnd((redirect || '').split('?')[0], '/');
      setFullRedirect(`&redirect_uri=${location.origin}${trimmedRedirect}`);
    }
  }, []);

  return <LoginPage redirect={fullRedirect} />;
});
