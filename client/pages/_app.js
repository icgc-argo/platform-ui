import React from "react";
import nextCookies from "next-cookies";
import jwtDecode from "jwt-decode";

import { EGO_JWT_KEY } from "global/constants";

const Root = ({ Component, pageProps, egoJwt }) => {
  return <Component {...{ egoJwt, ...pageProps }} />;
};

Root.getInitialProps = async ({ Component, ctx, router }) => {
  const egoJwt = nextCookies(ctx)[EGO_JWT_KEY];
  const targetRoute = router.route;
  if (egoJwt) {
    try {
      const data = jwtDecode(egoJwt);
      console.log(data);
    } catch (err) {
      router.replace(`/login?redirect=${encodeUri(targetRoute)}`);
    }
  }

  const pageProps = await (Component.getInitialProps
    ? Component.getInitialProps({ ...ctx, egoJwt })
    : {});
  return {
    egoJwt,
    pageProps
  };
};

export default Root;
