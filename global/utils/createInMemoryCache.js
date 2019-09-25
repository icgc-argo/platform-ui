//@flow
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default () =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      if (obj.__typename === 'Program') return `Program::${obj.shortName}`;
      // Treat valid resp and errors resp as the same object, even though only one returns ID
      if (obj.__typename === 'ClinicalRegistrationData') {
        console.log('clnica', obj);

        return `ClinicalRegistrationData::${obj.shortName}`;
      } else return obj.id;
    },
    fragmentMatcher,
  });
