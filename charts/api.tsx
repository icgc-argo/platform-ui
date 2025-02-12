import { gql, useQuery } from '@apollo/client';

/**
 * TODO: update to use ArrangerV3 data providers
 * TODO: NumericAgg
 */
const generateQuery = ({ field }) => gql`
  query ChartsFileCentric {
    file {
      aggregations {
        ${field} {
          bucket_count
          buckets {
            doc_count
            key
          }
        }
      }
    }
  }
`;

export const useArrangerCharts = ({ field }) => {
  const filters = {};
  const query = generateQuery({ field });
  return useQuery(query, { variables: { filters } });
};
