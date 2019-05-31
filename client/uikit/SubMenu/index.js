import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

import Icon from '../Icon';
import useTheme from '../utils/useTheme';

const level1Style = ({ selected, theme }) => css`
  ${css(theme.typography.navigation)}
  background: ${theme.colors.white};
  color: ${selected ? theme.colors.secondary_dark : 'black'};
  animation: all 1s;
  & > .MenuItemContent:first-of-type {
    padding: 12px;
  }
`;

const level2Style = ({ selected, theme }) => css`
  ${css(theme.typography.navigation)}
  border: none;
  border-left: solid 2px;
  font-weight: normal;
  border-left-color: ${selected ? theme.colors.secondary : theme.colors.white};
  background: ${selected ? theme.colors.grey_3 : 'none'};
  & > .MenuItemContent:first-of-type {
    padding-left: 40px;
    padding-right: 18px;
  }
`;

const level3Style = ({ selected, theme }) => css`
  ${css(theme.typography.navigation)}
  border: none;
  font-weight: normal;
  background: ${selected ? theme.colors.secondary_4 : 'none'};
  & > .MenuItemContent:first-of-type {
    padding-left: 52px;
  }
`;

const defaultStyle = props => css`
  ${level1Style(props)}
  .MenuItemContainer > & {
    ${level2Style(props)}
    .MenuItemContainer > & {
      ${level3Style(props)}
    }
  }
  & > .MenuItemContent:first-of-type {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const MenuItemContainer = styled('div')`
  ${({ level, ...rest }) =>
    level === 1
      ? level1Style(rest)
      : level === 2
      ? level2Style(rest)
      : level === 3
      ? level3Style(rest)
      : defaultStyle(rest)}
`;

export const MenuItem = ({
  className = '',
  selected: controlledSelectedState,
  level,
  children,
  content,
  onClick = e => {},
}) => {
  const [localSelectedState, setLocalSelectedState] = React.useState(controlledSelectedState);
  const isSelected =
    typeof controlledSelectedState === 'undefined' ? localSelectedState : controlledSelectedState;
  const theme = useTheme();
  return (
    <MenuItemContainer
      level={level}
      selected={isSelected}
      onClick={e => {
        e.stopPropagation();
        setLocalSelectedState(!isSelected);
        onClick(e);
      }}
      className={`${className} MenuItemContainer`}
    >
      <div className="MenuItemContent">
        <span>{content}</span>
        {children && content && (
          <Icon
            name={isSelected ? 'chevron_down' : 'chevron_right'}
            fill={isSelected ? theme.colors.secondary : theme.colors.black}
          />
        )}
      </div>
      {isSelected && children}
    </MenuItemContainer>
  );
};
MenuItem.propTypes = {
  className: PropTypes.string,
  /**
   * provide this if you want to control the state, leave undefined otherwise
   */
  selected: PropTypes.bool,
  /**
   * indicates what nesting level to render as. undefined will respect DOM structure
   */
  level: PropTypes.oneOf([1, 2, 3, undefined]),
  /**
   * content that appears in label, can provide primitives and/or React elements
   */
  content: PropTypes.any,
  /**
   * nodes that will appear when opened
   */
  children: PropTypes.any,
  onClick: PropTypes.func,
};

/*
 * Please edit me!
 */
const SubMenu = styled('div')`
  background: ${({ theme }) => theme.colors.white};
  & > ${MenuItemContainer} {
    border-top: solid 1px ${({ theme }) => theme.colors.grey_2};

    &:last-child {
      border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
    }
  }
`;

SubMenu.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

SubMenu.Item = MenuItem;

export default SubMenu;
