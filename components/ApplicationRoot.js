//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import urljoin from 'url-join';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

import type { ClientSideGetInitialPropsContext } from 'global/utils/pages/types';
import { PageContext } from 'global/hooks/usePageContext';
import { GATEWAY_API_ROOT } from 'global/config';
import createInMemoryCache from 'global/utils/createInMemoryCache';
import { ThemeProvider } from 'uikit';
import { useToastState, ToasterContext } from 'global/hooks/toaster';
import { css } from 'uikit';
import ToastStack from 'uikit/notifications/ToastStack';
import { AuthProvider } from 'global/hooks/useAuthContext';
import Modal from 'uikit/Modal';

const modalPortalRef = React.createRef();
const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
export const ModalPortal = ({ children }: { children: React.Node }) => {
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

const ToastDisplayArea = ({ toaster }: { toaster: $Call<typeof useToastState, void> }) => (
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

export default function ApplicationRoot({
  egoJwt,
  apolloCache,
  pageContext,
  children,
}: {
  egoJwt: ?string,
  apolloCache: {},
  pageContext: ClientSideGetInitialPropsContext,
  children: React.Node,
}) {
  const apolloClient = new ApolloClient({
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
    link: createHttpLink({
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
      <AuthProvider egoJwt={egoJwt}>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <PageContext.Provider value={pageContext}>
              <ThemeProvider>
                <ToastProvider>{children}</ToastProvider>
              </ThemeProvider>
            </PageContext.Provider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}
