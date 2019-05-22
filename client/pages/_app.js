// @flow
import * as React from "react";
import nextCookies from "next-cookies";
import Router from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

import { ThemeProvider } from "uikit";
import { EGO_JWT_KEY, LOGIN_PAGE_PATH } from "global/constants";
import { NODE_ENV, ENVIRONMENTS } from "global/config";
import { isValidJwt, decodeToken } from "global/utils/egoJwt";
import type {
  PageWithConfig,
  GetInitialPropsContext
} from "global/utils/pages";

import NavBar from "components/NavBar";

const enforceLogin = ({ ctx }: { ctx: GetInitialPropsContext }) => {
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
const Root = (props: {
  Component: React.ComponentType<any>,
  pageProps: {},
  egoJwt: string,
  unauthorized: boolean,
  isProduction: boolean,
  error: Error
}) => {
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

  React.useEffect(() => {
    /**
     * Enables convenience debugging back-door
     */
    try {
      const userData = decodeToken(props.egoJwt);
      if (
        userData.context.user.type === "ADMIN" &&
        localStorage.getItem("DEBUGGING")
      ) {
        window.env = process.env;
      }
    } catch (err) {}
  }, []);

  return (
    <ThemeProvider>
      <div>
        <NavBar />
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
    </ThemeProvider>
  );
};

// this makes egoJwt available to every page server-side
Root.getInitialProps = async ({
  Component,
  ctx,
  router
}: {
  Component: PageWithConfig,
  ctx: GetInitialPropsContext,
  router: any
}) => {
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
    if (!Component.isPublic) {
      enforceLogin({ ctx });
    }
  }

  try {
    const unauthorized = !(await Component.isAccessible({ egoJwt, ctx }));
    const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });
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
