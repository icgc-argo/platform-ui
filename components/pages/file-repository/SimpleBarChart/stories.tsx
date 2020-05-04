import { storiesOf } from '@storybook/react';
import React from 'react';
import SimpleBarChart from '.';
import { dataTypes } from './mockData';
import { select } from '@storybook/addon-knobs';
import { chartTypeMeta } from './';

const displayTypes = Object.keys(chartTypeMeta);

const SimpleBarChartStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = (index = 0, state = 'program', title = 'By Program') => ({
    state: select(`state`, displayTypes, state),
  });

  const currentDisplay = knobs().state;
  return (
    <SimpleBarChart
      data={dataTypes[currentDisplay]}
      type={currentDisplay}
      containerStyle={{ maxWidth: 450 }}
    />
  );
});

export default SimpleBarChartStories;
