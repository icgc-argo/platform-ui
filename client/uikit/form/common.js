import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { INPUT_STATES } from '../theme/defaultTheme/input';

export const StyledInputWrapper = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;

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
`;
StyledInputWrapper.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  inputState: PropTypes.oneOf(Object.values(INPUT_STATES)),
};
