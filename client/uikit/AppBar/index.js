import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import logo from "../assets/logo_white.png";
import {
  MenuItemContent,
  MenuItemContainer,
  MenuGroupDisplay,
  AppBarContainer,
  SectionDisplay
} from "./styledComponents";

export const Logo = () => (
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
AppBar.propTypes = {};
export default AppBar;

export const Section = props => <SectionDisplay {...props} />;

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
