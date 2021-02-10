import React from 'react';
import d3 from 'd3'
import { makeMockData } from './mockData';

const data = makeMockData('week');
const linearScale = d3.scale ? d3.scale.linear : d3.scaleLinear

const LineGraph = () => {

  return (
    <div>I'm a line graph</div>
  );
}

export default LineGraph;