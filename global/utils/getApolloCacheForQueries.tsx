import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import urlJoin from 'url-join';
import createInMemoryCache from './createInMemoryCache';
import { getConfig } from 'global/config';

// if/when this is used, verify the fetch call and authorization headers are being properly
// updated when a jwt is refreshed. See ApplicationRoot ApolloClient implementation
export default (queries: Array<{ query: any; variables?: { [key: string]: any } }>) => async (
  egoJwt?: string,
) => {
  const { GATEWAY_API_ROOT } = getConfig();
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: urlJoin(GATEWAY_API_ROOT, '/graphql'),
      fetch: fetch,
      headers: egoJwt
        ? {
            authorization: `Bearer ${egoJwt}`,
          }
        : {},
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
