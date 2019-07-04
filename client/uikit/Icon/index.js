import React from 'react';
import PropTypes from 'prop-types';
import icons from './icons';
import { css } from '@emotion/core';
import useTheme from '../utils/useTheme';
import defaultTheme from '../theme/defaultTheme';

const Icon = ({ name, width, height, fill, className, title, ...rest }) => {
  const theme = useTheme();
  const svg = icons[name];

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
              fill={
                pathDef.fill || theme.colors[fill] || fill || pathDef.defaultFill || svg.defaultFill
              }
              fillRule={pathDef.fillRule || svg.fillRule || 'nonezero'}
              d={pathDef.d}
              mask={pathDef.mask || svg.mask ? 'url(#mask)' : ''}
            />
          ))
        ) : (
          <path
            fill={theme.colors[fill] || fill || svg.defaultFill}
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

export const BUILT_IN_ICON_COLORS = Object.freeze(
  Object.entries(defaultTheme.colors).reduce(toKeyValueMap, {}),
);

Icon.propTypes = {
  name: PropTypes.oneOf(Object.values(ICON_NAMES)).isRequired,
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};

export default Icon;
