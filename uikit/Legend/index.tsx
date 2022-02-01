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
