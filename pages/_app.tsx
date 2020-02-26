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
import App, { AppContext } from 'next/app';
import Cookies from 'js-cookie';
import urlJoin from 'url-join';
import queryString from 'query-string';
import { get } from 'lodash';
import DefaultLayout from '../components/pages/DefaultLayout';

import {
  PageWithConfig,
  GetInitialPropsContext,
  ClientSideGetInitialPropsContext,
} from 'global/utils/pages/types';
import { NextPageContext } from 'next';
import { getConfig } from 'global/config';
import DnaLoader from 'uikit/DnaLoader';
import { sleep, OAUTH_QUERY_PARAM_NAME } from 'global/utils/common';
import omit from 'lodash/omit';

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

const enforceLogin = ({ ctx }: { ctx: NextPageContext }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  redirect(ctx.res, loginRedirect);
};

type RootGetInitialPropsData = {
  pageProps: { [k: string]: any };
  unauthorized: boolean;
  pathname: string;
  ctx: ClientSideGetInitialPropsContext;
  egoJwt?: string;
  apolloCache: {};
};

const removeCookie = (res, cookieName) => {
  res && res.setHeader('Set-Cookie', `${cookieName}=deleted; expires=${new Date(1).toUTCString()}`);
};

class Root extends App<
  {
    egoJwt?: string;
    ctx: NextPageContext;
    apolloCache: any;
    pathname: string;
    unauthorized: boolean;
    startWithGlobalLoader: boolean;
  },
  {},
  { isLoadingLoginRedirect: boolean }
> {
  static async getInitialProps({ Component, ctx }: AppContext & { Component: PageWithConfig }) {
    const egoJwt: string | undefined = nextCookies(ctx)[EGO_JWT_KEY];
    const { res } = ctx;
    const { AUTH_DISABLED } = getConfig();

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
      const err = new Error('Unauthorized') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 401;
      throw err;
    }

    const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });

    let graphqlQueriesToCache;
    let apolloCache = {};
    try {
      graphqlQueriesToCache = Component.getGqlQueriesToPrefetch
        ? await Component.getGqlQueriesToPrefetch({ ...ctx, egoJwt })
        : [];
      apolloCache = graphqlQueriesToCache
        ? await getApolloCacheForQueries(graphqlQueriesToCache)(egoJwt)
        : {};
    } catch (e) {
      console.log(e);
    }

    const startWithGlobalLoader = Component.startWithGlobalLoader || false;

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
      startWithGlobalLoader,
    };
  }

  isInOauthMode = props => {
    if (get(props.ctx.query, 'redirect')) {
      const parsed = queryString.parseUrl(decodeURIComponent(props.ctx.query.redirect));
      return get(parsed.query, 'isOauth') === 'true';
    } else {
      return false;
    }
  };

  constructor(props) {
    super(props);
    const isOauth = this.isInOauthMode(props);
    this.state = {
      isLoadingLoginRedirect: isOauth,
    };
  }

  static async getEgoToken(props) {
    const { ctx } = props;
    const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();
    const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);
    return await fetch(egoLoginUrl, {
      credentials: 'include',
      headers: { accept: '*/*' },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then(res => {
        if (res.status !== 200) {
          enforceLogin({ ctx });
        }
        return res.text();
      })
      .then(egoToken => {
        if (isValidJwt(egoToken)) {
          return egoToken;
        }
      })
      .catch(err => {
        console.warn(err);
        enforceLogin({ ctx });
        return err;
      });
  }

  async componentDidMount() {
    const {
      ctx: {
        asPath,
        query: { redirect },
      },
      egoJwt,
    } = this.props;
    const { isLoadingLoginRedirect } = this.state;
    const userModel = decodeToken(egoJwt);
    const { GA_TRACKING_ID } = getConfig();

    if (egoJwt) {
      Cookies.set(EGO_JWT_KEY, egoJwt);
    } else {
      if (isLoadingLoginRedirect) {
        const egoToken = await Root.getEgoToken(this.props);
        if (isValidJwt(egoToken)) {
          Cookies.set(EGO_JWT_KEY, egoToken);
          const redirectPath = decodeURIComponent(redirect as string);
          const obj = queryString.parseUrl(redirectPath || '/');
          const target = queryString.stringifyUrl({
            ...obj,
            query: omit(obj.query, OAUTH_QUERY_PARAM_NAME),
          });
          location.assign(target);
        } else {
          Cookies.set(EGO_JWT_KEY, null);
          location.assign(`${LOGIN_PAGE_PATH}?redirect=${encodeURI(asPath)}`);
        }
        await sleep();
        this.setState({ isLoadingLoginRedirect: false });
      }
    }
    ReactGA.initialize(GA_TRACKING_ID, {
      gaOptions: {
        userId: userModel ? userModel.context.user.email : 'NA',
      },
    });
    ReactGA.pageview(asPath);
  }

  render() {
    const { Component, pageProps, ctx, apolloCache, egoJwt, startWithGlobalLoader } = this.props;
    const { isLoadingLoginRedirect } = this.state;
    return (
      <ApplicationRoot
        egoJwt={egoJwt}
        apolloCache={apolloCache}
        pageContext={ctx}
        startWithGlobalLoader={startWithGlobalLoader}
      >
        {isLoadingLoginRedirect ? (
          <DefaultLayout>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
              }}
            >
              <DnaLoader />
            </div>
          </DefaultLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ApplicationRoot>
    );
  }
}

export default Root;
