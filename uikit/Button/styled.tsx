import { css } from '@emotion/core';
import styled from '@emotion/styled';
import FocusWrapper from 'uikit/FocusWrapper';

const base = ({ theme, size, variant, disabled }) => css`
  color: ${theme.button.textColors[variant].default};
  background-color: ${theme.button.colors[variant].default};
  border-color: ${theme.button.borderColors[variant].default};
  border-width: ${theme.button.borderWeights[size]};
  padding: ${theme.button.paddings[size]};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  font-size: ${theme.button.fontSizes[size]};

  &:focus {
    background-color: ${theme.button.colors[variant].focus};
  }

  &:hover {
    background-color: ${theme.button.colors[variant].hover};
    border-color: ${theme.button.borderColors[variant].hover};
  }

  &:active {
    background-color: ${theme.button.colors[variant].active};
    border-color: ${theme.button.borderColors[variant].active};
  }
`;

const disabled = ({ theme, variant }) => css`
  background-color: ${theme.button.colors[variant].disabled};
  border-color: ${theme.button.borderColors[variant].disabled};
  color: ${theme.button.textColors[variant].disabled};
`;

const StyledButton = styled<
  typeof FocusWrapper,
  {
    size: 'sm' | 'md';
    variant: 'primary' | 'secondary' | 'text';
    disabled: boolean;
  }
>(FocusWrapper)`
  ${({ theme }) => css(theme.typography.default)};
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 100px;
  font-weight: 600;
  text-transform: uppercase;
  border-style: solid;

  ${base}

  &:disabled {
    ${disabled}
  }
`;
export default StyledButton;
