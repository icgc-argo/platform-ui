import { css } from '@emotion/core';
import styled from '@emotion/styled';
import FocusWrapper from 'uikit/FocusWrapper';

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

  color: ${({ theme, variant }) => theme.button.textColors[variant].default};
  background-color: ${({ theme, variant }) => theme.button.colors[variant].default};
  border-color: ${({ theme, variant }) => theme.button.borderColors[variant].default};
  border-width: ${({ theme, size }) => theme.button.borderWeights[size]};
  padding: ${({ theme, size }) => theme.button.paddings[size]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme, size }) => theme.button.fontSizes[size]};

  &:focus {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].focus};
  }

  &:hover {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].hover};
    border-color: ${({ theme, variant }) => theme.button.borderColors[variant].hover};
  }

  &:active {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].active};
    border-color: ${({ theme, variant }) => theme.button.borderColors[variant].active};
  }
  &:disabled {
    background-color: ${({ theme, variant }) => theme.button.colors[variant].disabled};
    border-color: ${({ theme, variant }) => theme.button.borderColors[variant].disabled};
    color: ${({ theme, variant }) => theme.button.textColors[variant].disabled};
  }
`;
export default StyledButton;
