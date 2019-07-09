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
  display: none;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.08);

  &.open {
    display: block;
  }
`;

export function DropdownMenu({ children, open, ...otherProps }) {
  return (
    <Ul {...otherProps} className={clsx({ open })}>
      {children}
    </Ul>
  );
}

const Li = styled('li')`
  list-style: none;
  padding: 12px 16px;
  position: relative;

  &.active {
    color: ${({ theme }) => theme.colors.secondary};
    border-left: 3px solid ${({ theme }) => theme.colors.secondary};
    padding-left: 13px;
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

export function DropdownMenuItem({ children, active, ...otherProps }) {
  return (
    <Li {...otherProps} className={clsx({ active })}>
      {children}
    </Li>
  );
}
