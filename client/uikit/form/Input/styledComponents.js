import styled from '@emotion/styled';
import { css } from '@emotion/core';

export { StyledInputWrapper } from '../common';

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
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
`;

export const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 11px;
  background-color: inherit;
  color: inherit;
`;
