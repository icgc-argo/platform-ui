import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

import Icon from '../Icon';
import useTheme from '../utils/useTheme';
import { MenuItemContainer, IconContainer, ContentContainer } from './styledComponents';

export const MenuItem = ({
  className = '',
  selected: controlledSelectedState,
  level,
  children,
  content,
  onClick = e => {},
  icon,
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
        <ContentContainer>
          {icon && (
            <IconContainer>
              {React.cloneElement(icon, {
                fill: isSelected ? 'secondary_dark' : 'primary',
              })}
            </IconContainer>
          )}
          {content}
        </ContentContainer>
        {children && content && (
          <Icon
            name={isSelected ? 'chevron_down' : 'chevron_right'}
            fill={isSelected ? 'secondary' : 'primary'}
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
export const SubMenu = styled('div')`
  background: ${({ theme }) => theme.colors.white};
  & > ${MenuItemContainer} {
    border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
  }
`;

SubMenu.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

SubMenu.Item = MenuItem;

export default SubMenu;
