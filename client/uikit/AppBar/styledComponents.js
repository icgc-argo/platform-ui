import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import logo from "../assets/logo_white.png";

export const MenuItemContent = styled("span")`
  margin: 0px 24px;
  color: ${({ theme }) => theme.colors.white};

  font-family: ${({ theme }) => theme.typography.navigation.fontFamily};
  font-size: ${({ theme }) => theme.typography.navigation.fontSize};
  font-weight: ${({ theme }) => theme.typography.navigation.fontWeight};
  font-style: ${({ theme }) => theme.typography.navigation.fontStyle};
  font-stretch: ${({ theme }) => theme.typography.navigation.fontStretch};
  line-height: ${({ theme }) => theme.typography.navigation.lineHeight};
  letter-spacing: ${({ theme }) => theme.typography.navigation.letterSpacing};
`;
export const MenuItemContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 148px;
  cursor: pointer;

  border-left: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-right: solid 0.5px ${({ theme }) => theme.colors.grey};
  border-bottom: solid 3px
    ${({ active, theme }) => (active ? theme.colors.accent1 : "none")};
  background-color: ${({ active, theme }) =>
    active ? theme.appBar.menuItem.background.active : "none"};

  &:hover > ${MenuItemContent} {
    color: ${({ theme }) => theme.colors.accent1};
  }
`;
export const MenuGroupDisplay = styled("div")`
  display: flex;
  flex-direction: row;
  & > :not(:first-child) {
    border-left: none;
  }
`;
export const AppBarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const SectionDisplay = styled("div")`
  display: flex;
`;
export const LogoImage = styled("img")`
  margin: 0px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
