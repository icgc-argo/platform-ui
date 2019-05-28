import urlJoin from 'url-join';
import fetch from 'isomorphic-fetch';
import { print } from 'graphql/language/printer';

import { API_ROOT } from 'global/config';

export default ({ query, variables }) =>
  fetch(urlJoin(API_ROOT, 'graphql'), {
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
    : fetch(urlJoin(API_ROOT, 'graphql'), {
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
