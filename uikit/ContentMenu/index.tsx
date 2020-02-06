import React, { useState } from 'react';
import Typography from 'uikit/Typography';
import styled from '@emotion/styled';
import useTheme from '../utils/useTheme';
import { css } from '@emotion/core';
import kebabCase from 'lodash/kebabCase';

const Cont = styled('div')`
  margin-top: 14px;
  border-left: 2px solid ${({ color, theme }) => (color ? color : theme.colors.secondary)};
`;

const Anchor = styled('a')`
  &.active > div {
    background-color: ${({ theme }) => theme.colors.secondary_4};
  }
`;

const MenuItem = ({ name, onClick, active, disabled, className }) => {
  const theme = useTheme();
  return (
    <Anchor className={className} onClick={onClick} id={`${kebabCase(name)}`}>
      <div
        css={css`
          padding: 8px 0 8px 16px;
          background-color: ${active && theme.colors.secondary_4};

          &:hover {
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
          }
        `}
        onClick={onClick}
      >
        <Typography
          variant="data"
          color={active ? 'secondary_dark' : disabled ? 'grey_1' : 'primary'}
        >
          {name}
        </Typography>
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
  const [activeIndex, setActiveIndex] = useState(0);
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
            active={activeIndex === index}
            disabled={disabled}
            onClick={() => {
              if (!disabled && contentRef && contentRef.current) {
                setActiveIndex(index);
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
export { default as useMenuHighlight } from './hooks';
