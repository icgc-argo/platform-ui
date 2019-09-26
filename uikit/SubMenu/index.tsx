import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

import Icon from '../Icon';
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
  } & React.ComponentProps<typeof MenuItemContainer>
>(
  (
    {
      className = '',
      selected: controlledSelectedState,
      level,
      children,
      content,
      onClick = e => {},
      icon,
      noChevron = false,
      ...otherProps
    },
    ref,
  ) => {
    const [localSelectedState, setLocalSelectedState] = React.useState(controlledSelectedState);
    const isSelected =
      typeof controlledSelectedState === 'undefined' ? localSelectedState : controlledSelectedState;
    const theme = useTheme();
    const contentContainerRef = React.createRef<HTMLButtonElement>();
    return (
      <MenuItemContainer
        ref={ref}
        level={level}
        selected={isSelected}
        onClick={e => {
          e.stopPropagation();
          if (contentContainerRef.current) contentContainerRef.current.blur();
          setLocalSelectedState(!isSelected);
          onClick(e);
        }}
        className={`${className} MenuItemContainer`}
        {...otherProps}
      >
        {content && (
          <div className="MenuItemContent">
            <ContentContainer ref={contentContainerRef}>
              {icon && (
                <IconContainer>
                  {React.cloneElement(icon, {
                    fill: isSelected ? 'secondary_dark' : 'primary',
                  })}
                </IconContainer>
              )}
              {content}
            </ContentContainer>
            {children && !noChevron && (
              <Icon
                name={isSelected ? 'chevron_down' : 'chevron_right'}
                fill={isSelected ? 'secondary' : 'primary'}
              />
            )}
          </div>
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
