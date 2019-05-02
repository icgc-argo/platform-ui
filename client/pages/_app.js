import React from "react";
import nextCookies from "next-cookies";
import Router from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

import { EGO_JWT_KEY, LOGIN_PAGE_PATH } from "global/constants";
import { NODE_ENV, ENVIRONMENTS } from "global/config";
import { isValidJwt } from "global/utils/egoJwt";

/**
 * Configuration structure for each page
 */
const DEFAULT_PAGE_CONFIG = {
  isPublic: false,
  isAccessible: () => true,
  getInitialProps: () => ({})
};

export const withPathConfigValidation = Page =>
  new Proxy(Page, {
    set: (page, prop, value) => {
      const typeInPrototype = typeof DEFAULT_PAGE_CONFIG[prop];
      if (typeInPrototype === "undefined") {
        console.warn(
          new Error(`property ${prop} is not a defined configuration for page`)
        );
      } else if (typeInPrototype !== typeof value) {
        console.warn(
          new Error(
            `expected type ${typeInPrototype} for page property ${prop} but received ${typeof value}`
          )
        );
      }
      page[prop] = value;
      return true;
    }
  });

const enforceLogin = ({ ctx }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  if (typeof window === "undefined") {
    ctx.res.redirect(loginRedirect);
  } else {
    Router.replace(loginRedirect);
  }
};

/**
 * Root level component that wraps every page
 */
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

// this makes egoJwt available to every page server-side
Root.getInitialProps = async ({ Component, ctx, router }) => {
  const { isPublic, isAccessible, getInitialProps } = {
    ...DEFAULT_PAGE_CONFIG,
    ...Component
  };

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
    const isProduction = NODE_ENV === ENVIRONMENTS.production;
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
