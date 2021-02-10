import React from 'react';
import { makeMockData } from './mockData';

const LineGraph = () => {
  const data = makeMockData({ days: 30, intervals: 7 });

  return (
    <div>I'm a line graph</div>
  );
}

export default LineGraph;