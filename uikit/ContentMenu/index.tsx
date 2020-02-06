import React from 'react';
import Typography from 'uikit/Typography';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import kebabCase from 'lodash/kebabCase';

const Cont = styled('div')`
  margin-top: 14px;
  border-left: 2px solid ${({ color, theme }) => (color ? color : theme.colors.secondary)};
`;

const Anchor = styled<'a', { disabled: boolean }>('a')`
  .menu-item {
    color: ${({ disabled, theme }) => (disabled ? theme.colors.grey_1 : theme.colors.primary)};
  }
  &.active {
    > div {
      background-color: ${({ theme }) => theme.colors.secondary_4};
    }

    .menu-item {
      color: ${({ theme }) => theme.colors.secondary_dark};
    }
  }
`;

const MenuItem = ({ name, onClick, disabled, className }) => {
  return (
    <Anchor className={className} onClick={onClick} id={`${kebabCase(name)}`} disabled={disabled}>
      <div
        css={css`
          padding: 8px 0 8px 16px;

          &:hover {
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
          }
        `}
        onClick={onClick}
      >
        <Typography variant="data">{name}</Typography>
      </div>
    </Anchor>
  );
};

const Menu = ({
  title,
  contents,
  color,
  scrollYOffset = 0,
  anchorClassName,
}: {
  title: string;
  contents: Array<{
    name: string;
    contentRef?: React.RefObject<HTMLElement>;
    disabled?: Boolean;
  }>;
  color?: string;
  // use case: fixed header on page, need extra offset to scroll to top of content
  scrollYOffset?: number;
  anchorClassName?: string;
}) => {
  return (
    <div>
      <Typography variant="sectionHeader" color="primary">
        {title}
      </Typography>
      <Cont color={color}>
        {contents.map(({ name, contentRef, disabled }, index) => (
          <MenuItem
            className={anchorClassName}
            key={index}
            name={name}
            disabled={disabled}
            onClick={() => {
              if (!disabled && contentRef && contentRef.current) {
                window.scrollTo(0, contentRef.current.offsetTop - scrollYOffset);
              }
            }}
          />
        ))}
      </Cont>
    </div>
  );
};

export default Menu;
export { useMenuHighlight } from './hooks';
