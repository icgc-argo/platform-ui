// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTippy } from 'react-tippy';
import './index.css';

import { css, styled } from '..';
import useTheme from '../utils/useTheme';
import Typography from '../Typography';

// exposing full react-tippy API based on https://github.com/tvkhoa/react-tippy, leaving out some style specific stuff
type TooltipProps = {
  disabled?: boolean,
  open?: boolean,
  useContext?: boolean,
  onRequestClose?: any => any,
  position?: 'top' | 'bottom' | 'left' | 'right',
  trigger?: 'mouseenter' | 'focus' | 'click' | 'manual',
  tabIndex?: number,
  interactive?: boolean,
  interactiveBorder?: number,
  delay?: number,
  hideDelay?: number,
  animation?: 'shift' | 'perspective' | 'fade' | 'scale' | 'none',
  animateFill?: boolean,
  duration?: number,
  distance?: number,
  offset?: number,
  hideOnClick?: true | false | 'persistent',
  multiple?: boolean,
  followCursor?: boolean,
  inertia?: boolean,
  transitionFlip?: boolean,
  popperOptions?: {},
  html?: React.Node,
  unmountHTMLWhenHide?: boolean,
  sticky?: boolean,
  stickyDuration?: number,
  touchHold?: boolean,
  onShow?: any => any,
  onShown?: any => any,
  onHide?: any => any,
  onHidden?: any => any,
  className?: string,
  style?: {},
};

const Tooltip = ({ html, ...rest }: TooltipProps) => {
  const theme = useTheme();
  const TooltipContainer = styled('div')`
    ${css(theme.typography.caption)}
    background: ${theme.colors.primary_1};
    border-radius: 2px;
    padding: 2px 4px;
    color: white;
    font-weight: normal;
  `;
  return <ReactTippy html={<TooltipContainer id="tooltip">{html}</TooltipContainer>} {...rest} />;
};

export default Tooltip;
