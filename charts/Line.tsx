import { gql } from '@apollo/client';
import { ResponsiveLine } from '@nivo/line';
import { get } from 'lodash';
import Chart from './Chart';
import { CommonChart } from './types';

type LineData = {
  id: string;
  data: { x: number; y: number }[];
}[];

const generateQuery = ({ field }) => gql`
  query ChartsFileCentricNumericAgg($filters:JSON, $interval: Float) {
    file {
      aggregations(filters: $filters) {
        ${field} {
          histogram(interval: $interval) {         
            bucket_count
            buckets {
              doc_count
              key
            }
          }
        }
      }
    }
  }
`;

//  NumericAggregation => Nivo Line chart data
const transformToLineData =
  ({ field }) =>
  (rawData): LineData => {
    const data = {
      id: 'ID',
      data: get(rawData, `file.aggregations.${field}.histogram.buckets`, []).map(
        ({ key, doc_count }) => {
          return {
            x: key,
            y: doc_count,
          };
        },
      ),
    };

    return [data];
  };

const Line = (consumerProps: CommonChart & { interval: number }) => {
  const { field, interval } = consumerProps;
  const options = {
    query: generateQuery({ field }),
    variables: { interval },
    dataTransformer: transformToLineData({ field }),
  };
  return Chart({ Component: ResponsiveLine, options })(consumerProps);
};

export default Line;
