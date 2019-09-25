import React from 'react';
import { storiesOf } from '@storybook/react';
import defaultTheme from '../theme/defaultTheme';
import { select, number } from '@storybook/addon-knobs';

import TitleBorder from '.';
import Typography from '../Typography';

const themeColors = Object.keys(defaultTheme.colors);

const TitleBorderStories = storiesOf(`${__dirname}`, module)
  .add('Full width', () => {
    const knobs = {
      color: select('color', themeColors, 'primary', null),
    };
    return (
      <div>
        <TitleBorder {...knobs} />
        <Typography variant="subtitle">Title</Typography>
      </div>
    );
  })
  .add('Fixed width', () => {
    const knobs = {
      color: select('color', themeColors, 'primary', null),
      width: number('Width', 45),
    };
    return (
      <>
        <Typography variant="subtitle">A longer title, but shorter border</Typography>
        <TitleBorder {...knobs} />
      </>
    );
  });

export default TitleBorderStories;
