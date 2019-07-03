//@flow
import urlJoin from 'url-join';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

import { GATEWAY_API_ROOT } from 'global/config';
import createInMemoryCache from './createInMemoryCache';

export default (queries: Array<{ query: any, variables?: { [key: string]: any } }>) => async (
  egoJwt: string,
) => {
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
    link: createHttpLink({
      uri: urlJoin(GATEWAY_API_ROOT, '/graphql'),
      fetch: fetch,
      headers: {
        authorization: egoJwt,
      },
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
