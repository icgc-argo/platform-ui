//@flow
import React from 'react';
import PropTypes from 'prop-types';
import icons from './icons';
import { css } from '@emotion/core';
import useTheme from '../utils/useTheme';
import defaultTheme from '../theme/defaultTheme';
import type { ThemeColorNames } from '../theme/types';
import type { UikitIconNames } from './icons';

const Icon = ({
  name,
  width,
  height,
  fill,
  className,
  title,
  ...rest
}: {
  name: UikitIconNames,
  className?: string,
  title?: string,
  width?: string,
  height?: string,
  fill?: ThemeColorNames | string,
}) => {
  const theme = useTheme();
  const svg = icons[name];

  const resolveFill = (fill: ?string): ?string => (fill && theme.colors[fill]) || fill;

  return (
    <svg
      css={css`
        ${svg.css};
        height: ${height};
        width: ${width};
      `}
      className={className}
      width={width}
      height={height}
      viewBox={svg.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title lang="en">{title || svg.title}</title>
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
              fillRule={pathDef.fillRule || svg.fillRule || 'nonezero'}
              d={pathDef.d}
              mask={pathDef.mask || svg.mask ? 'url(#mask)' : ''}
            />
          ))
        ) : (
          <path
            fill={resolveFill(fill) || svg.defaultFill}
            fillRule={svg.fillRule || 'nonezero'}
            d={svg.path}
            mask={svg.mask ? 'url(#mask)' : ''}
          />
        )}
      </g>
    </svg>
  );
};

const toKeyValueMap = (acc, [key]) => ({
  ...acc,
  [key]: key,
});

export const ICON_NAMES = Object.freeze(Object.entries(icons).reduce(toKeyValueMap, {}));

export const BUILT_IN_ICON_COLORS: { [k: UikitIconNames]: UikitIconNames } = Object.freeze(
  Object.entries(defaultTheme.colors).reduce(toKeyValueMap, {}),
);

export default Icon;
