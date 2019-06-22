import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import Typography from '../Typography';
import React from 'react';

import { INPUT_STATES } from '../theme/defaultTheme/input';

export const INPUT_SIZES = {
  SM: 'sm',
  LG: 'lg',
};

export const StyledInputWrapper = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  height: ${({ size = INPUT_SIZES.SM }) => {
    switch (size) {
      case INPUT_SIZES.SM:
        return '30px';
      case INPUT_SIZES.LG:
        return '36px';
      default:
        return '30px';
    }
  }};

  color: ${({ theme, disabled, error }) =>
    theme.input.textColors[disabled ? 'disabled' : 'default']};
  background-color: ${({ theme, disabled }) =>
    theme.input.colors[disabled ? 'disabled' : 'default']};
  font-size: ${({ theme, size }) => theme.input.fontSizes[size]};
  border-color: ${({ theme, inputState, error, disabled }) => {
    const state = error ? 'error' : disabled ? 'disabled' : inputState;
    return theme.input.borderColors[state];
  }};

  &:hover {
    border-color: ${({ theme, disabled, error }) => {
      if (disabled) return 'initial';
      else if (error) return theme.colors.error;
      else return theme.colors.secondary_1;
    }};
  }
  ${({ getOverrideCss, ...rest }) => (getOverrideCss ? getOverrideCss(rest) : '')}
`;

StyledInputWrapper.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  inputState: PropTypes.oneOf(Object.values(INPUT_STATES)),
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  getOverrideCss: PropTypes.func,
};

export const RadioCheckboxWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.radiocheckbox.borderColors.default};

  background-color: ${({ theme, disabled, checked }) =>
    theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : checked ? 'checked' : 'default']};

  color: ${({ theme, disabled }) =>
    theme.radiocheckbox.textColors[disabled ? 'disabled' : 'default']};

  padding: 4px 6px 4px 8px;

  label {
    ${({ theme }) => css(theme.typography.paragraph)};
    line-height: normal;
    position: relative;
    cursor: pointer;
    color: inherit;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const StyledGroup = styled('div')`
  div {
    margin-top: 2px;
  }
  div:first-child {
    margin: 0;
  }
`;
