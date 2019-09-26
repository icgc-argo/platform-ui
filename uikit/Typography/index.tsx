import * as React from 'react';
import styled from '@emotion/styled';
import memoize from 'lodash/memoize';

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

const createDomComponent = memoize(
  (domComponentName: string, components: { [k: string]: any }, variant: string) =>
    components[variant].withComponent(domComponentName),
  /** @todo: this cache-key resolution doesn't take into account components, so theme change won't properly change typography atm. Need to fix this!  */
  (domComponentName, components, variant) => `${domComponentName}.${variant}`,
);

const createStyledDomComponent = memoize(
  Component => styled<'div', { bold?: boolean; color?: string }>(Component)`
    font-weight: ${({ bold }) => (bold ? `bold` : `normal`)};
    color: ${({ theme, color }) => (color ? theme.colors[color] || color : 'inherit')};
  `,
);

export type TypographyVariant = keyof typeof defaultTheme.typography;
const Typography: React.ComponentType<
  {
    /**
     * a typography as defined in theme.typography
     */
    variant?: TypographyVariant;
    /**
     * could be either an html tag name, or a react component
     */
    component?: string;
    bold?: boolean;
    /**
     * could be a theme colorname, or css color
     */
    color?: string;
    as?: keyof HTMLElementTagNameMap;
  } & React.ComponentProps<ReturnType<typeof createStyledDomComponent>>
> = ({ variant = 'paragraph', component: domComponentName, bold = false, color, ...rest }) => {
  const theme = useTheme();
  const componentMap: {
    [k: string]: any;
  } = createTypographyComponentMapFromTheme(theme);
  const Component = domComponentName
    ? createDomComponent(domComponentName, componentMap, variant)
    : componentMap[variant];
  const StyledText = createStyledDomComponent(Component);
  return <StyledText {...rest} bold={bold} color={color} />;
};

export default Typography;
