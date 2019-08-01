//@flow
import * as React from 'react';
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

export default function ApplicationRoot({
  egoJwt,
  apolloCache,
  pageContext,
  children,
}: {
  egoJwt: string,
  apolloCache: {},
  pageContext: ClientSideGetInitialPropsContext,
  children: React.Node,
}) {
  const toaster = useToastState();

  const apolloClient = new ApolloClient({
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
    link: createHttpLink({
      uri: urljoin(GATEWAY_API_ROOT, '/graphql'),
      fetch: fetch,
      headers: {
        authorization: `Bearer ${egoJwt}`,
      },
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
      <ToasterContext.Provider value={toaster}>
        <PageContext.Provider value={pageContext}>
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <ThemeProvider>
                <>
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
                      <ToastStack
                        toastConfigs={toaster.toastStack}
                        onInteraction={toaster.onInteraction}
                      />
                    </div>
                  </div>
                </>
              </ThemeProvider>
            </ApolloHooksProvider>
          </ApolloProvider>
        </PageContext.Provider>
      </ToasterContext.Provider>
    </>
  );
}
