import { storiesOf } from '@storybook/react';
import React from 'react';
import ReactJson from 'react-json-view';
import { radios } from '@storybook/addon-knobs';

import ThemeProvider, { useTheme } from '.';
import defaultTheme from '../theme/defaultTheme';
import Typography from '../Typography';

const ThemeViewer = () => {
  const myTheme = useTheme();
  return <ReactJson src={myTheme} collapsed={1} />;
};

const ColorViewer = () => {
  const theme = useTheme();
  return Object.entries(theme.colors).map(([name, value]) => (
    <div
      style={{
        background: value,
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          padding: '10px',
          width: '100px',
        }}
      >
        <Typography variant={'paragraph'}>
          {name} <pre>{value}</pre>
        </Typography>
      </div>
    </div>
  ));
};

const createThemeKnobs = () => {
  theme: radios('theme', { default: 'default' });
};

const ThemeProviderStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => (
    <ThemeProvider {...createThemeKnobs()}>
      <ThemeViewer />
    </ThemeProvider>
  ))
  .add('Colors', () => (
    <ThemeProvider {...createThemeKnobs()}>
      <ColorViewer />
    </ThemeProvider>
  ));

export default ThemeProviderStories;
