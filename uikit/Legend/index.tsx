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

import React, { useState, createRef } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import Button from '../Button';
import { MenuItem } from '../DropdownButton';
import Icon from '../Icon';
import { useTheme } from '../ThemeProvider';

type LegendItemConfig<ValueType = string> = {
  value: ValueType;
  display: React.ReactNode;
  css?: SerializedStyles;
};

export interface LegendProps<ValueType> extends React.ComponentProps<typeof Button> {
  onItemClick: (item: LegendItemConfig<ValueType>) => void;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
  menuItems: Array<LegendItemConfig<ValueType>>;
  menuStyles?: string;
  menuItemStyles?: string;
}

enum LegendOptionValues {
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

const menuItems: LegendProps<LegendOptionValues>['menuItems'] = [
  {
    value: LegendOptionValues.NOT_APPLICABLE,
    display: (
      <div>
        <div className="legend--symbol">N/A</div>
        <div className="legend--text">Not Applicable</div>
      </div>
    ),
  },
  {
    value: LegendOptionValues.NOT_AVAILABLE,
    display: (
      <div>
        <div className="legend--symbol">--</div>
        <div className="legend--text">Not Available</div>
      </div>
    ),
  },
];

const Legend = () => {
  const theme = useTheme();
  const menuStyles = css`
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    left: -50px;
    width: 130px;
    padding: 13px;
    .legend--symbol {
      margin-right: 13px;
      width: 20px;
      color: ${theme.colors.grey};
      font-style: italic;
    }
    .legend--text,
    .legend--symbol {
      display: inline-block;
    }
    :hover {
      cursor: default;
    }
  `;

  const menuItemStyles = css`
    :hover {
      background: ${theme.colors.white};
    }
  `;
  const menuRef = createRef<HTMLDivElement>();
  const [isLegendOpen, setLegendOpen] = useState(false);
  const toggleLegendHandler = () => {
    setLegendOpen(!isLegendOpen);
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      toggleLegendHandler();
    }
  };

  return (
    <Button
      onKeyPress={onKeyPress}
      onMouseEnter={toggleLegendHandler}
      onMouseLeave={() => setLegendOpen(false)}
      variant="secondary"
      css={css`
        position: relative;
        margin-right: 8px;
        border: none;
      `}
    >
      <span>
        <Icon
          name={'legend'}
          fill="accent2_dark"
          height="9px"
          css={css`
            margin-left: 5px;
            margin-right: 0px;
          `}
        />
        Legend
        <Icon
          name={isLegendOpen ? 'chevron_down' : 'chevron_right'}
          fill="accent2_dark"
          height="9px"
          css={css`
            margin-left: 5px;
            margin-right: 0px;
          `}
        />
      </span>
      {isLegendOpen && (
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
};

export default Legend;
