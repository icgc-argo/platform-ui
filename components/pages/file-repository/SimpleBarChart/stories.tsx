import { storiesOf } from '@storybook/react';
import React from 'react';
import SimpleBarChart from '.';
import data from './mockData';
import { select } from '@storybook/addon-knobs';
import { chartTypeMeta } from './';

const displayTypes = Object.keys(chartTypeMeta);
const createKnobs = () => {
  const chartType = select('chartType', displayTypes, 'data type');

  return {
    chartType,
  };
};

const SimpleBarChartStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = (index = 0, state = 'program', title = 'By Program') => ({
    state: select(`state`, displayTypes, state),
  });

  const currentDisplay = knobs().state;
  // calculations for data count and size is tbd, will depend on chart type
  const totalCount = data.dataTypes[currentDisplay].reduce(
    (acc, { category, count }) => acc + count,
    0,
  );
  return (
    <SimpleBarChart
      data={data.dataTypes[currentDisplay]}
      type={currentDisplay}
      totalDataSize={currentDisplay !== 'program' && totalCount}
      totalCount={totalCount}
      containerStyle={{ maxWidth: 450 }}
    />
  );
});

export default SimpleBarChartStories;
