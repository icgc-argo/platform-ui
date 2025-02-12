import { gql } from '@apollo/client';
import { ResponsiveBar } from '@nivo/bar';
import { get } from 'lodash';
import Chart from './Chart';
import { BUCKETS_TO_BAR_CHART } from './config';

// TODO: Regular Aggregation type => Nivo Bar chart data
// bar chart will query normal Aggregation type

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

const transformToBarData =
  ({ field }) =>
  (rawData) => {
    return get(rawData, `file.aggregations.${field}.buckets`, []).map(
      ({ __typename, ...rest }) => rest,
    );
  };

const Bar = (consumerProps) => {
  const { field } = consumerProps;
  return Chart({
    Component: ResponsiveBar,
    options: { query: generateQuery({ field }), dataTransformer: transformToBarData({ field }) },
    internalConfig: { ...BUCKETS_TO_BAR_CHART },
  })(consumerProps);
};

export default Bar;
