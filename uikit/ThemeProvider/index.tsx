import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { ThemeContext } from '@emotion/core';
import PropTypes from 'prop-types';

import defaultTheme from '../theme/defaultTheme';

const themes = {
  default: defaultTheme,
};

const ThemeProvider: React.ComponentType<{ theme?: keyof typeof themes }> = ({
  theme = 'default',
  children,
}) => {
  return (
    <EmotionThemeProvider theme={themes[theme]}>
      <link
        href={'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600&display=swap'}
        rel="stylesheet"
      />
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
export const useTheme = () => React.useContext(ThemeContext as React.Context<typeof defaultTheme>);
