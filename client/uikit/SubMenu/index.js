import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

const level2Style = ({ selected, theme }) => css`
  border: none;
  border-left: solid 2px;
  border-left-color: ${selected ? theme.colors.secondary : theme.colors.white};
  background: ${selected ? theme.colors.grey_3 : 'none'};
`;

const level3Style = ({ selected, theme }) => css`
  border: none;
  font-weight: normal;
  background: ${selected ? theme.colors.secondary_4 : 'none'};
`;

const MenuItemContainer = styled('div')`
  ${({ theme }) => css(theme.typography.navigation)}
  border-top: solid 1px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ selected, theme }) => (selected ? theme.colors.secondary : 'black')};
  border-top-color: ${({ theme }) => theme.colors.grey_2};
  &:last-child {
    border-bottom: solid 1px;
    border-bottom-color: ${({ theme }) => theme.colors.grey_2};
  }
  & > div:first-child {
    padding: 15px;
    cursor: pointer;
  }
  .MenuItemContainer > & {
    & > div:first-child {
      padding-left: 40px;
    }
    ${({ selected, theme }) => level2Style({ selected, theme })}
    .MenuItemContainer > & {
      & > div:first-child {
        padding-left: 52px;
      }
      ${({ selected, theme }) => level3Style({ selected, theme })}
    }
  }
`;

export const MenuItem = ({ className = '', selected: expanded = false, children, content }) => {
  const [selected, setselected] = React.useState(expanded);
  return (
    <MenuItemContainer
      selected={selected}
      onClick={e => {
        e.stopPropagation();
        setselected(!selected);
      }}
      className={`${className} MenuItemContainer`}
    >
      <div>{content}</div>
      {selected && children}
    </MenuItemContainer>
  );
};

/*
 * Please edit me!
 */
const SubMenu = styled('div')`
  background: ${({ theme }) => theme.colors.white};
`;

SubMenu.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default SubMenu;
