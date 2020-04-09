import { storiesOf } from '@storybook/react';
import React from 'react';
import SimpleBarChart from '.';

export const mockData = [
  { category: 'liver', count: 72 },
  { category: 'pancreas', count: 36 },
  { category: 'lungs', count: 24 },
  { category: 'skin', count: 67 },
  { category: 'cervix', count: 90 },
  { category: 'brain', count: 91 },
  { category: 'bone', count: 45 },
  { category: 'lymph nodes', count: 32 },
  { category: 'stomach', count: 31 },
  { category: 'prostate', count: 31 },
  { category: 'blood', count: 46 },
  { category: 'uterus', count: 3 },
  { category: 'thyroid', count: 4 },
  { category: 'esophagus', count: 4 },
  { category: 'eye', count: 18 },
  { category: 'breast', count: 19 },
  { category: 'spine', count: 27 },
  { category: 'kidney', count: 44 },
  { category: 'bladder', count: 41 },
];

const SimpleBarChartStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <SimpleBarChart data={mockData}>Skeleton</SimpleBarChart>
));

export default SimpleBarChartStories;
