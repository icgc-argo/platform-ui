import React from 'react';
import styled from '@emotion/styled';
import { withProps } from 'recompose';

import Icon from '../../Icon';
import Typography from '../../Typography';

export type PopupPosition = 'UP' | 'DOWN';
export const POPUP_POSITIONS = { UP: 'UP' as PopupPosition, DOWN: 'DOWN' as PopupPosition };

export const DropdownIcon = withProps(({ disabled, theme }) => ({
  name: 'chevron_down',
  fill: disabled ? theme.input.textColors.disabled : 'black',
}))(styled<typeof Icon, { disabled?: boolean }>(Icon)`
  height: 100%;
  width: 10px;
  padding: 10px;
  border-left: solid 1px
    ${({ theme, disabled }) => (disabled ? theme.colors.grey_2 : theme.colors.grey_1)};
`);

export const OptionsList = styled('ol')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  border: solid 1px ${({ theme }) => theme.colors.grey_1};
  background: ${({ theme }) => theme.colors.white};
  min-width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 100;

  &.${POPUP_POSITIONS.UP} {
    top: 0;
    transform: translateY(-100%);
  }
  &.${POPUP_POSITIONS.DOWN} {
    top: 100%;
  }
`;

const OptionContainer = styled('li')`
  list-style: none;
  min: 100%;
  padding: 5px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_4};
    cursor: pointer;
  }
`;

const OptionContent = withProps(() => ({
  variant: 'paragraph',
  component: 'span',
}))(Typography);

export const Option = ({ value, children, ...props }) => (
  <OptionContainer data-value={value} role="option" {...props}>
    <OptionContent>{children}</OptionContent>
  </OptionContainer>
);

export const HiddenSelect = styled('select')`
  opacity: 0;
  pointer-events: none;
  z-index: -1000;
  position: absolute;
`;
