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

import useAuthContext from 'global/hooks/useAuthContext';

import { ClientSideGetInitialPropsContext } from 'global/utils/pages/types';
import { getConfig } from 'global/config';

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

const ToastDisplayArea = ({ toaster }: { toaster: ReturnType<typeof useToastState> }) => (
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
);

const ToastProvider = ({ children }) => {
  const toaster = useToastState();
  return (
    <ToasterContext.Provider value={toaster}>
      {children}
      <ToastDisplayArea toaster={toaster} />
      <div
        css={css`
          position: fixed;
          left: 0px;
          top: 0px;
          z-index: 9999;
        `}
        ref={modalPortalRef}
      />
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
  const createNewClient = () =>
    new ApolloClient({
      // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
      link: createUploadLink({
        uri: urljoin(GATEWAY_API_ROOT, '/graphql'),
        fetch: fetch,
        headers: egoJwt
          ? {
              authorization: `Bearer ${egoJwt}`,
            }
          : {},
      }),
      cache: createInMemoryCache().restore(apolloCache),
    });
  const [client, setClient] = React.useState(createNewClient());
  React.useEffect(() => {
    setClient(createNewClient());
  }, [egoJwt]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default function ApplicationRoot({
  egoJwt,
  apolloCache,
  pageContext,
  children,
}: {
  egoJwt?: string;
  apolloCache: {};
  pageContext: ClientSideGetInitialPropsContext;
  children: React.ReactElement;
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
                <PersistentStateProvider>{children}</PersistentStateProvider>
              </ToastProvider>
            </ThemeProvider>
          </PageContext.Provider>
        </ApolloClientProvider>
      </AuthProvider>
    </>
  );
}
