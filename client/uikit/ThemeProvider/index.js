import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { ThemeContext } from '@emotion/core';
import PropTypes from 'prop-types';

import defaultTheme from '../theme/defaultTheme';

const themes = {
  default: defaultTheme,
};

const ThemeProvider = ({ theme = 'default', children }) => {
  return (
    <EmotionThemeProvider theme={themes[theme]}>
      <link
        href={'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&display=swap'}
        rel="stylesheet"
      />
      {children}
    </EmotionThemeProvider>
  );
};
ThemeProvider.propTypes = {
  theme: PropTypes.oneOf(Object.keys(themes)),
};

export default ThemeProvider;
export const useTheme = () => React.useContext(ThemeContext);
