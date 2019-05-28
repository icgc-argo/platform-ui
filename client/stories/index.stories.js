import { configure, addDecorator } from '@storybook/react';
import React from 'react';

import theme from '../uikit/theme/defaultTheme';
import { ThemeProvider } from '../uikit';

const req = require.context('../uikit', true, /.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

configure(loadStories, module);
