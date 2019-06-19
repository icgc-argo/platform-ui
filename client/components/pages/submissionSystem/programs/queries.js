import gql from 'graphql-tag';

export const programsQuery = gql`
  {
    programs {
      id
      shortName
      name
      cancerTypes {
        id
        name
      }
      countries
      membershipType
      genomicDonors
      submittedDonors
      commitmentDonors
    }
  }
`;
