import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import defaultTheme from 'uikit/theme/defaultTheme';
import {
  CreateStyledComponentExtrinsic,
  CreateStyledComponentIntrinsic,
} from '@emotion/styled/types';

type StyleCalculationInput = {
  selected?: boolean;
  theme?: typeof defaultTheme;
};

const defaultLabelStyle = ({ selected, theme }: StyleCalculationInput) => css`
  & > .MenuItemContent {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${selected ? theme.colors.secondary_dark : theme.colors.primary};
    &:hover {
      background: ${theme.colors.grey_3};
    }
  }
`;

const level1Style = ({ selected, theme }: StyleCalculationInput) => css`
  ${css(theme.typography.navigation as any)}
  ${defaultLabelStyle({ theme, selected })}
  background: ${theme.colors.white};
  animation: all 1s;
  & > .MenuItemContent {
    padding: 12px;
  }
`;

const level2Style = ({ selected, theme }: StyleCalculationInput) => css`
  ${css(theme.typography.paragraph as any)}
  ${defaultLabelStyle({ theme, selected })}
  border: none;
  border-left: solid 2px;
  font-weight: normal;
  border-left-color: ${selected ? theme.colors.secondary : theme.colors.white};
  background: ${selected ? theme.colors.grey_4 : 'none'};
  & > .MenuItemContent {
    padding-left: 40px;
    padding-right: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    & > ${ContentContainer} {
      line-height: 20px;
    }
  }
`;

const level3Style = ({ selected, theme }: StyleCalculationInput) => css`
  ${css(theme.typography.navigation as any)}
  ${defaultLabelStyle({ theme, selected })}
  border: none;
  font-weight: normal;
  background: ${selected ? theme.colors.secondary_4 : 'none'};
  & > .MenuItemContent {
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 52px;
  }
`;

const defaultStyle = (props: StyleCalculationInput) => css`
  ${level1Style(props)}
  ${defaultLabelStyle(props)}
  .MenuItemContainer > & {
    ${level2Style(props)}
    .MenuItemContainer > & {
      ${level3Style(props)}
    }
  }
`;

export const MenuItemContainer = styled<'div', { level?: 1 | 2 | 3; selected?: boolean }>('div')`
  & a {
    text-decoration: none;
  }
  ${({ level, ...rest }) =>
    level === 1
      ? level1Style(rest)
      : level === 2
      ? level2Style(rest)
      : level === 3
      ? level3Style(rest)
      : defaultStyle(rest)}
`;

export const IconContainer = styled('span')`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled('button')<{ as?: string }>`
  border: none;
  width: 100%;
  padding: 0px;
  background: none;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
