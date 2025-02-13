import { gql } from '@apollo/client';
import { ResponsiveLine } from '@nivo/line';
import { get } from 'lodash';
import generateChartComponent from './Chart';
import { CommonChart } from './types';

type LineData = {
  id: string;
  data: { x: number; y: number }[];
}[];

const generateQuery = ({ fields }) => gql`
  query ChartsFileCentricNumericAgg($filters:JSON, $interval: Float) {
    file {
      aggregations(filters: $filters) {
        ${fields.map(
          (field) => `
          ${field} {
          histogram(interval: $interval) {         
            bucket_count
            buckets {
              doc_count
              key
            }
          }
        }`,
        )}
      }
    }
  }
`;

//  NumericAggregation => Chart config
const transformToLineData =
  ({ fields }) =>
  (rawData): LineData => {
    return fields.map((field) => ({
      id: field,
      data: get(rawData, `file.aggregations.${field}.histogram.buckets`, []).map(
        ({ key, doc_count }) => {
          return {
            x: key,
            y: doc_count,
          };
        },
      ),
    }));
  };

const Line = (consumerProps: CommonChart & { interval: number; fields: string[] }) => {
  const { fields, interval } = consumerProps;
  const options = {
    query: generateQuery({ fields }),
    variables: { interval },
    dataTransformer: transformToLineData({ fields }),
  };
  return generateChartComponent({ Component: ResponsiveLine, options })(consumerProps);
};

export default Line;
