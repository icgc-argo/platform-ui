// @flow
import ApplicationRoot from 'components/ApplicationRoot';
import { EGO_JWT_KEY } from 'global/constants';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';
import { decodeToken, isValidJwt } from 'global/utils/egoJwt';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';
import nextCookies from 'next-cookies';
import Router from 'next/router';
import * as React from 'react';
import ReactGA from 'react-ga';
import { ERROR_STATUS_KEY } from './_error';
import getConfig from 'next/config';
import App from 'next/app';

const { AUTH_DISABLED, GA_TRACKING_ID } = getConfig().publicRuntimeConfig;

import type {
  PageWithConfig,
  GetInitialPropsContext,
  ClientSideGetInitialPropsContext,
} from 'global/utils/pages/types';

const redirect = (res, url: string) => {
  if (res) {
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } else {
    Router.push(url);
  }
};

const enforceLogin = ({ ctx }: { ctx: GetInitialPropsContext }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  redirect(ctx.res, loginRedirect);
};

type RootGetInitialPropsData = {
  pageProps: { [k: string]: any },
  unauthorized: boolean,
  pathname: string,
  ctx: ClientSideGetInitialPropsContext,
  egoJwt: ?string,
  apolloCache: {},
};

const removeCookie = (res, cookieName) => {
  res && res.setHeader('Set-Cookie', `${cookieName}=deleted; expires=${new Date(1).toUTCString()}`);
};

class Root extends App {
  static async getInitialProps({
    Component,
    ctx,
    router,
  }: {
    Component: PageWithConfig,
    ctx: GetInitialPropsContext,
    router?: any,
  }) {
    const egoJwt: ?string = nextCookies(ctx)[EGO_JWT_KEY];
    const { res } = ctx;

    if (egoJwt) {
      if (!isValidJwt(egoJwt)) {
        removeCookie(res, EGO_JWT_KEY);
        redirect(res, `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`);
      }
    } else {
      if (!Component.isPublic) {
        enforceLogin({ ctx });
      }
    }

    const unauthorized = Component.isAccessible
      ? !(await Component.isAccessible({ egoJwt, ctx }))
      : false;

    if (unauthorized && !AUTH_DISABLED) {
      const err = (new Error('Unauthorized'): Error & { statusCode?: number });
      err[ERROR_STATUS_KEY] = 401;
      throw err;
    }

    const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });

    let graphqlQueriesToChache;
    let apolloCache = {};
    try {
      graphqlQueriesToChache = Component.getGqlQueriesToPrefetch
        ? await Component.getGqlQueriesToPrefetch({ ...ctx, egoJwt })
        : [];
      apolloCache = graphqlQueriesToChache
        ? await getApolloCacheForQueries(graphqlQueriesToChache)(egoJwt)
        : {};
    } catch (e) {
      console.log(e);
    }
    return {
      pageProps,
      unauthorized,
      pathname: ctx.pathname,
      egoJwt,
      ctx: {
        pathname: ctx.pathname,
        query: ctx.query,
        asPath: ctx.asPath,
      },
      apolloCache,
    };
  }

  componentDidMount() {
    const { ctx, egoJwt } = this.props;
    const userModel = decodeToken(egoJwt);

    ReactGA.initialize(GA_TRACKING_ID, {
      gaOptions: {
        userId: userModel ? userModel.context.user.email : 'NA',
      },
    });
    ReactGA.pageview(ctx.asPath);
  }

  render() {
    const { Component, pageProps, unauthorized, pathname, ctx, apolloCache, egoJwt } = this.props;

    return (
      <ApplicationRoot egoJwt={egoJwt} apolloCache={apolloCache} pageContext={ctx}>
        <Component {...pageProps} />
      </ApplicationRoot>
    );
  }
}

export default Root;
