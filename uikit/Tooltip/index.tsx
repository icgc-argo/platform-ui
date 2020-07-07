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

// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTippy } from 'react-tippy';

import { css, styled } from '..';
import useTheme from '../utils/useTheme';
import { Global } from '@emotion/core';
import { merge } from 'lodash';

// exposing full react-tippy API based on https://github.com/tvkhoa/react-tippy, leaving out some style specific stuff
export type TooltipProps = {
  disabled?: boolean;
  open?: boolean;
  useContext?: boolean;
  onRequestClose?: (e: any) => any;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'mouseenter' | 'focus' | 'click' | 'manual';
  tabIndex?: number;
  interactive?: boolean;
  interactiveBorder?: number;
  delay?: number;
  hideDelay?: number;
  animation?: 'shift' | 'perspective' | 'fade' | 'scale' | 'none';
  animateFill?: boolean;
  duration?: number;
  distance?: number;
  offset?: number;
  hideOnClick?: true | false | 'persistent';
  multiple?: boolean;
  followCursor?: boolean;
  inertia?: boolean;
  transitionFlip?: boolean;
  popperOptions?: {};
  html?: React.ReactNode;
  unmountHTMLWhenHide?: boolean;
  sticky?: boolean;
  stickyDuration?: number;
  touchHold?: boolean;
  onShow?: (d: any) => any;
  onShown?: (d: any) => any;
  onHide?: (d: any) => any;
  onHidden?: (d: any) => any;
  className?: string;
  style?: {};
};

const Tooltip: React.ComponentType<TooltipProps> = ({ html, position = 'top', ...rest }) => {
  const theme = useTheme();
  const arrowStyles = {
    top: `
    right: 50%;
      top: 100%;
      border-top-color: ${theme.colors.primary_1};
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      margin-right: -5px;
      pointer-events: none;
    `,
    left: `
      bottom: 50%;
      left: 100%;
      border-left-color: ${theme.colors.primary_1};
      border-bottom: 5px solid transparent;
      border-top: 5px solid transparent;
      margin-bottom: -5px;
      pointer-events: none;
    `,
    bottom: `
      left: 50%;
      bottom: 100%;
      border-bottom-color: ${theme.colors.primary_1};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      margin-left: -5px;
      pointer-events: none;
    `,
    right: `
      top: 50%;
      right: 100%;
      border-right-color: ${theme.colors.primary_1};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      margin-top: -5px;
      pointer-events: none;
    `,
  };

  const TooltipContainer = styled('div')`
    ${css(theme.typography.caption as any)}
    background: ${theme.colors.primary_1};
    border-radius: 2px;
    padding: 2px 4px;
    color: white;
    font-weight: normal;
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      ${arrowStyles[position]}
    }
  `;

  return (
    <>
      <Global
        styles={css`
          .tippy-popper .leave {
            opacity: 0;
          }
        `}
      />
      <ReactTippy
        popperOptions={{
          modifiers: merge(
            {
              preventOverflow: {
                enabled: false,
              },
              flip: {
                enabled: false,
              },
              hide: {
                enabled: false,
              },
            },
            rest.popperOptions,
          ),
        }}
        html={<TooltipContainer id="tooltip">{html}</TooltipContainer>}
        position={position}
        {...rest}
      />
    </>
  );
};

export default Tooltip;
