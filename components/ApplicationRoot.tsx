import ApolloClient from 'apollo-client';
import { ToasterContext, useToastState } from 'global/hooks/toaster';
import { AuthProvider } from 'global/hooks/useAuthContext';
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

/**
 * The global portal where modals will show up
 */
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
            height: 100vh;
            width: 100vw;
            opacity: ${mounted ? 1 : 0};
          `}
        >
          <Modal.Overlay>{children}</Modal.Overlay>
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
              <Modal.Overlay>
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

const ApolloClientProvider: React.ComponentType<{ egoJwt: string; apolloCache: any }> = ({
  children,
  egoJwt,
  apolloCache,
}) => {
  const { GATEWAY_API_ROOT } = getConfig();
  const createNewClient = (configs: { connectToDevTools: boolean }) =>
    new ApolloClient({
      link: createUploadLink({
        uri: urljoin(GATEWAY_API_ROOT, '/graphql'),
        fetch: fetch,
        headers: egoJwt
          ? {
              authorization: `Bearer ${egoJwt}`,
            }
          : {},
      }),
      connectToDevTools: configs.connectToDevTools,
      cache: createInMemoryCache().restore(apolloCache),
    });
  const [client, setClient] = React.useState<ReturnType<typeof createNewClient>>(
    createNewClient({ connectToDevTools: false }),
  );
  React.useEffect(() => {
    setClient(createNewClient({ connectToDevTools: true }));
  }, [egoJwt]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default function ApplicationRoot({
  egoJwt,
  apolloCache,
  pageContext,
  children,
  startWithGlobalLoader,
}: {
  egoJwt?: string;
  apolloCache: {};
  pageContext: ClientSideGetInitialPropsContext;
  children: React.ReactElement;
  startWithGlobalLoader: boolean;
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
      <AuthProvider egoJwt={egoJwt}>
        <ApolloClientProvider egoJwt={egoJwt} apolloCache={apolloCache}>
          <PageContext.Provider value={pageContext}>
            <ThemeProvider>
              <ToastProvider>
                <div
                  css={css`
                    position: fixed;
                    left: 0px;
                    top: 0px;
                    z-index: 9999;
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
