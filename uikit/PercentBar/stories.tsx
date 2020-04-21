import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';
import { number, select } from '@storybook/addon-knobs';

import defaultTheme from '../theme/defaultTheme';
import PercentageBar from '.';

const PercentBarStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const color = select('fill', [null, '#00f', ...Object.keys(defaultTheme.colors)], null);
  return (
    <div style={{ width: '100%', background: 'white' }}>
      <PercentageBar
        num={number('nom', 50)}
        den={number('denom', 100)}
        length={number('denom', 120)}
        fillColor={color}
      />
    </div>
  );
});

export default PercentBarStories;
