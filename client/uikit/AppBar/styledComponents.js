import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withProps } from 'recompose';

import Typography from '../Typography';

const MenuItemTypography = withProps(() => ({
  variant: 'navigation',
}))(Typography);

export const MenuItemContent = styled(MenuItemTypography)`
  margin: 0px 24px;
  text-align: center;
  text-decoration: none;
`;
export const MenuItemContainer = styled('div', {
  shouldForwardProp: propName => propName !== 'active',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 148px;
  cursor: pointer;
  text-decoration: none;

  color: ${({ active, theme }) => (active ? theme.colors.accent1 : theme.colors.white)};
  border-left: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-right: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-bottom: solid 3px ${({ active, theme }) => (active ? theme.colors.accent1 : 'none')};
  background-color: ${({ active, theme }) =>
    active ? theme.appBar.menuItem.background.active : 'none'};

  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
  }
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
  min-height: 64px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const SectionDisplay = styled('div')`
  display: flex;
`;
export const LogoContainer = styled('span')`
  margin: 0px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImage = styled('img')`
  margin: 0px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const UserBadgeContainer = styled('div')`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
`;
