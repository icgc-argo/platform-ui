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

const LoginLink = props => (
  <Link {...{ props }} id="link-login" prefetch href={`${LOGIN_PAGE_PATH}`} />
);
const ProgramsLink = props => (
  <Link {...props} prefetch href={`${PROGRAMS_LIST_PATH}`} />
);
const ProgramLink = props => (
  <Link {...props} prefetch href={`${PROGRAM_ENTITY_PATH}`} />
);
const DccLink = props => (
  <Link {...props} prefetch href={`${DCC_OVERVIEW_PATH}`} />
);
const UserPageLink = props => (
  <Link {...props} prefetch href={`${USER_PAGE_PATH}`} />
);

export default (props: {}) => (
  <AppBar>
    <Section>
      <Logo />
      <MenuGroup>
        <MenuItem>File Repository</MenuItem>
      </MenuGroup>
    </Section>
    <Section />
    <Section>
      <MenuGroup>
        <MenuItem>Submission System</MenuItem>
        <MenuItem>Login</MenuItem>
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
