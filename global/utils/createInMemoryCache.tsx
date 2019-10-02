import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default () =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      if (obj.__typename === 'Program')
        return `Program::${(obj as { shortName: string }).shortName}`;

      if (obj.__typename === 'ClinicalRegistrationData') {
        return `ClinicalRegistrationData::${(obj as { shortName: string }).shortName}`;
      } else return obj.id;
    },
    fragmentMatcher,
  });
