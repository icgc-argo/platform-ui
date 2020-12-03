/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ToasterContext, useToastState } from 'global/hooks/toaster';
import useAuthContext, { AuthProvider } from 'global/hooks/useAuthContext';
import { PageContext } from 'global/hooks/usePageContext';
import { PersistentContext } from 'global/hooks/usePersistentContext';
import createInMemoryCache from 'global/utils/createInMemoryCache';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { css, ThemeProvider } from 'uikit';
import Modal from 'uikit/Modal';
import ToastStack from 'uikit/notifications/ToastStack';
import urljoin from 'url-join';
import Head from 'components/Head';
import { ApolloProvider } from '@apollo/react-hooks';
import get from 'lodash/get';
import { createUploadLink } from 'apollo-upload-client';
import { CSSTransition } from 'react-transition-group';
import { ClientSideGetInitialPropsContext } from 'global/utils/pages/types';
import { getConfig } from 'global/config';
import DnaLoader from 'uikit/DnaLoader';
import GdprMessage from './GdprMessage';
import { FadingDiv } from './Fader';
import { GRAPHQL_PATH } from 'global/constants/gatewayApiPaths';
import SystemAlert from 'uikit/SystemAlert';

/**
 * The global portal where modals will show up
 */

const fillAvailableWidth = css`
  width: -webkit-fill-available;
  width: -moz-available;
  min-width: -webkit-fill-available;
  min-width: -moz-available;
`;

const fillAvailableHeight = css`
  height: -webkit-fill-available;
  height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: -moz-available;
`;

const modalPortalRef = React.createRef<HTMLDivElement>();
const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
export const ModalPortal = ({ children }: { children: React.ReactElement }) => {
  const ref = modalPortalRef.current;
  const mounted = useMounted();
  return ref
    ? ReactDOM.createPortal(
        <div
          id="modalContainer"
          css={css`
            transition: all 0.2s;
            opacity: ${mounted ? 1 : 0};
          `}
        >
          <Modal.Overlay
            css={css`
              ${fillAvailableWidth}
              ${fillAvailableHeight}
              @media (min-width: 768px) {
                width: 100vw;
                height: 100vh;
              }
            `}
          >
            {children}
          </Modal.Overlay>
        </div>,
        ref,
      )
    : null;
};

const loaderPortalRef = React.createRef<HTMLDivElement>();
export const GlobalLoaderView = ({ isLoading }: { isLoading: boolean }) => {
  const ref = loaderPortalRef.current;
  const fadeIn = 400;
  const fadeOut = 600;
  return ref
    ? ReactDOM.createPortal(
        <CSSTransition in={isLoading} timeout={fadeIn} classNames="on" unmountOnExit>
          {() => (
            <FadingDiv enterAnimationLength={fadeIn} exitAnimationLength={fadeOut}>
              <Modal.Overlay
                css={css`
                  ${fillAvailableWidth}
                  ${fillAvailableHeight}
                  @media (min-width: 768px) {
                    width: 100vw;
                    height: 100vh;
                  }
                `}
              >
                <DnaLoader />
              </Modal.Overlay>
            </FadingDiv>
          )}
        </CSSTransition>,
        ref,
      )
    : null;
};

const GlobalLoadingContext = React.createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => {},
});
export const useGlobalLoadingState = () => React.useContext(GlobalLoadingContext);
export const GlobalLoaderProvider = ({
  children,
  startWithGlobalLoader,
}: {
  children: React.ReactNode | React.ReactNodeArray;
  startWithGlobalLoader: boolean;
}) => {
  const [isLoading, setLoading] = React.useState(startWithGlobalLoader || false);

  return (
    <GlobalLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <GlobalLoaderView isLoading={isLoading} />
    </GlobalLoadingContext.Provider>
  );
};

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
  const [maintenanceMessageShown, setMaintenanceMessageShown] = React.useState(true);
  const { COLLAB_MAINTENANCE_BANNER_ON } = getConfig();
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
                <div
                  css={css`
                    position: fixed;
                    left: 0px;
                    top: 0px;
                    z-index: 9999;
                    ${fillAvailableWidth}
                  `}
                  ref={modalPortalRef}
                />
                <div
                  css={css`
                    position: fixed;
                    left: 0px;
                    top: 0px;
                    z-index: 9999;
                  `}
                  ref={loaderPortalRef}
                />
                <PersistentStateProvider>
                  <GlobalLoaderProvider startWithGlobalLoader={startWithGlobalLoader}>
                    <GdprMessage />
                    {COLLAB_MAINTENANCE_BANNER_ON && maintenanceMessageShown && (
                      <SystemAlert
                        alert={{
                          level: 'warning',
                          dismissable: true,
                          title: '',
                          message: `Beginning Friday, December 4th at 5:30PM EST until Sunday, December 6th 11:55PM the ability to download ARGO data  will be unavailable due to the authentication systems being unavailable during planned maintenance.`,
                        }}
                        onClose={() => setMaintenanceMessageShown(false)}
                      />
                    )}
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
