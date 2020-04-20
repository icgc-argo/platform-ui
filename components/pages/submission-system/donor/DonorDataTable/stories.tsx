import { storiesOf } from '@storybook/react';
import React from 'react';
import DonorDataTable from '.';

const DonorDataTableStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <DonorDataTable />;
});

export default DonorDataTableStories;
