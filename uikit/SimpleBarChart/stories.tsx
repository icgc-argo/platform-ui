import { storiesOf } from '@storybook/react';
import React from 'react';
import SimpleBarChart from '.';

const SimpleBarChartStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <SimpleBarChart>Skeleton</SimpleBarChart>
));

export default SimpleBarChartStories;
