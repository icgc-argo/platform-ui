/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
import { DropdownMenuItem } from './DropdownMenu';

export const UserBadge = ({
  firstName = '',
  lastName = '',
  title = null,
  showGreeting = true,
  ...otherProps
}) => {
  const theme = useTheme();

  const UserNameIcon = () => (
    <Typography
      variant="subtitle2"
      color="primary"
      component="div"
      css={css`
        width: 40px;
        height: 40px;
        margin-left: ${showGreeting ? '20px' : ''};
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
  );

  return showGreeting ? (
    <UserBadgeContainer {...otherProps}>
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
      <UserNameIcon />
    </UserBadgeContainer>
  ) : (
    <UserNameIcon />
  );
};

UserBadge.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired])
    .isRequired,
};

export const Logo = ({ DomComponent = (props) => <span {...props} /> }) => {
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

export const Section = (props) => <SectionDisplay {...props} />;

export const MenuGroup = (props) => <MenuGroupDisplay {...props} />;

export const MenuItem = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean;
    id?: string;
    className?: string;
    DomComponent?: React.ComponentType;
    dropdownMenu?: React.ReactNode;
    children?: React.ReactNode;
  }
>(
  (
    {
      children,
      className,
      id,
      active = false,
      DomComponent = ({ active, ...others }: { active: boolean }) => <a {...others} />,
      dropdownMenu,
    },
    forwardedRef,
  ) => {
    const ref = (forwardedRef || React.createRef()) as React.RefObject<HTMLDivElement>;
    const [isDropdownOpen, setDropdownOpen] = React.useState(false);

    useClickAway({
      domElementRef: ref,
      onClickAway: () => setDropdownOpen(false),
      onElementClick: () => setDropdownOpen(!isDropdownOpen),
    });

    return (
      <MenuItemContainer className={className} id={id} ref={ref} active={active}>
        <MenuItemContent bold>{children}</MenuItemContent>
        {isDropdownOpen && dropdownMenu}
      </MenuItemContainer>
    );
  },
);

const AppBar = AppBarContainer;

AppBar.propTypes = {};

export default AppBar;

export { DropdownMenu, DropdownMenuItem } from './DropdownMenu';

export type NavElement = {
  name: string;
  active: boolean;
  href: string;
  as?: string;
  isLink?: boolean;
  shouldRender?: boolean;
  onClick?: () => any;
  isDropdown?: boolean;
  LinkComp: React.ComponentType;
};

export const NavBarElement = ({
  isLink = true,
  shouldRender = true,
  name,
  onClick = () => null,
  active,
  isDropdown = false,
  LinkComp,
  ...props
}: NavElement) => {
  const navItem = isDropdown ? (
    <DropdownMenuItem ref={React.createRef()} active={active}>
      {name}
    </DropdownMenuItem>
  ) : (
    <MenuItem ref={React.createRef()} active={active}>
      <Typography variant={'default'}>{name}</Typography>
    </MenuItem>
  );

  return shouldRender ? (
    isLink ? (
      <LinkComp
        {...props}
        css={css`
          cursor: pointer;
        `}
      >
        <a
          css={css`
            height: 100%;
          `}
        >
          {navItem}
        </a>
      </LinkComp>
    ) : (
      <div onClick={onClick}> {navItem} </div>
    )
  ) : null;
};
