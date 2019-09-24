import { configure, addDecorator } from '@storybook/react';
import React from 'react';

import { ThemeProvider } from '../uikit';

const req = require.context('../uikit', true, /.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(Story => {
  const StoryComponent = Story as React.ComponentType;
  return (
    <ThemeProvider>
      <StoryComponent />
    </ThemeProvider>
  );
});

configure(loadStories, module);
