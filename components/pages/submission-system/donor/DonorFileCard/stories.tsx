import { storiesOf } from '@storybook/react';
import React from 'react';
import DonorFileCard from '.';

const DonorFileCardStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  return <DonorFileCard />;
});

export default DonorFileCardStories;
