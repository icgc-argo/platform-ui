import LoginPage from 'components/pages/login';
import { createPage, getDefaultRedirectPathForUser } from 'global/utils/pages';
import Router from 'next/router';
import React from 'react';
import queryString from 'query-string';

import { createRedirectURL } from 'global/utils/common';
import { getPermissionsFromToken } from 'global/utils/egoJwt';

export default createPage<{ redirect: string; egoJwt: string }>({
  isPublic: true,
  getInitialProps: async ({ query, egoJwt, res }) => {
    // temporarily disabling login path, may be restored in future: https://github.com/icgc-argo/platform-ui/issues/1487
    if (res) {
      res.writeHead(301, {
        Location: '/',
      });
      res.end();
    }

    return {};

    // const { redirect } = query;
    // if (egoJwt && res) {
    //   // TODO: res.redirect breaks if jwt exists and '/login' route is hard refreshed
    //   res.redirect(
    //     String(redirect || getDefaultRedirectPathForUser(getPermissionsFromToken(egoJwt))),
    //   );
    // }
    // return {
    //   redirect,
    //   egoJwt,
    // };
  },
})(({ redirect, egoJwt }) => {
  const [fullRedirect, setFullRedirect] = React.useState('');

  React.useEffect(() => {
    if (egoJwt) {
      Router.replace(redirect || getDefaultRedirectPathForUser(getPermissionsFromToken(egoJwt)));
    }
    if (redirect && !egoJwt) {
      const parsedRedirect = queryString.parseUrl(redirect);
      const existingQuery = queryString.stringify(parsedRedirect.query);

      setFullRedirect(
        createRedirectURL({
          origin: location.origin,
          path: parsedRedirect.url,
          query: existingQuery,
        }),
      );
    }
  }, []);
  return <LoginPage redirect={fullRedirect} />;
});
