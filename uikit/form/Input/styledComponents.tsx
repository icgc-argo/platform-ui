import styled from '@emotion/styled';
import { css } from '@emotion/core';
export { StyledInputWrapper } from '../common';

export const StyledInput = styled<'input', { inputSize: string }>('input')`
  ${({ theme }) => css(theme.typography.default)};
  padding: ${({ theme, inputSize }) => theme.input.paddings[inputSize]};
  border: none;
  outline: none;
  flex: 1;
  width: 100%;
  min-width: 0;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
  max-height: 100%;
  padding: 0px 10px;
`;

export const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 11px;
  background-color: inherit;
  color: inherit;
`;
