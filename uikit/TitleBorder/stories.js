import React from 'react';
import { storiesOf } from '@storybook/react';
import defaultTheme from '../theme/defaultTheme';
import { select } from '@storybook/addon-knobs';

import TitleBorder from '.';
import Typography from '../Typography';

const TitleBorderStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const themeColors = Object.keys(defaultTheme.colors);
  const knobs = {
    color: select('color', themeColors, 'primary', null),
  };
  return (
    <>
      <Typography variant="subtitle">Title</Typography>
      <TitleBorder {...knobs} />
    </>
  );
});

export default TitleBorderStories;
