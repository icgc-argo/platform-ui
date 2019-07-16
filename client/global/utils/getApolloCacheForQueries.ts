import urlJoin from 'url-join';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

import { GATEWAY_API_ROOT } from 'global/config';
import createInMemoryCache from './createInMemoryCache';

export default (queries: Array<{ query: any; variables?: { [key: string]: any } }>) => async (
  egoJwt: string,
) => {
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: urlJoin(GATEWAY_API_ROOT, '/graphql'),
      fetch: fetch,
      headers: {
        authorization: `Bearer ${egoJwt}`,
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
