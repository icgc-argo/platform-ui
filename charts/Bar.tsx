import { gql } from '@apollo/client';
import { ResponsiveBar } from '@nivo/bar';
import { get } from 'lodash';
import generateChartComponent from './Chart';
import { BUCKETS_TO_BAR_CHART } from './config';

const generateQuery = ({ field }) => gql`
  query ChartsFileCentricAgg($filters:JSON) {
    file {
      aggregations(filters: $filters) {
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

// Regular Aggregation type => Nivo Bar chart data
const transformToBarData =
  ({ field }) =>
  (rawData) => {
    return get(rawData, `file.aggregations.${field}.buckets`, []).map(
      ({ __typename, ...rest }) => rest,
    );
  };

const Bar = (consumerProps) => {
  const { field } = consumerProps;
  return generateChartComponent({
    Component: ResponsiveBar,
    options: { query: generateQuery({ field }), dataTransformer: transformToBarData({ field }) },
    internalConfig: { ...BUCKETS_TO_BAR_CHART },
  })(consumerProps);
};

export default Bar;
