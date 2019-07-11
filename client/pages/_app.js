// @flow
import * as React from 'react';
import nextCookies from 'next-cookies';
import Router from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import urlJoin from 'url-join';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import fetch from 'isomorphic-fetch';

import Button from 'uikit/Button';
import { ThemeProvider } from 'uikit';
import { EGO_JWT_KEY } from 'global/constants';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';
import { NODE_ENV, ENVIRONMENTS, GATEWAY_API_ROOT } from 'global/config';
import { isValidJwt, decodeToken } from 'global/utils/egoJwt';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';
import createInMemoryCache from 'global/utils/createInMemoryCache';

import Error401Page from 'components/pages/401';
import type { PageWithConfig, GetInitialPropsContext } from 'global/utils/pages';

const enforceLogin = ({ ctx }: { ctx: GetInitialPropsContext }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  if (ctx.res && ctx.res.redirect) {
    ctx.res.redirect(loginRedirect);
  } else if (Router.router) {
    Router.replace(loginRedirect);
  }
};

/**
 * Root level component that wraps every page
 */
// this makes egoJwt available to every page client-side
const Root = (props: {
  Component: PageWithConfig,
  pageProps: {},
  egoJwt: string,
  unauthorized: boolean,
  pathname: string,
  apolloCache: {},
}) => {
  const { Component, pageProps, egoJwt, unauthorized, pathname } = props;
  const logOut = () => {
    Cookies.remove(EGO_JWT_KEY);
    Router.push('/');
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
      if (userData.context.user.type === 'ADMIN' && localStorage.getItem('DEBUGGING')) {
        window.env = process.env;
      }
    } catch (err) {}
  }, []);

  const client = new ApolloClient({
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
    link: createHttpLink({
      uri: urlJoin(GATEWAY_API_ROOT, '/graphql'),
      fetch: fetch,
      headers: {
        authorization: `Bearer ${props.egoJwt}`,
      },
    }),
    cache: createInMemoryCache().restore(props.apolloCache),
  });

  return (
    <>
      <style>
        {`
            body {
              margin: 0;
              position: absolute;
              top: 0px;
              bottom: 0px;
              left: 0px;
              right: 0px;
            } /* custom! */
            #__next {
              position: absolute;
              top: 0px;
              bottom: 0px;
              left: 0px;
              right: 0px;
            }
        `}
      </style>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ThemeProvider>
            <Component egoJwt={egoJwt} logOut={logOut} pathname={pathname} {...pageProps} />
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </>
  );
};

// this makes egoJwt available to every page server-side
Root.getInitialProps = async ({
  Component,
  ctx,
  router,
}: {
  Component: PageWithConfig,
  ctx: GetInitialPropsContext,
  router?: any,
}) => {
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

  if (unauthorized) {
    const err = (new Error('Unauthorized'): Error & { statusCode?: number });
    err.statusCode = 401;
    throw err;
  }

  const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });

  let graphqlQueriesToChache;
  let apolloCache;
  try {
    graphqlQueriesToChache = Component.getGqlQueriesToPrefetch
      ? await Component.getGqlQueriesToPrefetch({ ...ctx, egoJwt })
      : null;
    apolloCache = graphqlQueriesToChache
      ? await getApolloCacheForQueries(graphqlQueriesToChache)(egoJwt)
      : null;
  } catch (e) {
    console.log(e);
  }
  return {
    egoJwt,
    pageProps,
    unauthorized,
    pathname: ctx.pathname,
    apolloCache,
  };
};

export default Root;
