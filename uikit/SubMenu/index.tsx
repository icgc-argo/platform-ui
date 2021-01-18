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

import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import Icon from '../Icon';
import Input from '../form/Input';
import useTheme from '../utils/useTheme';
import { MenuItemContainer, IconContainer, ContentContainer } from './styledComponents';

const MenuItemComponent = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    /**
     * provide this if you want to control the state, leave undefined otherwise
     */
    selected?: boolean;
    /**
     * indicates what nesting level to render as. undefined will respect DOM structure
     */
    level?: 1 | 2 | 3 | undefined;
    /**
     * content that appears in label, can provide primitives and/or React elements
     */
    content?: any;
    /**
     * nodes that will appear when opened
     */
    children?: any;
    noChevron?: boolean;
    icon?: React.ReactElement<React.ComponentProps<typeof Icon>>;
    contentAs?: keyof JSX.IntrinsicElements;
    chevronOnLeftSide?: boolean;
    isFacetVariant?: boolean;
    searchBar?: boolean;
    searchStateParams?: {
      query: string;
      querySetter: React.Dispatch<React.SetStateAction<string>>;
    };
    RightSideComp?: React.ReactNode;
  } & React.ComponentProps<typeof MenuItemContainer>
>(
  (
    {
      className = '',
      selected: controlledSelectedState,
      level,
      children,
      content,
      onClick = (e) => {},
      icon,
      noChevron = false,
      contentAs = 'button',
      chevronOnLeftSide = false,
      isFacetVariant = false,
      searchBar = false,
      searchStateParams,
      RightSideComp = null,
      ...otherProps
    },
    ref,
  ) => {
    const theme = useTheme();
    const [localSelectedState, setLocalSelectedState] = React.useState(controlledSelectedState);
    const isSelected =
      typeof controlledSelectedState === 'undefined' ? localSelectedState : controlledSelectedState;
    const [searchbarState, setSearchbarState] = React.useState(false);

    const contentContainerRef = React.createRef<HTMLButtonElement>();
    const chevronIcon =
      children && !noChevron ? (
        <Icon
          css={css`
            margin-right: ${chevronOnLeftSide ? '7px' : '0px'};
          `}
          name={isSelected ? 'chevron_down' : 'chevron_right'}
          fill={isSelected && !isFacetVariant ? 'secondary' : 'primary'}
        />
      ) : (
        <></>
      );
    return (
      <MenuItemContainer
        ref={ref}
        level={level}
        selected={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          if (contentContainerRef.current) contentContainerRef.current.blur();
          setLocalSelectedState(!isSelected);
          onClick(e);
        }}
        className={`${className} MenuItemContainer`}
        {...otherProps}
      >
        {content && (
          <div className={`${className} MenuItemContent`}>
            {chevronOnLeftSide && chevronIcon}
            <ContentContainer ref={contentContainerRef} as={contentAs}>
              {icon && (
                <IconContainer>
                  {React.cloneElement(icon, {
                    fill: isSelected ? 'secondary_dark' : 'primary',
                  })}
                </IconContainer>
              )}
              {content}
              {RightSideComp && !searchBar && (
                <div
                  css={css`
                    margin-left: auto;
                  `}
                >
                  {RightSideComp}
                </div>
              )}
            </ContentContainer>
            {!chevronOnLeftSide && chevronIcon}
            {isSelected && searchBar && (
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchbarState(!searchbarState);
                  }}
                  name={'search'}
                  fill={searchbarState ? 'secondary' : 'primary_3'}
                  height="16px"
                  width="16px"
                  css={css`
                    padding-left: 10px;
                  `}
                />
              </div>
            )}
          </div>
        )}
        {isSelected && searchbarState && (
          <MenuItem
            className="FacetContent"
            level={1}
            selected
            contentAs="div"
            content={
              <Input
                size="sm"
                aria-label="search-for-facets"
                css={css`
                  ${css(theme.typography.data as any)}
                  flex: 1;
                `}
                preset="search"
                value={searchStateParams.query}
                onChange={(e) => {
                  searchStateParams.querySetter(e.target.value);
                }}
                showClear={true}
              />
            }
          />
        )}
        {isSelected && children}
      </MenuItemContainer>
    );
  },
);

const SubMenuComponent = styled('div')`
  background: ${({ theme }) => theme.colors.white};
  & > ${MenuItemContainer} {
    border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
  }
`;

export const MenuItem = MenuItemComponent;

export const SubMenu: typeof SubMenuComponent & {
  Item: typeof MenuItem;
} = (() => {
  const output: any = SubMenuComponent;
  output.Item = MenuItem;
  return output;
})();

export default SubMenu;
