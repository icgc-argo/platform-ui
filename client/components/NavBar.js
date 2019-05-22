// @flow
import React from "react";
import Link from "next/link";

import {
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_ENTITY_PATH,
  DCC_OVERVIEW_PATH,
  USER_PAGE_PATH
} from "global/constants";
import AppBar, {
  Logo,
  MenuGroup,
  MenuItem,
  Section,
  UserBadge
} from "uikit/AppBar";

const NavbarLink = ({ path, active }: { path: string, active: boolean }) => {
  const titles = {
    [LOGIN_PAGE_PATH]: "Login",
    [PROGRAMS_LIST_PATH]: "Programs",
    [PROGRAM_ENTITY_PATH]: "Program",
    [DCC_OVERVIEW_PATH]: "Dcc Admin",
    [USER_PAGE_PATH]: "User"
  };
  return (
    <MenuItem
      DomComponent={props => (
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

export default (props: { path: string }) => (
  <AppBar>
    <Section>
      <Logo
        DomComponent={props => (
          <Link prefetch href={`/`}>
            <a {...props} id="home-login" />
          </Link>
        )}
      />
      <MenuGroup>
        <NavbarLink
          path={PROGRAMS_LIST_PATH}
          active={props.path === PROGRAMS_LIST_PATH}
        />
        <NavbarLink
          path={PROGRAM_ENTITY_PATH}
          active={props.path === PROGRAM_ENTITY_PATH}
        />
        <NavbarLink
          path={DCC_OVERVIEW_PATH}
          active={props.path === DCC_OVERVIEW_PATH}
        />
        <NavbarLink
          path={USER_PAGE_PATH}
          active={props.path === USER_PAGE_PATH}
        />
      </MenuGroup>
    </Section>
    <Section />
    <Section>
      <MenuGroup>
        <MenuItem>Submission System</MenuItem>
        <NavbarLink
          path={LOGIN_PAGE_PATH}
          active={props.path === LOGIN_PAGE_PATH}
        />
        <MenuItem>
          <UserBadge
            name="Sarah"
            title="DCC Member"
            imageUrl={
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            }
          />
        </MenuItem>
      </MenuGroup>
    </Section>
  </AppBar>
);
