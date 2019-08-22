// @flow
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
  span: 'span',
};

const createTypographyComponentMapFromTheme = memoize(themeObj =>
  Object.entries(themeObj.typography).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: styled(defaultTags[key] || 'span')({}, ({ theme }) => theme.typography[key]),
    }),
    {},
  ),
);

const createDomComponent = memoize((domComponentName, components, variant) =>
  components[variant].withComponent(domComponentName),
);

const createStyledDomComponent = memoize(
  Component => styled(Component)`
    font-weight: ${({ bold }) => (bold ? `bold` : `normal`)};
    color: ${({ theme, color }) => (color ? theme.colors[color] || color : 'inherit')};
  `,
);

const Typography = ({
  variant = 'paragraph',
  component: domComponentName,
  bold = false,
  color,
  ...rest
}: {
  /**
   * a typography as defined in theme.typography
   */
  variant?: $Keys<typeof defaultTheme.typography>,
  /**
   * could be either an html tag name, or a react component
   */
  component?: string,
  bold?: boolean,
  /**
   * could be a theme colorname, or css color
   */
  color?: string,
}) => {
  const theme = useTheme();
  const componentMap: {
    [k: string]: any,
  } = createTypographyComponentMapFromTheme(theme);
  const Component = domComponentName
    ? createDomComponent(domComponentName, componentMap, variant)
    : componentMap[variant];
  const StyledText = createStyledDomComponent(Component);
  return <StyledText {...rest} bold={bold} color={color} />;
};

export default Typography;
