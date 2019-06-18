//@flow
import React from 'react';
import { get } from 'lodash';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import { isRdpcMember, getAuthorizedProgramPolicies, decodeToken } from 'global/utils/egoJwt';
import { createPage } from 'global/utils/pages';
import ProgramsPage from 'components/pages/submissionSystem/programs';
import { programsQuery } from 'components/pages/programs/queries';

export default createPage({
  isPublic: true,
  isAccessible: async ({ egoJwt, ctx }) => {
    return !isRdpcMember(egoJwt);
  },
  getInitialProps: async ({ egoJwt, asPath, query }) => {
    const apolloClient = new ApolloClient({
      ssrMode: typeof window === 'undefined',
      // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
      link: createHttpLink({
        uri: 'https://argo-gateway.qa.argo.cancercollaboratory.org/graphql',
      }),
      cache: new InMemoryCache(),
    });
    await apolloClient.query({
      query: programsQuery,
    });
    const cache = apolloClient.extract();
    return { cache };
  },
})(({ cache, ...props }) => {
  const client = new ApolloClient({
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
    link: createHttpLink({
      uri: 'https://argo-gateway.qa.argo.cancercollaboratory.org/graphql',
    }),
    cache: new InMemoryCache().restore(cache),
  });
  return (
    <ApolloProvider client={client}>
      <ProgramsPage {...props} />
    </ApolloProvider>
  );
});
