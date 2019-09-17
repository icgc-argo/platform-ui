import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import clsx from 'clsx';

const Ul = styled('ul')`
  ${({ theme }) => css(theme.typography.paragraph)};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.grey_4};
  left: 0;
  bottom: 0;
  margin: 0;
  transform: translateY(100%);
  width: 100%;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
  text-align: left;
  padding: 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
`;

export function DropdownMenu({ children, ...otherProps }) {
  return <Ul {...otherProps}>{children}</Ul>;
}

const Li = styled('li')`
  list-style: none;
  padding: 12px 16px;
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
  }

  &.active {
    color: ${({ theme }) => theme.colors.secondary};
    border-left: 3px solid ${({ theme }) => theme.colors.secondary};
    padding-left: 13px;
    background-color: ${({ theme }) => theme.colors.secondary_4};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
  }

  &:not(:last-child):after {
    content: '';
    width: 100%;
    height: 2px;
    left: 0px;
    bottom: -1px;
    box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.colors.grey_2};
    display: block;
    position: absolute;
  }
`;

export const DropdownMenuItem = React.forwardRef(function DropdownMenuItem(
  { children, active, ...otherProps },
  ref,
) {
  return (
    <Li {...otherProps} className={clsx({ active })} ref={ref}>
      {children}
    </Li>
  );
});
