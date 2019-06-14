import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import logo from '../assets/logo_white.svg';
import Typography from '../Typography';
import {
  MenuItemContent,
  MenuItemContainer,
  MenuGroupDisplay,
  AppBarContainer,
  SectionDisplay,
  LogoImage,
  LogoContainer,
  UserBadgeContainer,
} from './styledComponents';

export const UserBadge = ({ name, title, imageUrl }) => (
  <UserBadgeContainer>
    <div>
      <Typography variant="navigation" component="div" bold>
        Hello, {name}
      </Typography>
      <Typography variant="navigation" component="div" color="grey_1">
        {title}
      </Typography>
    </div>
    <img
      style={{
        width: '40px',
        height: '40px',
        marginLeft: '20px',
        borderRadius: '1000px',
      }}
      src={imageUrl}
      alt="User Image"
    />
  </UserBadgeContainer>
);
UserBadge.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export const Logo = ({ DomComponent = props => <span {...props} /> }) => {
  const ContainerComponent = LogoContainer.withComponent(DomComponent);
  return (
    <ContainerComponent>
      <LogoImage src={logo} alt="Argo Logo" />
    </ContainerComponent>
  );
};
Logo.propTypes = {
  DomComponent: PropTypes.func,
};

export const Section = props => <SectionDisplay {...props} />;

export const MenuGroup = props => <MenuGroupDisplay {...props} />;

export const MenuItem = ({
  children,
  className,
  id,
  ref,
  active = false,
  DomComponent = ({ active, ...others }) => <a {...others} />,
}) => {
  const ComposedContainer = MenuItemContainer.withComponent(DomComponent);
  return (
    <ComposedContainer className={className} id={id} ref={ref} active={active}>
      <MenuItemContent bold>{children}</MenuItemContent>
    </ComposedContainer>
  );
};
MenuItem.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  DomComponent: PropTypes.func,
};

const AppBar = AppBarContainer;
AppBar.propTypes = {};
export default AppBar;
