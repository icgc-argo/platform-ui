import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import Icon from '../Icon';
import useTheme from '../utils/useTheme';

const Nav = styled('nav')`
  padding: 18px 29px 18px 0;
  ${({ theme }) => css(theme.typography.title)};
  & a {
    color: ${({ theme }) => theme.titleBar.linkColor};
    text-decoration: none;
  }
`;

const Ol = styled('ol')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const Li = styled('li')`
  list-style: none;
  ${({ theme }) => css(theme.typography.title)};
`;

const Sep = styled('li')`
  list-style: none;
  display: flex;
  user-select: none;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 30px;
`;

const interleave = (arr = [], y) => {
  const [x, ...xs] = arr;
  return xs.length === 0 ? [x] : [x, y, ...interleave(xs, y)];
};

const TitleBar: React.ComponentType<{
  className?: string;
  id?: string;
  children: React.ReactNode | React.ReactNodeArray;
}> = ({ children, className, id }) => {
  const theme = useTheme();

  const allItems = interleave(
    React.Children.toArray(children).filter(child => React.isValidElement(child)),
    <Sep>
      <Icon width="12px" height="12px" name="chevron_right" fill={theme.titleBar.separatorColor} />
    </Sep>,
  ).map((child, index) =>
    child.type === Sep ? (
      <React.Fragment key={`child-${index}`}>{child}</React.Fragment>
    ) : (
      <Li key={`child-${index}`}>{child}</Li>
    ),
  );

  return (
    <Nav className={className} id={id}>
      <Ol>{allItems}</Ol>
    </Nav>
  );
};

export default TitleBar;
