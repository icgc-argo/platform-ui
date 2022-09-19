import { gql } from '@apollo/client';

const CLINICAL_ENTITY_SEARCH_RESULTS = gql`
  query ClinicalEntitySearchResults($programShortName: String!, $filters: ClinicalInput!) {
    clinicalData(programShortName: $programShortName, filters: $filters) {
      programShortName
      clinicalEntities {
        entityName
        totalDocs
        records {
          name
          value
        }
      }
    }
  }
`;

export default CLINICAL_ENTITY_SEARCH_RESULTS;
