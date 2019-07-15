// @flow
import {
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_MANAGE_PATH,
  USER_PAGE_PATH,
  SUBMISSION_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
} from 'global/constants/pages';
import useEgoToken from 'global/hooks/useEgoToken';
import { decodeToken, canReadProgram, isRdpcMember } from 'global/utils/egoJwt';
import _ from 'lodash';
import Link from 'next/link';
import * as React from 'react';
import { css } from 'uikit';
import AppBar, {
  Logo,
  MenuGroup,
  MenuItem,
  Section,
  UserBadge,
  DropdownMenu,
  DropdownMenuItem,
} from 'uikit/AppBar';
import Button from 'uikit/Button';
import urlJoin from 'url-join';

const NavbarLink = ({ path, active }: { path: string, active: boolean }) => {
  const titles = {
    [LOGIN_PAGE_PATH]: 'Login',
    [PROGRAMS_LIST_PATH]: 'Programs',
    [PROGRAM_CLINICAL_SUBMISSION_PATH]: 'Dcc Admin',
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

export default (props: { path?: string, logOut: void => void, children?: React.Node }) => {
  const { token: egoJwt } = useEgoToken();
  const { path = '' } = props;
  const userModel = (() => {
    try {
      return decodeToken(egoJwt || '');
    } catch (err) {
      return null;
    }
  })();

  const canAccessSubmission =
    !!egoJwt && (canReadProgram({ egoJwt, programId: '' }) || isRdpcMember(egoJwt));

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
        <MenuGroup>{props.children}</MenuGroup>
      </Section>
      <Section />
      <Section>
        <MenuGroup>
          {canAccessSubmission && (
            <MenuItem active={path.search(SUBMISSION_PATH) === 0}>Submission</MenuItem>
          )}
          {!userModel && <NavbarLink path={LOGIN_PAGE_PATH} active={path === LOGIN_PAGE_PATH} />}
          {userModel && (
            <MenuItem
              dropdownMenu={
                <DropdownMenu>
                  <DropdownMenuItem>Profile & Token</DropdownMenuItem>
                  <DropdownMenuItem onClick={props.logOut}>Logout</DropdownMenuItem>
                </DropdownMenu>
              }
            >
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
