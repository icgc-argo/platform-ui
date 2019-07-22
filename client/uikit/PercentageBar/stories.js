import { storiesOf } from '@storybook/react';
import React from 'react';
import { css } from '..';
import { number, select } from '@storybook/addon-knobs';

import defaultTheme from '../theme/defaultTheme';
import PercentageBar from '.';

const PercentageBarStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const color = select('fill', [null, '#00f', ...Object.keys(defaultTheme.colors)], null);
  return (
    <div style={{ width: '100%', background: 'white' }}>
      <PercentageBar nom={number('nom', 500)} denom={number('denom', 2000)} color={color} />
    </div>
  );
});

export default PercentageBarStories;
