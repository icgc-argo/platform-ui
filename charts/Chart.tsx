import { useEffect } from 'react';
import { useArrangerCharts } from './arranger';
import { CommonChart } from './types';

const generateChartComponent =
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
    // TODO: only when data is avail cna be passed
    const { data, loading, error } = useArrangerCharts({ options });
    console.log('data', data, 'loading', loading, 'error', error);

    useEffect(() => {
      if (error) {
        onError && onError(error);
      }
    }, [loading, error]);

    if (!loading && !error) {
      // provides resolved data to user config function, assist in UI styling
      const resolvedConsumerConfig =
        typeof consumerConfig === 'function' ? consumerConfig({ data }) : consumerConfig;

      return <Component {...{ data, ...internalConfig, ...resolvedConsumerConfig }} />;
    } else {
      return null;
    }
  };

export default generateChartComponent;
