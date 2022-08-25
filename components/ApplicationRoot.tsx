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

import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client';
import { ToasterContext, useToastState } from 'global/hooks/toaster';
import useAuthContext, { AuthProvider } from 'global/hooks/useAuthContext';
import { PageContext } from 'global/hooks/usePageContext';
import { PersistentContext } from 'global/hooks/usePersistentContext';
import createInMemoryCache from 'global/utils/createInMemoryCache';
import * as React from 'react';
import { css, styled, ThemeProvider } from '@icgc-argo/uikit';
import ToastStack from '@icgc-argo/uikit/notifications/ToastStack';
import urljoin from 'url-join';
import Head from 'components/Head';
import get from 'lodash/get';
import { createUploadLink } from 'apollo-upload-client';
import { ClientSideGetInitialPropsContext } from 'global/utils/pages/types';
import { getConfig } from 'global/config';
import GdprMessage from './GdprMessage';
import { GRAPHQL_PATH } from 'global/constants/gatewayApiPaths';
import SystemAlerts from './SystemAlerts';
import { fillAvailableWidth, modalPortalRef } from './Modal';
import { GlobalLoaderProvider, loaderPortalRef } from './GlobalLoader';

const ToastProvider = ({ children }) => {
  const toaster = useToastState();
  return (
    <ToasterContext.Provider value={toaster}>
      {children}
      <div
        className="toastStackContainer"
        css={css`
          position: fixed;
          z-index: 9999;
          right: 0px;
          top: 80px;
        `}
      >
        <div
          css={css`
            margin-right: 20px;
            margin-left: 20px;
          `}
        >
          <ToastStack toastConfigs={toaster.toastStack} onInteraction={toaster.onInteraction} />
        </div>
      </div>
    </ToasterContext.Provider>
  );
};

function PersistentStateProvider({ children }) {
  const [persistentContext, setPersistentContext] = React.useState({});

  const setItem = (k, v) => {
    setPersistentContext({
      ...persistentContext,
      [k]: v,
    });
  };
  const getItem = (k, defaultValue) => {
    return get(persistentContext, k, defaultValue);
  };

  return (
    <PersistentContext.Provider value={{ getItem, setItem }}>{children}</PersistentContext.Provider>
  );
}

const ApolloClientProvider: React.ComponentType<{ apolloCache: any }> = ({
  children,
  apolloCache,
}) => {
  const { GATEWAY_API_ROOT } = getConfig();
  const { fetchWithEgoToken } = useAuthContext();
  const clientSideCache = React.useMemo(() => createInMemoryCache().restore(apolloCache), []);

  const client = React.useMemo(() => {
    const uploadLink = createUploadLink({
      uri: urljoin(GATEWAY_API_ROOT, GRAPHQL_PATH),
      fetch: fetchWithEgoToken,
    });
    return new ApolloClient({
      link: ApolloLink.from([uploadLink]),
      connectToDevTools: true,
      cache: clientSideCache,
    });
  }, [fetchWithEgoToken, clientSideCache]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const TopLayerContainer = styled('div')`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9999;
`;

export default function ApplicationRoot({
  egoJwt,
  apolloCache,
  pageContext,
  children,
  startWithGlobalLoader,
  initialPermissions,
}: {
  egoJwt?: string;
  apolloCache: {};
  pageContext: ClientSideGetInitialPropsContext;
  children: React.ReactElement;
  startWithGlobalLoader: boolean;
  initialPermissions: string[];
}) {
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
      <Head />
      <AuthProvider egoJwt={egoJwt} initialPermissions={initialPermissions}>
        <ApolloClientProvider apolloCache={apolloCache}>
          <PageContext.Provider value={pageContext}>
            <ThemeProvider>
              <ToastProvider>
                <TopLayerContainer id="modalPortal" ref={modalPortalRef} />
                <TopLayerContainer id="loaderPortal" ref={loaderPortalRef} />
                <PersistentStateProvider>
                  <GlobalLoaderProvider startWithGlobalLoader={startWithGlobalLoader}>
                    <GdprMessage />
                    <SystemAlerts />
                    {children}
                  </GlobalLoaderProvider>
                </PersistentStateProvider>
              </ToastProvider>
            </ThemeProvider>
          </PageContext.Provider>
        </ApolloClientProvider>
      </AuthProvider>
    </>
  );
}
