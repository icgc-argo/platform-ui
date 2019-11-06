import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default () =>
  new InMemoryCache({
    dataIdFromObject: obj => {
      switch (obj.__typename) {
        case 'Program':
          return `Program::${(obj as { shortName: string }).shortName}`;

        case 'ClinicalRegistrationData':
          return `ClinicalRegistrationData::${
            (obj as { programShortName: string }).programShortName
          }`;

        case 'ClinicalSubmissionData':
          return `ClinicalSubmissionData::${
            (obj as { programShortName: string }).programShortName
          }`;

        default:
          return obj.id;
      }
    },
    fragmentMatcher,
  });
