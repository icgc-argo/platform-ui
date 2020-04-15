import { storiesOf } from '@storybook/react';
import React from 'react';
import DonorSummaryChart from '.';

const DonorSummaryChartStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <DonorSummaryChart />;
});

export default DonorSummaryChartStories;
