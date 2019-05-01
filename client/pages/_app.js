import React from "react";
import nextCookies from "next-cookies";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import Cookies from "js-cookie";

import { EGO_JWT_KEY } from "global/constants";

const isValidJwt = jwt => {
  try {
    const { exp } = jwtDecode(jwt);
    return exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

// this makes egoJwt available to every page client-side
const Root = ({ Component, pageProps, egoJwt, unauthorized }) => {
  const logOut = () => {
    Cookies.remove(EGO_JWT_KEY);
    Router.push("/");
  };
  React.useEffect(() => {
    if (egoJwt && !isValidJwt(egoJwt)) {
      logOut();
    }
  });
  return (
    <div>
      <div>
        {/* this button is just for demo */}
        <button onClick={logOut}>LOG OUT</button>
      </div>
      {unauthorized ? (
        // placeholder, needs design
        "You are not authorized"
      ) : (
        <Component {...{ egoJwt, ...pageProps }} />
      )}
    </div>
  );
};

// this makes egoJwt available to every page server-side
Root.getInitialProps = async ({ Component, ctx, router }) => {
  const egoJwt = nextCookies(ctx)[EGO_JWT_KEY];
  const { res } = ctx;
  if (egoJwt) {
    try {
      if (!isValidJwt(egoJwt)) {
        throw new Error("invalid token");
      }
    } catch (err) {
      res.clearCookie(EGO_JWT_KEY);
      router.replace(`/login?redirect=${encodeURI(ctx.asPath)}`);
    }
  }

  const pageProps = await (Component.getInitialProps
    ? Component.getInitialProps({ ...ctx, egoJwt })
    : {});

  return {
    egoJwt,
    pageProps,
    unauthorized:
      Component.canBeAccessed && !Component.canBeAccessed({ egoJwt, ctx })
  };
};

export default Root;
