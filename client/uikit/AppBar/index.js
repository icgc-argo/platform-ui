import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import logo from "../assets/white.png";

const MenuItemContent = styled("span")`
  margin: 0px 24px;
  color: ${({ theme }) => theme.colors.white};
`;
const MenuItemContainer = styled("div")`
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
const MenuGroupDisplay = styled("div")`
  display: flex;
  flex-direction: row;
  & > :not(:first-child) {
    border-left: none;
  }
`;
const AppBarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const DefaultLogo = () => (
  <span
    css={css`
      margin: 0px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    <img src={logo} />
  </span>
);

const AppBar = ({ children }) => <AppBarContainer>{children}</AppBarContainer>;
AppBar.propTypes = {
  Logo: PropTypes.func
};
export default AppBar;

export const Left = styled("div")`
  display: flex;
`;

export const MenuGroup = props => <MenuGroupDisplay {...props} />;

export const MenuItem = ({
  children,
  className,
  id,
  ref,
  active = false,
  DomComponent = props => <a {...props} />
}) => {
  const ComposedMenuItem = MenuItemContainer.withComponent(DomComponent);
  return (
    <ComposedMenuItem className={className} id={id} ref={ref} active={active}>
      <MenuItemContent>{children}</MenuItemContent>
    </ComposedMenuItem>
  );
};
MenuItem.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  DomComponent: PropTypes.func
};
