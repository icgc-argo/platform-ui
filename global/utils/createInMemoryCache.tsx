import { InMemoryCache } from 'apollo-cache-inmemory';

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
  });
