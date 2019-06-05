import React from 'react';
import styled from '@emotion/styled';
import { withProps } from 'recompose';

import Icon from '../../Icon';
import Typography from '../../Typography';

export const DropdownIcon = styled(Icon)`
  height: 100%;
  width: 10px;
  padding: 10px;
  border-left: solid 1px ${({ theme }) => theme.colors.grey_1};
`;

export const OptionsList = styled('ol')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  border: solid 1px ${({ theme }) => theme.colors.grey_1};
  background: ${({ theme }) => theme.colors.white};
  min-width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
`;

const OptionContainer = styled('li')`
  list-style: none;
  min-width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_4};
    cursor: pointer;
  }
`;

const OptionContent = withProps(() => ({
  variant: 'paragraph',
  component: 'span',
}))(styled(Typography)`
  padding: 7px;
  line-height: 14px;
`);

export const Option = ({ value, children, ...props }) => (
  <OptionContainer role="option" {...props}>
    <OptionContent>{children}</OptionContent>
  </OptionContainer>
);

export const HiddenSelect = styled('select')`
  opacity: 0;
  pointer-events: none;
  z-index: -1000;
  position: absolute;
`;
