import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import useTheme from '../utils/useTheme';
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

export const UserBadge = ({ firstName = '', lastName = '', title }) => {
  const theme = useTheme();
  return (
    <UserBadgeContainer>
      <div>
        <Typography variant="navigation" component="div" bold>
          Hello, {firstName}
        </Typography>
        <Typography variant="navigation" component="div" color="grey_1">
          {title}
        </Typography>
      </div>
      <Typography
        variant="subtitle2"
        color="accent1_dark"
        component="div"
        css={css`
          width: 40px;
          height: 40px;
          margin-left: 20px;
          border-radius: 1000px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.accent1_3};
        `}
      >
        {firstName[0].toUpperCase()}
        {lastName[0].toUpperCase()}
      </Typography>
    </UserBadgeContainer>
  );
};
UserBadge.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
