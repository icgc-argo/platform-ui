
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import urlJoin from 'url-join';
import createInMemoryCache from './createInMemoryCache';
import getConfig from 'next/config';

const { GATEWAY_API_ROOT } = getConfig().publicRuntimeConfig;

export default (queries: Array<{ query: any, variables?: { [key: string]: any } }>) => async (
  egoJwt: ?string,
) => {
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // $FlowFixMe apollo-client and apollo-link-http have a type conflict in their typing
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
