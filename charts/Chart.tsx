import { useEffect } from 'react';
import { useArrangerCharts } from './arranger';
import { CommonChart } from './types';

const Chart =
  ({
    // internal
    Component,
    options,
    internalConfig,
  }: {
    Component: any;
    options: any;
    internalConfig?: any;
  }) =>
  ({
    // consumer
    consumerConfig,
    onLoad,
    onError,
  }: CommonChart) => {
    const { data, loading, error } = useArrangerCharts({ options });
    console.log('data', data, 'loading', loading, 'error', error);

    useEffect(() => {
      if (error) {
        onError && onError(error);
      }
    }, [loading, error]);

    return !loading && !error && <Component {...{ data, ...internalConfig, ...consumerConfig }} />;
  };

export default Chart;
