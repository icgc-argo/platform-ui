//@flow
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default () =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      if (obj.__typename === 'Program') return `PROGRAM::${obj.shortName}`;
      else return obj.id;
    },
    fragmentMatcher,
  });
