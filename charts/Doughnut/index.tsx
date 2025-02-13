import { gql } from '@apollo/client';
import generateChartComponent from 'charts/Chart';
import { BUCKETS_TO_BAR_CHART } from 'charts/config';
import { get } from 'lodash';
import DoughnutChart from './ui';

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

const Doughnut = (consumerProps) => {
  const { field } = consumerProps;
  return generateChartComponent({
    Component: DoughnutChart,
    options: { query: generateQuery({ field }), dataTransformer: transformToBarData({ field }) },
    internalConfig: { ...BUCKETS_TO_BAR_CHART },
  })(consumerProps);
};

export default Doughnut;
