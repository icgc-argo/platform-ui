import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTippy } from 'react-tippy';

import { css, styled } from '..';
import useTheme from '../utils/useTheme';
import Typography from '../Typography';

const ToolTip = ({ html, ...rest }) => {
  const theme = useTheme();
  const TooltipContainer = styled('div')`
    ${css(theme.typography.label)}
    background: ${theme.colors.primary_1};
    border-radius: 2px;
    padding: 2px 4px;
    color: white;
    font-weight: normal;
  `;
  return <ReactTippy html={<TooltipContainer id="tooltip">{html}</TooltipContainer>} {...rest} />;
};

// exposing full react-tippy API based on https://github.com/tvkhoa/react-tippy, leaving out some style specific stuff
ToolTip.propTypes = {
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  useContext: PropTypes.bool,
  onRequestClose: PropTypes.func,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  trigger: PropTypes.oneOf(['mouseenter', 'focus', 'click', 'manual']),
  tabIndex: PropTypes.number,
  interactive: PropTypes.bool,
  interactiveBorder: PropTypes.number,
  delay: PropTypes.number,
  hideDelay: PropTypes.number,
  animation: PropTypes.oneOf(['shift', 'perspective', 'fade', 'scale', 'none']),
  animateFill: PropTypes.bool,
  duration: PropTypes.number,
  distance: PropTypes.number,
  offset: PropTypes.number,
  hideOnClick: PropTypes.oneOf([true, false, 'persistent']),
  multiple: PropTypes.bool,
  followCursor: PropTypes.bool,
  inertia: PropTypes.bool,
  transitionFlip: PropTypes.bool,
  popperOptions: PropTypes.object,
  html: PropTypes.any,
  unmountHTMLWhenHide: PropTypes.bool,
  sticky: PropTypes.bool,
  stickyDuration: PropTypes.number,
  touchHold: PropTypes.bool,
  onShow: PropTypes.func,
  onShown: PropTypes.func,
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.PropTypes.object,
};

export default ToolTip;
