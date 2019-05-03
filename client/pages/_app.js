// @flow
import * as React from "react";
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
type PageConfigProps = {
  isPublic: boolean,
  isAccessible: Function,
  getInitialProps: Function
};
type PageWithConfig = PageConfigProps & React.ComponentType<any>;
export const createPage = ({
  isPublic = false,
  isAccessible = () => true,
  getInitialProps = () => ({})
}: {
  isPublic?: boolean,
  isAccessible?: Function,
  getInitialProps?: Function
}) => (page: Function = () => <div>Here's a page</div>): PageWithConfig => {
  page.isPublic = isPublic;
  page.isAccessible = isAccessible;
  page.getInitialProps = getInitialProps;
  return page;
};

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
const Root = (props: any) => {
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
Root.getInitialProps = async ({
  Component,
  ctx,
  router
}: {
  Component: PageWithConfig,
  ctx: any,
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
