// @flow
import {
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_MANAGE_PATH,
  USER_PAGE_PATH,
  SUBMISSION_PATH,
  PROGRAM_CLINICAL_SUBMISSION_PATH,
} from 'global/constants/pages';
import useAuthContext from 'global/hooks/useAuthContext';
import {
  decodeToken,
  canReadProgram,
  isRdpcMember,
  canReadSomeProgram,
  isDccMember,
} from 'global/utils/egoJwt';
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
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import Typography from 'uikit/Typography';
import usePageContext from 'global/hooks/usePageContext';
import Icon from 'uikit/Icon';
import { EGO_URL } from 'global/config';

const NavBarLoginButton = () => (
  <Button>
    <span
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <Icon
        name="google"
        css={css`
          margin-right: 5px;
        `}
      />
      Login
    </span>
  </Button>
);

const getUserRole = egoJwt => {
  if (!egoJwt) {
    return null;
  } else if (isDccMember(egoJwt)) {
    return 'DCC Member';
  } else if (isRdpcMember(egoJwt)) {
    return 'RDPC User';
  } else if (canReadSomeProgram(egoJwt)) {
    return 'Program Member';
  } else {
    return null;
  }
};

export default () => {
  const { token: egoJwt, logOut, data: userModel } = useAuthContext() || {};

  const canAccessSubmission = !!egoJwt && (canReadSomeProgram(egoJwt) || isRdpcMember(egoJwt));

  const { asPath: path } = usePageContext();

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
      </Section>
      <Section />
      <Section>
        <MenuGroup>
          {egoJwt && canAccessSubmission && (
            <Link
              href={getDefaultRedirectPathForUser(egoJwt, true)}
              as={getDefaultRedirectPathForUser(egoJwt)}
            >
              <a
                css={css`
                  height: 100%;
                `}
              >
                <MenuItem ref={React.createRef()} active={path.search(SUBMISSION_PATH) === 0}>
                  <Typography variant={'default'}>Submission</Typography>
                </MenuItem>
              </a>
            </Link>
          )}
          {!userModel && (
            <a
              id="link-login"
              href={EGO_URL}
              css={css`
                align-self: center;
                margin-right: 16px;
                text-decoration: none;
              `}
            >
              <NavBarLoginButton />
            </a>
          )}
          {userModel && (
            <MenuItem
              ref={React.createRef()}
              dropdownMenu={
                <DropdownMenu>
                  <DropdownMenuItem>Profile & Token</DropdownMenuItem>
                  <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
                </DropdownMenu>
              }
            >
              <UserBadge
                firstName={userModel.context.user.firstName}
                lastName={userModel.context.user.lastName}
                title={getUserRole(egoJwt)}
              />
            </MenuItem>
          )}
        </MenuGroup>
      </Section>
    </AppBar>
  );
};
