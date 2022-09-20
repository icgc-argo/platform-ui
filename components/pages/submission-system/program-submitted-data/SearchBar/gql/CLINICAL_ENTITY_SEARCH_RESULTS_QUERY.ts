import { gql } from '@apollo/client';

const CLINICAL_ENTITY_SEARCH_RESULTS_QUERY = gql`
  query ClinicalEntitySearchResults($programShortName: String!, $filters: ClinicalInput!) {
    clinicalSearchResults(programShortName: $programShortName, filters: $filters) {
      programShortName
      totalResults
      searchResults {
        donorId
        submitterDonorId
      }
    }
  }
`;

export default CLINICAL_ENTITY_SEARCH_RESULTS_QUERY;
