/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
  AppBar,
  AppBarMenuItem,
  Button,
  css,
  DropdownMenu,
  FocusWrapper,
  Icon,
  MenuGroup,
  NavBarElement,
  NavElement,
  Section,
  useClickAway,
  UserBadge,
} from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import {
  FILE_REPOSITORY_PATH,
  LOGIN_PAGE_PATH,
  SUBMISSION_PATH,
  USER_PAGE_PATH,
} from 'global/constants/pages';
import useAuthContext from 'global/hooks/useAuthContext';
import usePageContext from 'global/hooks/usePageContext';
import { createRedirectURL } from 'global/utils/common';
import { canReadSomeProgram, isDccMember, isRdpcMember } from 'global/utils/egoJwt';
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import ArgoLogo from 'images/argo-logo.svg';
import { get } from 'lodash';
import Image from 'next/image';
import NextLink from 'next/link';
import queryString from 'query-string';
import { useState, useEffect, useMemo, createRef, RefObject } from 'react';

import { useScreenClass } from 'react-grid-system';
import urlJoin from 'url-join';
import ModalPortal from './Modal';
import useFiltersContext from './pages/file-repository/hooks/useFiltersContext';
import ProgramServicesModal from './pages/Homepage/ProgramServicesModal';

const NavBarLoginButton = () => {
  const { asPath: path, query } = usePageContext();
  const { EGO_URL } = getConfig();
  const [loginPath, setLoginPath] = useState('');

  useEffect(() => {
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

  return (
    <a
      id="link-login"
      href={loginPath}
      css={css`
        align-self: center;
        text-decoration: none;
        padding: 0 16px;
      `}
    >
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
    </a>
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
  const screenClass = useScreenClass();
  const { egoJwt, logOut, data: userModel, permissions } = useAuthContext();
  const canAccessSubmission = useMemo(() => {
    return !!egoJwt && (canReadSomeProgram(permissions) || isRdpcMember(permissions));
  }, [egoJwt]);

  const { asPath: path, query } = usePageContext();
  const { clearFilters } = useFiltersContext();

  const [isModalVisible, setModalVisibility] = useState(false);

  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const isMobileLayout = ['xs', 'sm', 'md'].includes(screenClass);

  useEffect(() => {
    if (isMobileDropdownOpen && !isMobileLayout) setMobileDropdownOpen(false);
  }, [isMobileLayout, isMobileDropdownOpen]);

  const onProfilePage = path.search(USER_PAGE_PATH) === 0;

  const mainNavDetails: Array<NavElement> = [
    {
      name: 'File Repository',
      href: FILE_REPOSITORY_PATH,
      as: FILE_REPOSITORY_PATH,
      active: path.search(FILE_REPOSITORY_PATH) === 0,
      LinkComp: NextLink,
    },
    {
      isLink: userModel && egoJwt && canAccessSubmission,
      name: 'Program Services',
      href: getDefaultRedirectPathForUser(permissions, true),
      as: getDefaultRedirectPathForUser(permissions),
      active: path.search(SUBMISSION_PATH) === 0 || isModalVisible,
      onClick: () => setModalVisibility(!isModalVisible),
      LinkComp: NextLink,
    },
  ];

  const profileNavDetails: Array<NavElement> = [
    {
      href: USER_PAGE_PATH,
      active: onProfilePage,
      name: 'Profile & Token',
      LinkComp: NextLink,
    },
    {
      isLink: false,
      onClick: () => {
        clearFilters();
        logOut(path);
        setMobileDropdownOpen(false);
      },
      name: 'Logout',
      active: false,
      href: '',
      LinkComp: NextLink,
    },
  ];

  const NUM_ELEMENTS_IN_FIRST_SECTION = 1;
  const [usingProfileOptions, setUsingProfileOptions] = useState(true);

  const mobileDropdownRef = createRef() as RefObject<HTMLDivElement>;
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
        <NextLink href={disableLogoLink ? '#' : '/'} id="home-login">
          <div
            css={css`
              padding: 0 18px;
              &:hover {
                cursor: ${disableLogoLink ? 'normal' : 'pointer'};
              }
            `}
          >
            <Image alt="ICGC ARGO" layout="fixed" src={ArgoLogo} width="208" height="60" />
          </div>
        </NextLink>

        {isMobileDropdownOpen && <MobileDropdown />}

        {!hideLinks && !isMobileLayout && (
          <MenuGroup>
            {mainNavDetails.slice(0, NUM_ELEMENTS_IN_FIRST_SECTION).map((element, idx) => (
              <NavBarElement key={`navbarElement_1${idx}`} {...element} LinkComp={NextLink} />
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
                  <NavBarElement key={`navbarElement_2${idx}`} {...element} LinkComp={NextLink} />
                ))}

            {!userModel && <NavBarLoginButton />}

            {userModel && (
              <FocusWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMobileLayout) {
                    setUsingProfileOptions(true);
                    setMobileDropdownOpen(!isMobileDropdownOpen);
                  }
                }}
              >
                <AppBarMenuItem
                  active={onProfilePage}
                  ref={createRef()}
                  dropdownMenu={
                    !isMobileLayout ? (
                      <DropdownMenu>
                        {profileNavDetails.map((element, idx) => (
                          <NavBarElement
                            key={`profileNavDetail_${idx}`}
                            {...element}
                            isDropdown={true}
                            LinkComp={NextLink}
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
                </AppBarMenuItem>
              </FocusWrapper>
            )}
            {isMobileLayout && (
              <FocusWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  setUsingProfileOptions(false);
                  setMobileDropdownOpen(!isMobileDropdownOpen);
                }}
              >
                <AppBarMenuItem>
                  <Icon
                    name={
                      isMobileDropdownOpen && !usingProfileOptions ? 'hamburger_close' : 'hamburger'
                    }
                    fill={
                      isMobileDropdownOpen && !usingProfileOptions ? 'accent1_dimmed' : 'accent1_1'
                    }
                  ></Icon>
                </AppBarMenuItem>
              </FocusWrapper>
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
