import { configure, addDecorator } from '@storybook/react';
import React from 'react';

import { ThemeProvider } from '../uikit';

const req = require.context('../components', true, /.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(Story => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
));

configure(loadStories, module);
