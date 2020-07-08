/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { SVGAttributes } from 'react';
import PropTypes, { string } from 'prop-types';
import icons from './icons';
import { css } from '@emotion/core';
import useTheme from '../utils/useTheme';
import defaultTheme from '../theme/defaultTheme';
import { ThemeColorNames } from '../theme/types';
import { UikitIconNames } from './icons';
import { SvgProperties } from 'csstype';
import get from 'lodash/get';
export type Outline = { color: keyof ThemeColorNames | string; width: number };
const Icon: React.ComponentType<
  {
    name: UikitIconNames;
    className?: string;
    title?: string;
    width?: string;
    height?: string;
    fill?: keyof ThemeColorNames | string;
    outline?: Outline;
  } & SVGAttributes<SVGElement>
> = ({ name, width, height, fill, className, title, outline, ...rest }) => {
  const theme = useTheme();
  const svg: Omit<typeof icons[typeof name], 'fillRule'> & {
    mask?: string;
    pathDefinitions?: any[];
    fillRule?: string;
    defaultFill?: string;
    path?: string;
  } = icons[name];

  const resolveFill = (fill?: string): string | undefined => (fill && theme.colors[fill]) || fill;

  const resolveOutline = (outline?: Outline) =>
    outline ? { ...outline, color: resolveFill(outline.color) } : null;

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
              stroke={get(resolveOutline(outline), 'color', null)}
              strokeWidth={get(resolveOutline(outline), 'width', null)}
              fillRule={pathDef.fillRule || svg.fillRule || 'nonzero'}
              d={pathDef.d}
              mask={pathDef.mask || svg.mask ? 'url(#mask)' : ''}
            />
          ))
        ) : (
          <path
            fill={resolveFill(fill) || svg.defaultFill}
            stroke={get(resolveOutline(outline), 'color', null)}
            strokeWidth={get(resolveOutline(outline), 'width', null)}
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
