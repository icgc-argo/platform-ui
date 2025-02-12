import { ResponsiveBar } from '@nivo/bar';
import { get } from 'lodash';
import { useEffect } from 'react';
import { useArrangerCharts } from './arranger';
import { BUCKETS_TO_BAR_CHART } from './config';
import { CommonChart } from './types';

const Chart =
  ({ Component }) =>
  ({ field, consumerConfig, onLoad, onError }: CommonChart) => {
    const { data: rawData, loading, error } = useArrangerCharts({ field });
    console.log('data', rawData, 'loading', loading, 'error', error);

    useEffect(() => {
      if (error) {
        onError && onError(error);
      }
    }, [loading, error]);

    const dataConfig = {
      ...BUCKETS_TO_BAR_CHART,
      // TODO: correct data properties when using ArrangerV3 data fetcher
      data: get(rawData, `file.aggregations.${field}.buckets`, []).map(
        ({ __typename, ...rest }) => rest,
      ),
    };
    console.log('dc', dataConfig);
    return !loading && !error && <ResponsiveBar {...{ ...dataConfig, ...consumerConfig }} />;
  };

export default Chart;
