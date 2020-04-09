// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTippy } from 'react-tippy';

import { css, styled } from '..';
import useTheme from '../utils/useTheme';
import Typography from '../Typography';
import { Global } from '@emotion/core';

// exposing full react-tippy API based on https://github.com/tvkhoa/react-tippy, leaving out some style specific stuff
type TooltipProps = {
  disabled?: boolean;
  open?: boolean;
  useContext?: boolean;
  onRequestClose?: (e: any) => any;
  position: 'top' | 'bottom' | 'left' | 'right';
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
    `,
    left: `
      bottom: 50%;
      left: 100%;
      border-left-color: ${theme.colors.primary_1};
      border-bottom: 5px solid transparent;
      border-top: 5px solid transparent;
      margin-bottom: -5px;
    `,
    bottom: `
      left: 50%;
      bottom: 100%;
      border-bottom-color: ${theme.colors.primary_1};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      margin-left: -5px;
    `,
    right: `
      top: 50%;
      right: 100%;
      border-right-color: ${theme.colors.primary_1};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      margin-top: -5px
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
          modifiers: {
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
          ...rest.popperOptions,
        }}
        html={<TooltipContainer id="tooltip">{html}</TooltipContainer>}
        position={position}
        {...rest}
      />
    </>
  );
};

export default Tooltip;
