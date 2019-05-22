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
  SectionDisplay,
  LogoImage,
  LogoContainer,
  UserBadgeContainer
} from "./styledComponents";

export const UserBadge = ({ name, title, imageUrl }) => (
  <UserBadgeContainer>
    <div>
      <div>Hello, {name}</div>
      <div>{title}</div>
    </div>
    <img
      style={{
        width: "40px",
        height: "40px",
        marginLeft: "20px",
        borderRadius: "1000px"
      }}
      src={imageUrl}
    />
  </UserBadgeContainer>
);
UserBadge.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export const Logo = ({ DomComponent = props => <span {...props} /> }) => {
  const ContainerComponent = LogoContainer.withComponent(DomComponent);
  return (
    <ContainerComponent>
      <LogoImage src={logo} />
    </ContainerComponent>
  );
};
Logo.propTypes = {
  DomComponent: PropTypes.func
};

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

const AppBar = ({ children }) => <AppBarContainer>{children}</AppBarContainer>;
AppBar.propTypes = {};
export default AppBar;
