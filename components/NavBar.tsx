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

import {
  SUBMISSION_PATH,
  USER_PAGE_PATH,
  FILE_REPOSITORY_PATH,
  LOGIN_PAGE_PATH,
} from 'global/constants/pages';
import useAuthContext from 'global/hooks/useAuthContext';
import usePageContext from 'global/hooks/usePageContext';
import { canReadSomeProgram, isDccMember, isRdpcMember } from 'global/utils/egoJwt';
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import Link from 'next/link';
import * as React from 'react';
import { css } from 'uikit';
import AppBar, {
  DropdownMenu,
  Logo,
  MenuGroup,
  MenuItem,
  Section,
  UserBadge,
  NavElement,
  NavBarElement,
} from 'uikit/AppBar';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import { getConfig } from 'global/config';
import { createRedirectURL, reactGridBreakpoints } from 'global/utils/common';
import { get } from 'lodash';
import queryString from 'query-string';
import urlJoin from 'url-join';
import { ModalPortal } from './ApplicationRoot';
import ProgramServicesModal from './pages/Homepage/ProgramServicesModal';
import useClickAway from 'uikit/utils/useClickAway';

const NavBarLoginButton = () => {
  return (
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
};

const getUserRole = (egoJwt, permissions) => {
  if (!egoJwt) {
    return null;
  } else if (isDccMember(permissions)) {
    return 'DCC Member';
  } else if (isRdpcMember(permissions)) {
    return 'RDPC User';
  } else if (canReadSomeProgram(permissions)) {
    return 'Program Member';
  } else {
    return null;
  }
};

export default function Navbar({ hideLinks = false, disableLogoLink = false }) {
  const { EGO_URL, FEATURE_REPOSITORY_ENABLED } = getConfig();
  const { token: egoJwt, logOut, data: userModel, permissions } = useAuthContext();
  const canAccessSubmission = React.useMemo(() => {
    return !!egoJwt && (canReadSomeProgram(permissions) || isRdpcMember(permissions));
  }, [egoJwt]);

  const { asPath: path, query } = usePageContext();

  const [loginPath, setLoginPath] = React.useState('');
  const [isModalVisible, setModalVisibility] = React.useState(false);

  const [isMobileLayout, setMobileLayout] = React.useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const redirect = get(query, 'redirect') as string;
    if (redirect) {
      const parsedRedirect = queryString.parseUrl(redirect);
      const existingQuery = queryString.stringify(parsedRedirect.query);

      const queryRedirect = createRedirectURL({
        origin: location.origin,
        path: parsedRedirect.url,
        query: existingQuery,
      });
      setLoginPath(urlJoin(EGO_URL, queryRedirect));
    } else if (path === '/' || path === LOGIN_PAGE_PATH) {
      setLoginPath(EGO_URL);
    } else {
      const queryString = path.split('?')[1] || '';
      const pathRoot = path.split('?')[0];

      const redirect = createRedirectURL({
        origin: location.origin,
        path: pathRoot,
        query: queryString,
      });
      setLoginPath(urlJoin(EGO_URL, redirect));
    }
  }, [path, query]);

  React.useEffect(() => {
    // required for inital page load, window object accessible in useffect only
    setMobileLayout(window.innerWidth <= reactGridBreakpoints.md);
    window.addEventListener('resize', () => {
      setMobileLayout(window.innerWidth <= reactGridBreakpoints.md);
    });
  }, []);

  const onProfilePage = path.search(USER_PAGE_PATH) === 0;

  const mainNavDetails: Array<NavElement> = [
    {
      name: 'File Repository',
      href: FILE_REPOSITORY_PATH,
      as: FILE_REPOSITORY_PATH,
      shouldRender: FEATURE_REPOSITORY_ENABLED,
      active: path.search(FILE_REPOSITORY_PATH) === 0,
    },
    {
      isLink: userModel && egoJwt && canAccessSubmission,
      name: 'Program Services',
      href: getDefaultRedirectPathForUser(permissions, true),
      as: getDefaultRedirectPathForUser(permissions),
      active: path.search(SUBMISSION_PATH) === 0 || isModalVisible,
      onClick: () => setModalVisibility(!isModalVisible),
    },
  ];

  const profileNavDetails: Array<NavElement> = [
    {
      href: USER_PAGE_PATH,
      active: onProfilePage,
      name: 'Profile & Token',
    },
    {
      isLink: false,
      onClick: () => {
        logOut();
        setMobileDropdownOpen(false);
      },
      name: 'Logout',
      active: false,
      href: '',
    },
  ];

  const NUM_ELEMENTS_IN_FIRST_SECTION = 1;
  const [usingProfileOptions, setUsingProfileOptions] = React.useState(true);

  const loginButton = (
    <a
      id="link-login"
      href={loginPath}
      css={css`
        align-self: center;
        text-decoration: none;
        padding: 0 16px;
      `}
    >
      <NavBarLoginButton />
    </a>
  );

  const mobileDropdownRef = React.createRef() as React.RefObject<HTMLDivElement>;
  useClickAway({
    domElementRef: mobileDropdownRef,
    onClickAway: () => setMobileDropdownOpen(false),
    onElementClick: () => setMobileDropdownOpen(!isMobileDropdownOpen),
  });

  const MobileDropdown = () => {
    const mobileDropDownOptions = usingProfileOptions ? profileNavDetails : mainNavDetails;
    return (
      <div
        css={css`
          max-width: 100%;
        `}
        ref={mobileDropdownRef}
      >
        <DropdownMenu>
          {mobileDropDownOptions.map((element, idx) => (
            <NavBarElement
              isDropdown={true}
              key={`hamburgerElement_${idx}`}
              {...element}
            ></NavBarElement>
          ))}
        </DropdownMenu>
      </div>
    );
  };
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
          DomComponent={(props) =>
            disableLogoLink ? (
              <div {...props} />
            ) : (
              <Link prefetch href={`/`}>
                <a {...props} id="home-login" />
              </Link>
            )
          }
        />

        {isMobileDropdownOpen && <MobileDropdown />}

        {!hideLinks && !isMobileLayout && (
          <MenuGroup>
            {mainNavDetails.slice(0, NUM_ELEMENTS_IN_FIRST_SECTION).map((element, idx) => (
              <NavBarElement key={`navbarElement_1${idx}`} {...element} />
            ))}
          </MenuGroup>
        )}
      </Section>

      {!hideLinks && (
        <Section>
          <MenuGroup>
            {!isMobileLayout &&
              mainNavDetails
                .slice(NUM_ELEMENTS_IN_FIRST_SECTION, mainNavDetails.length)
                .map((element, idx) => (
                  <NavBarElement key={`navbarElement_2${idx}`} {...element} />
                ))}

            {!userModel && loginButton}

            {userModel && (
              <div
                onClick={() => {
                  if (isMobileLayout) {
                    setUsingProfileOptions(true);
                    setMobileDropdownOpen(!isMobileDropdownOpen);
                  }
                }}
              >
                <MenuItem
                  active={onProfilePage}
                  ref={React.createRef()}
                  dropdownMenu={
                    !isMobileLayout ? (
                      <DropdownMenu>
                        {profileNavDetails.map((element, idx) => (
                          <NavBarElement
                            key={`profileNavDetail_${idx}`}
                            {...element}
                            isDropdown={true}
                          ></NavBarElement>
                        ))}
                      </DropdownMenu>
                    ) : (
                      <></>
                    )
                  }
                >
                  {usingProfileOptions && isMobileDropdownOpen ? (
                    <Icon name={'hamburger_close'} fill="accent1_dimmed"></Icon>
                  ) : (
                    <UserBadge
                      showGreeting={!isMobileLayout}
                      firstName={userModel.context.user.firstName}
                      lastName={userModel.context.user.lastName}
                      title={getUserRole(egoJwt, permissions)}
                    />
                  )}
                </MenuItem>
              </div>
            )}
            {isMobileLayout && (
              <div
                onClick={() => {
                  setUsingProfileOptions(false);
                  setMobileDropdownOpen(!isMobileDropdownOpen);
                }}
              >
                <MenuItem>
                  <Icon
                    name={
                      isMobileDropdownOpen && !usingProfileOptions ? 'hamburger_close' : 'hamburger'
                    }
                    fill={
                      isMobileDropdownOpen && !usingProfileOptions ? 'accent1_dimmed' : 'accent1_1'
                    }
                  ></Icon>
                </MenuItem>
              </div>
            )}
          </MenuGroup>
        </Section>
      )}
      {isModalVisible && (
        <ModalPortal>
          <ProgramServicesModal
            dismissModal={() => setModalVisibility(false)}
            hasPrograms={canAccessSubmission}
            isLoggedIn={!!egoJwt}
          />
        </ModalPortal>
      )}
    </AppBar>
  );
}
