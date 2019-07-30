import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/logo_white.svg';
import Typography from '../Typography';
import useTheme from '../utils/useTheme';
import useClickAway from '../utils/useClickAway';
import {
  AppBarContainer,
  LogoContainer,
  LogoImage,
  MenuGroupDisplay,
  MenuItemContainer,
  MenuItemContent,
  SectionDisplay,
  UserBadgeContainer,
} from './styledComponents';

export const UserBadge = ({ firstName = '', lastName = '', title = null, ...otherProps }) => {
  const theme = useTheme();
  return (
    <UserBadgeContainer {...otherProps}>
      <div>
        <Typography variant="navigation" component="div" bold>
          Hello, {firstName}
          {title && (
            <div
              css={css`
                font-size: 12px;
                font-weight: normal;
              `}
            >
              {title}
            </div>
          )}
        </Typography>
      </div>
      <Typography
        variant="subtitle2"
        color="primary"
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
        {(firstName[0] || '').toUpperCase()}
        {(lastName[0] || '').toUpperCase()}
      </Typography>
    </UserBadgeContainer>
  );
};

UserBadge.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired])
    .isRequired,
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

export const MenuItem = React.forwardRef(
  (
    {
      children,
      className,
      id,
      active = false,
      DomComponent = ({ active, ...others }) => <a {...others} />,
      dropdownMenu,
    },
    forwardedRef,
  ) => {
    const ref = forwardedRef || React.createRef();
    const [isDropdownOpen, setDropdownOpen] = React.useState(false);

    useClickAway({
      domElementRef: ref,
      onClickAway: () => setDropdownOpen(false),
      onElementClick: () => setDropdownOpen(!isDropdownOpen),
    });

    return (
      <MenuItemContainer
        className={className}
        id={id}
        ref={el => {
          ref.current = el;
        }}
        active={active}
      >
        <MenuItemContent bold>{children}</MenuItemContent>
        {isDropdownOpen && dropdownMenu}
      </MenuItemContainer>
    );
  },
);

MenuItem.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  DomComponent: PropTypes.func,
  dropdownMenu: PropTypes.node,
  ref: PropTypes.shape({
    current: PropTypes.any,
  }),
};

const AppBar = AppBarContainer;

AppBar.propTypes = {};

export default AppBar;

export { DropdownMenu, DropdownMenuItem } from './DropdownMenu';
