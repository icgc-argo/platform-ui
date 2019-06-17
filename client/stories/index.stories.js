import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { ThemeProvider } from '../uikit';

const req = require.context('../uikit', true, /.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

addDecorator(withKnobs);

configure(loadStories, module);
