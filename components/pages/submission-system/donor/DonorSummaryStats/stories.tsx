import { storiesOf } from '@storybook/react';
import React from 'react';
import DonorSummaryStats from '.';

const DonorSummaryStatsStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <DonorSummaryStats />;
});

export default DonorSummaryStatsStories;
