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

import * as React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import useClickAway from 'uikit/utils/useClickAway';
import { useTheme } from 'uikit/ThemeProvider';

const MenuItem: typeof Typography = (props) => {
  const theme = useTheme();
  return (
    <Typography
      variant="default"
      as="div"
      {...props}
      css={css`
        padding: 5px;
        &:hover {
          background: ${theme.colors.secondary_4};
        }
      `}
    />
  );
};

type DropdownButtonItemConfig<ValueType = string> = {
  value: ValueType;
  display: React.ReactNode;
  css?: SerializedStyles;
};

export interface DownloadButtonProps<ValueType>
  extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  onItemClick: (item: DropdownButtonItemConfig<ValueType>) => void;
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement, Event>, { toggleMenuOpen: boolean }) => any;
  onKeyPress?: (
    e: React.SyntheticEvent<HTMLButtonElement, Event>,
    { toggleMenuOpen: boolean },
  ) => any;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
  menuItems: Array<DropdownButtonItemConfig<ValueType>>;
  controlledMenuShowState?: boolean;
  menuStyles?: string;
  menuItemStyles?: string;
}

function DropdownButton<ValueType = string>({
  children,
  onItemClick,
  menuItems,
  controlledMenuShowState,
  onClick,
  onKeyPress,
  menuStyles,
  menuItemStyles,
  ...rest
}: DownloadButtonProps<ValueType>) {
  const [menuOpen, setMenuOpen] = React.useState(
    typeof controlledMenuShowState == 'boolean' ? controlledMenuShowState : false,
  );

  React.useEffect(() => {
    if (controlledMenuShowState !== menuOpen) {
      setMenuOpen(controlledMenuShowState);
    }
  }, [controlledMenuShowState && typeof controlledMenuShowState == 'boolean']);

  const theme = useTheme();
  const menuRef = React.createRef<HTMLDivElement>();
  useClickAway({
    domElementRef: menuRef,
    onClickAway: () => setMenuOpen(false),
    onElementClick: () => {
      setMenuOpen(false);
    },
  });

  return (
    <Button
      onClick={(e) => {
        if (onClick) {
          onClick(e, { toggleMenuOpen: !menuOpen });
        }
        setMenuOpen(!menuOpen);
      }}
      css={css`
        position: relative;
      `}
      {...rest}
    >
      {children}
      {menuOpen && ( // explicit check because undefined is falsy
        <div
          ref={menuRef}
          css={css`
            position: absolute;
            top: 100%;
            left: 10px;
            right: 10px;
            background: white;
            z-index: 1000;
            border-radius: 4px;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
            border: solid 1px ${theme.colors.grey_1};
            background-color: ${theme.colors.white};
            text-transform: none;
            text-align: left;
            color: ${theme.colors.black};
            ${menuStyles}
          `}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={String(item.value)}
              onClick={() => (rest.isLoading ? null : onItemClick(item))}
              css={css`
                ${menuItemStyles}
              `}
              {...item}
            >
              {item.display}
            </MenuItem>
          ))}
        </div>
      )}
    </Button>
  );
}

export default DropdownButton;
