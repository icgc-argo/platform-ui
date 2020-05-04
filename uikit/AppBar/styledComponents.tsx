import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withProps } from 'recompose';

import Typography from '../Typography';

const MenuItemTypography: typeof Typography = withProps(() => ({
  variant: 'navigation',
}))(Typography);

export const MenuItemContent = styled(MenuItemTypography)`
  margin: 0px 24px;
  text-align: center;
  text-decoration: none;
`;
export const MenuItemContainer = styled<
  'div',
  {
    active: boolean;
  }
>('div', {
  shouldForwardProp: propName => propName !== 'active',
})`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 148px;
  cursor: pointer;
  text-decoration: none;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
    background-color: ${({ theme }) => theme.appBar.menuItem.background.hover};
  }

  color: ${({ active, theme }) => (active ? theme.colors.accent1 : theme.colors.white)};
  border-left: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-right: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-bottom: solid 3px ${({ active, theme }) => (active ? theme.colors.accent1 : 'none')};
`;
export const MenuGroupDisplay = styled('div')`
  display: flex;
  flex-direction: row;
  & > :not(:first-of-type) {
    border-left: none;
  }
`;
export const AppBarContainer = styled('nav')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 58px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;
export const SectionDisplay = styled('div')`
  display: flex;
`;
export const LogoContainer = styled('span')`
  margin: 0px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImage = styled('img')`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const UserBadgeContainer = styled('div')`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  margin: 0 -24px;
  padding: 0 16px;
  box-sizing: border-box;
`;
