//@flow
import urlJoin from 'url-join';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { API_ROOT } from 'global/config';
import createInMemoryCache from './createInMemoryCache';

export default async (queries: Array<{ query: any, variables?: { [key: string]: any } }>) => {
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
    link: createHttpLink({
      uri: urlJoin(API_ROOT, '/graphql'),
    }),
    cache: createInMemoryCache(),
  });
  await Promise.all(
    queries.map(({ query, variables }) =>
      apolloClient.query({
        query,
        variables,
      }),
    ),
  );
  return apolloClient.extract();
};
