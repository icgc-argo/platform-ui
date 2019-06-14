import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTippy } from 'react-tippy';
import { css, styled } from '..';

// import { styled } from '..';
import Typography from '../Typography';
import { withProps } from 'recompose';

const TooltipContainer = styled('div')`
  ${({ theme }) => css(theme.typography.label)}
  background: green;
  color: white;
`;

const ToolTip = ({ html, ...rest }) => (
  <ReactTippy html={<TooltipContainer>{html}</TooltipContainer>} {...rest} />
);

ToolTip.propTypes = {};

export default ToolTip;
