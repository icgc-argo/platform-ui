import { print } from 'graphql/language/printer';
import fetch from 'isomorphic-fetch';
import urlJoin from 'url-join';
import getConfig from 'next/config';

const { GATEWAY_API_ROOT } = getConfig().publicRuntimeConfig;

export default ({ query, variables }) =>
  fetch(urlJoin(GATEWAY_API_ROOT, 'graphql'), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: typeof query === 'string' ? query : print(query),
      variables,
    }),
  }).then(res => res.json());

export const runBatchQueries = async (queries = []) =>
  !queries.length
    ? await []
    : fetch(urlJoin(GATEWAY_API_ROOT, 'graphql'), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          queries.map(query => ({
            query: typeof query === 'string' ? query : print(query),
            variables,
          })),
        ),
      }).then(res => res.json());
