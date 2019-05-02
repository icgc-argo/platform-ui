import React from "react";
import nextCookies from "next-cookies";
import Router from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

import { EGO_JWT_KEY, LOGIN_PAGE_PATH } from "global/constants";
import { NODE_ENV, ENVIRONMENTS } from "global/config";
import { isValidJwt } from "global/utils/egoJwt";

// this makes egoJwt available to every page client-side
const Root = props => {
  const {
    Component,
    pageProps,
    egoJwt,
    unauthorized,
    isProduction,
    error
  } = props;
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
        <Link href="/">Home</Link>
        <button onClick={logOut}>LOG OUT</button>
      </div>
      {error ? (
        isProduction ? (
          <div>
            Something went wrong, please refresh the page or try again later
          </div>
        ) : (
          <pre>{error.stack || error.message}</pre>
        )
      ) : unauthorized ? (
        "You are not authorized"
      ) : (
        <Component {...{ egoJwt, ...pageProps }} />
      )}
    </div>
  );
};

const enforceLogin = ({ ctx }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  if (typeof window === "undefined") {
    ctx.res.redirect(loginRedirect);
  } else {
    Router.replace(loginRedirect);
  }
};

// this makes egoJwt available to every page server-side
Root.getInitialProps = async ({ Component, ctx, router }) => {
  const {
    isPublic = false,
    isAccessible = () => true,
    getInitialProps = () => ({})
  } = Component;

  const egoJwt = nextCookies(ctx)[EGO_JWT_KEY];
  const { res } = ctx;
  if (egoJwt) {
    try {
      if (!isValidJwt(egoJwt)) {
        throw new Error("invalid token");
      }
    } catch (err) {
      res.clearCookie(EGO_JWT_KEY);
      router.replace(`${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`);
    }
  } else {
    if (!isPublic) {
      enforceLogin({ ctx });
    }
  }

  try {
    const unauthorized = !(await isAccessible({ egoJwt, ctx }));
    const pageProps = await getInitialProps({ ...ctx, egoJwt });
    const isProduction = NODE_ENV === environments.production;
    return {
      egoJwt,
      pageProps,
      unauthorized,
      isProduction
    };
  } catch (error) {
    return { egoJwt, error };
  }
};

export default Root;
