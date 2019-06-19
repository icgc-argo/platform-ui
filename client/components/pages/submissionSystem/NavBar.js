// @flow
import React from 'react';
import Link from 'next/link';

import {
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_ENTITY_PATH,
  DCC_OVERVIEW_PATH,
  USER_PAGE_PATH,
} from 'global/constants';
import useEgoToken from 'global/hooks/useEgoToken';
import { decodeToken } from 'global/utils/egoJwt';
import AppBar, { Logo, MenuGroup, MenuItem, Section, UserBadge } from 'uikit/AppBar';
import Button from 'uikit/Button';
import { css } from 'uikit';

const NavbarLink = ({ path, active }: { path: string, active: boolean }) => {
  const titles = {
    [LOGIN_PAGE_PATH]: 'Login',
    [PROGRAMS_LIST_PATH]: 'Programs',
    [PROGRAM_ENTITY_PATH]: 'Program',
    [DCC_OVERVIEW_PATH]: 'Dcc Admin',
    [USER_PAGE_PATH]: 'User',
  };
  return (
    <MenuItem
      DomComponent={({ active, ...props }) => (
        <Link prefetch href={path}>
          <a {...props} id="link-login" />
        </Link>
      )}
      active={active}
    >
      {titles[path]}
    </MenuItem>
  );
};

export default (props: { path: string, logOut: void => void }) => {
  const { token: egoJwt } = useEgoToken();
  const userModel = (() => {
    try {
      return decodeToken(egoJwt || '');
    } catch (err) {
      return null;
    }
  })();
  return (
    <AppBar
      css={css`
        position: sticky;
        top: 0px;
        z-index: 2;
      `}
    >
      <Section>
        <Logo
          DomComponent={props => (
            <Link prefetch href={`/`}>
              <a {...props} id="home-login" />
            </Link>
          )}
        />
        <MenuGroup>
          <NavbarLink path={PROGRAMS_LIST_PATH} active={props.path === PROGRAMS_LIST_PATH} />
          {/* <NavbarLink path={PROGRAM_ENTITY_PATH} active={props.path === PROGRAM_ENTITY_PATH} />
          <NavbarLink path={DCC_OVERVIEW_PATH} active={props.path === DCC_OVERVIEW_PATH} />
          <NavbarLink path={USER_PAGE_PATH} active={props.path === USER_PAGE_PATH} /> */}
          {/* <MenuItem>File Repository</MenuItem> */}
        </MenuGroup>
      </Section>
      <Section />
      <Section>
        <MenuGroup>
          <MenuItem>Submission System</MenuItem>
          <MenuItem>
            <Button onClick={props.logOut}> logout </Button>
          </MenuItem>
          <NavbarLink path={LOGIN_PAGE_PATH} active={props.path === LOGIN_PAGE_PATH} />
          {userModel && (
            <MenuItem>
              <UserBadge
                firstName={userModel.context.user.firstName}
                lastName={userModel.context.user.lastName}
                title={'Some Role'}
              />
            </MenuItem>
          )}
        </MenuGroup>
      </Section>
    </AppBar>
  );
};
