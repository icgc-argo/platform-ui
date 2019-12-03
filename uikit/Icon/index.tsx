import React, { SVGAttributes } from 'react';
import PropTypes, { string } from 'prop-types';
import icons from './icons';
import { css } from '@emotion/core';
import useTheme from '../utils/useTheme';
import defaultTheme from '../theme/defaultTheme';
import { ThemeColorNames } from '../theme/types';
import { UikitIconNames } from './icons';
import { SvgProperties } from 'csstype';

const Icon: React.ComponentType<
  {
    name: UikitIconNames;
    className?: string;
    title?: string;
    width?: string;
    height?: string;
    fill?: keyof ThemeColorNames | string;
  } & SVGAttributes<SVGElement>
> = ({ name, width, height, fill, className, title, ...rest }) => {
  const theme = useTheme();
  const svg: Omit<typeof icons[typeof name], 'fillRule'> & {
    mask?: string;
    pathDefinitions?: any[];
    fillRule?: string;
    defaultFill?: string;
    path?: string;
  } = icons[name];

  const resolveFill = (fill?: string): string | undefined => (fill && theme.colors[fill]) || fill;

  return (
    <svg
      css={css`
        ${svg.css || ''}
        height: ${height};
        width: ${width};
      `}
      className={className}
      width={width}
      height={height}
      viewBox={svg.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={title || svg.title}
      {...rest}
    >
      <g>
        {svg.mask ? (
          <mask id="mask" fill="#fff">
            <path d={svg.mask} />
          </mask>
        ) : null}
        {svg.pathDefinitions ? (
          svg.pathDefinitions.map((pathDef, i) => (
            <path
              key={i}
              fill={pathDef.fill || resolveFill(fill) || pathDef.defaultFill || svg.defaultFill}
              fillRule={pathDef.fillRule || svg.fillRule || 'nonzero'}
              d={pathDef.d}
              mask={pathDef.mask || svg.mask ? 'url(#mask)' : ''}
            />
          ))
        ) : (
          <path
            fill={resolveFill(fill) || svg.defaultFill}
            fillRule={(svg.fillRule as SVGAttributes<SVGPathElement>['fillRule']) || 'nonzero'}
            d={svg.path}
            mask={svg.mask ? 'url(#mask)' : ''}
          />
        )}
      </g>
    </svg>
  );
};

const toKeyValueMap = (acc, [key, value]) => ({
  ...acc,
  [key]: key,
  [value]: value,
});

export const ICON_NAMES = Object.freeze(Object.entries(icons).reduce(toKeyValueMap, {}));

export const BUILT_IN_ICON_COLORS: { [k in UikitIconNames]: UikitIconNames } = Object.freeze(
  Object.entries(defaultTheme.colors).reduce(toKeyValueMap, {}),
);

export default Icon;
