import React from 'react';
import Typography from 'uikit/Typography';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Cont = styled('div')`
  margin-top: 14px;
  border-left: 2px solid ${({ color, theme }) => (color ? color : theme.colors.secondary)};
`;

const Anchor = styled<'a', { disabled: boolean; active: boolean }>('a')`
  color: ${({ disabled, active, theme: { colors } }) =>
    disabled ? colors.grey_1 : active ? colors.secondary_dark : colors.primary};

  > div {
    background-color: ${({ active, theme: { colors } }) => (active ? colors.secondary_4 : '#fff')};
  }
`;

const MenuItem = ({ name, onClick, disabled, active }) => {
  return (
    <Anchor onClick={onClick} active={active} disabled={disabled}>
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
}: {
  title: string;
  contents: Array<{
    name: string;
    contentRef?: React.RefObject<HTMLElement>;
    disabled?: boolean;
    active?: boolean;
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
        {contents.map(({ name, contentRef, disabled, active }, index) => (
          <MenuItem
            active={active}
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
