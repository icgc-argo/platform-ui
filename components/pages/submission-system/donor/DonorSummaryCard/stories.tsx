import { storiesOf } from '@storybook/react';
import React from 'react';
import DonorSummaryCard from '.';

const DonorSummaryCardStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <DonorSummaryCard />;
});

export default DonorSummaryCardStories;
