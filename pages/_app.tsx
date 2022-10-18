/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import ApplicationRoot from 'components/ApplicationRoot';
import { EGO_JWT_KEY } from 'global/constants';
import { decodeToken, isValidJwt, getPermissionsFromToken } from 'global/utils/egoJwt';
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
import { NormalizedCacheObject } from '@apollo/client';

import { PageWithConfig, ClientSideGetInitialPropsContext } from 'global/utils/pages/types';
import { NextPageContext } from 'next';
import { getConfig } from 'global/config';
import DnaLoader from '@icgc-argo/uikit/DnaLoader';
import { sleep, OAUTH_QUERY_PARAM_NAME } from 'global/utils/common';
import omit from 'lodash/omit';
import refreshJwt from 'global/utils/refreshJwt';
import MaintenancePage from 'components/pages/MaintenancePage';

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

const getRedirect = (ctxAsPath: string | undefined): string =>
  // login path for redirect may be restored in future, see https://github.com/icgc-argo/platform-ui/issues/1487
  ctxAsPath ? `/?redirect=${encodeURI(ctxAsPath)}` : '/';

const enforceLogin = ({ ctx }: { ctx: NextPageContext }) => {
  const loginRedirect = getRedirect(ctx.asPath);
  redirect(ctx.res, loginRedirect);
};

type RootGetInitialPropsData = {
  apolloCache: NormalizedCacheObject;
  ctx: ClientSideGetInitialPropsContext;
  egoJwt?: string;
  initialPermissions: string[];
  maintenanceModeOn: boolean;
  pageProps: { [k: string]: any };
  pathname: string;
  startWithGlobalLoader: boolean;
  unauthorized: boolean;
};

const removeCookie = (res, cookieName) => {
  res && res.setHeader('Set-Cookie', `${cookieName}=deleted; expires=${new Date(1).toUTCString()}`);
};

class Root extends App<RootGetInitialPropsData, {}, { isLoadingLoginRedirect: boolean }> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext & { Component: PageWithConfig }): Promise<RootGetInitialPropsData> {
    const { AUTH_DISABLED, MAINTENANCE_MODE_ON } = getConfig();
    if (MAINTENANCE_MODE_ON) {
      return {
        pageProps: {},
        unauthorized: false,
        pathname: ctx.pathname,
        egoJwt: null,
        ctx: {
          pathname: ctx.pathname,
          query: ctx.query,
          asPath: ctx.asPath,
        },
        apolloCache: null,
        startWithGlobalLoader: false,
        initialPermissions: [],
        maintenanceModeOn: MAINTENANCE_MODE_ON,
      };
    }

    const egoJwt: string | undefined = nextCookies(ctx)[EGO_JWT_KEY];
    const { res, query } = ctx;
    let refreshedJwt = null;
    let initialPermissions = getPermissionsFromToken(egoJwt);

    const loggingOut = query.loggingOut || false;

    if (loggingOut) {
      if (Component.isPublic) {
        const strippedPath = queryString.exclude(ctx.asPath, ['loggingOut']);
        redirect(res, strippedPath);
      } else {
        redirect(res, '/');
      }
    } else if (egoJwt) {
      if (!isValidJwt(egoJwt)) {
        if (res) {
          removeCookie(res, EGO_JWT_KEY);
          redirect(res, getRedirect(ctx.asPath));
        } else {
          const forceLogin = () => {
            Cookies.remove(EGO_JWT_KEY);
            redirect(res, getRedirect(ctx.asPath));
          };
          const newJwt = (await refreshJwt().catch(forceLogin)) as string;
          if (isValidJwt(newJwt)) {
            Cookies.set(EGO_JWT_KEY, newJwt);
            refreshedJwt = newJwt;
            initialPermissions = getPermissionsFromToken(newJwt);
          } else {
            forceLogin();
          }
        }
      }
    } else {
      if (!Component.isPublic) {
        enforceLogin({ ctx });
      }
    }

    const unauthorized = Component.isAccessible
      ? !(await Component.isAccessible({ egoJwt, ctx, initialPermissions }))
      : false;

    if (unauthorized && !AUTH_DISABLED && !loggingOut) {
      const err = new Error('Forbidden') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 403;
      throw err;
    }

    const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });

    const startWithGlobalLoader = Component.startWithGlobalLoader || false;

    return {
      apolloCache: undefined,
      ctx: {
        asPath: ctx.asPath,
        pathname: ctx.pathname,
        query: ctx.query,
      },
      egoJwt: refreshedJwt || egoJwt,
      initialPermissions,
      maintenanceModeOn: MAINTENANCE_MODE_ON,
      pageProps,
      pathname: ctx.pathname,
      startWithGlobalLoader,
      unauthorized,
    };
  }

  isInOauthMode = (props) => {
    if (get(props.ctx.query, 'redirect')) {
      const parsed = queryString.parseUrl(decodeURIComponent(props.ctx.query.redirect));
      return get(parsed.query, OAUTH_QUERY_PARAM_NAME) === 'true';
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
      .then((res) => {
        if (res.status !== 200) {
          enforceLogin({ ctx });
        }
        return res.text();
      })
      .then((egoToken) => {
        if (isValidJwt(egoToken)) {
          return egoToken;
        }
      })
      .catch((err) => {
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
          const obj = queryString.parseUrl(redirectPath || '');
          const target = queryString.stringifyUrl({
            ...obj,
            query: omit(obj.query, OAUTH_QUERY_PARAM_NAME),
          });
          location.assign(target);
        } else {
          Cookies.set(EGO_JWT_KEY, null);
          location.assign(getRedirect(asPath));
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
    const {
      Component,
      pageProps,
      ctx,
      apolloCache,
      egoJwt,
      startWithGlobalLoader,
      initialPermissions,
      maintenanceModeOn,
    } = this.props;
    const { isLoadingLoginRedirect } = this.state;
    return (
      <ApplicationRoot
        egoJwt={egoJwt}
        apolloCache={apolloCache}
        pageContext={ctx}
        startWithGlobalLoader={startWithGlobalLoader}
        initialPermissions={initialPermissions}
      >
        {maintenanceModeOn ? (
          <MaintenancePage />
        ) : isLoadingLoginRedirect ? (
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
