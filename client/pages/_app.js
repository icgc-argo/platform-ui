// @flow
import * as React from 'react';
import nextCookies from 'next-cookies';
import Router from 'next/router';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

import { EGO_JWT_KEY } from 'global/constants';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';
import { AUTH_DISABLED } from 'global/config';
import { isValidJwt } from 'global/utils/egoJwt';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';

import type {
  PageWithConfig,
  GetInitialPropsContext,
  ClientSideGetInitialPropsContext,
} from 'global/utils/pages/types';

import { ERROR_STATUS_KEY } from './_error';
import useAuthContext from 'global/hooks/useAuthContext';
import ApplicationRoot from 'components/ApplicationRoot';

const enforceLogin = ({ ctx }: { ctx: GetInitialPropsContext }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  if (ctx.res && ctx.res.redirect) {
    ctx.res.redirect(loginRedirect);
  } else if (Router.router) {
    Router.replace(loginRedirect);
  }
};

type RootGetInitialPropsData = {
  pageProps: { [k: string]: any },
  unauthorized: boolean,
  pathname: string,
  ctx: ClientSideGetInitialPropsContext,
  apolloCache: {},
};

const getInitialProps = async ({
  Component,
  ctx,
  router,
}: {
  Component: PageWithConfig,
  ctx: GetInitialPropsContext,
  router?: any,
}): Promise<RootGetInitialPropsData> => {
  const egoJwt = nextCookies(ctx)[EGO_JWT_KEY];
  const { res } = ctx;
  if (egoJwt) {
    try {
      if (!isValidJwt(egoJwt)) {
        throw new Error('invalid token');
      }
    } catch (err) {
      res ? res.clearCookie(EGO_JWT_KEY) : null;
      router ? router.replace(`${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`) : null;
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
    ctx: {
      pathname: ctx.pathname,
      query: ctx.query,
      asPath: ctx.asPath,
    },
    apolloCache,
  };
};

const Root = (() => {
  const component = (
    props: {
      Component: PageWithConfig,
    } & RootGetInitialPropsData,
  ) => {
    const { Component, pageProps, unauthorized, pathname, ctx, apolloCache } = props;

    const { token, resolving, logOut } = useAuthContext();
    const egoJwt = resolving ? '' : token || '';

    React.useEffect(() => {
      if (egoJwt && !isValidJwt(egoJwt)) {
        logOut();
      }
    });

    return (
      <ApplicationRoot egoJwt={egoJwt} apolloCache={apolloCache} pageContext={ctx}>
        <Component egoJwt={egoJwt} logOut={logOut} pathname={pathname} {...pageProps} />
      </ApplicationRoot>
    );
  };
  component.getInitialProps = getInitialProps;
  return component;
})();

export default Root;
