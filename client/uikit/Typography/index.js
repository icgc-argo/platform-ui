import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { memoize } from 'lodash';

import defaultTheme from '../theme/defaultTheme';
import { useTheme } from '../ThemeProvider';

const defaultTags = {
  hero: 'h1',
  title: 'h2',
  subtitle: 'h3',
  subtitle2: 'h4',
  paragraph: 'p',
};

const createTypographyComponentsFromTheme = memoize(themeObj =>
  Object.entries(themeObj.typography).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: styled(defaultTags[key] || 'span')({}, ({ theme }) => theme.typography[key]),
    }),
    {},
  ),
);

const Typography = ({
  variant = 'paragraph',
  component = null,
  bold = false,
  color = null,
  ...rest
}) => {
  const theme = useTheme();
  const components = createTypographyComponentsFromTheme(theme);
  const Component = component ? components[variant].withComponent(component) : components[variant];
  const StyledText = styled(Component)`
    font-weight: ${bold ? `bold` : `normal`};
    color: ${({ theme }) => (color ? theme.colors[color] || color : 'inherit')};
  `;
  return <StyledText {...rest} />;
};

Typography.propTypes = {
  /**
   * a typography as defined in theme.typography
   */
  variant: PropTypes.oneOf(Object.keys(defaultTheme.typography)),
  /**
   * could be either an html tag name, or a react component
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  bold: PropTypes.bool,
  /**
   * could be a theme colorname, or css color
   */
  color: PropTypes.oneOf(Object.keys(defaultTheme.colors)),
};

export default Typography;
