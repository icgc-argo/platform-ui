import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
    border-color: ${({ theme }) => theme.input.borderColors.hover};
  }
`;

export const StyledInput = styled('input')`
  padding: ${({ theme, size }) => theme.input.paddings[size]};
  border: none;
  outline: none;
  flex: 1;
  width: 100%;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
`;

export const ErrorMsg = styled('div')`
  ${({ theme }) => css(theme.typography.caption)}
  color: ${({ theme }) => theme.colors.error};
  margin-top: 1px;
  margin-left: 5px;
`;

export const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 11px;
  background-color: inherit;
  color: inherit;
`;
