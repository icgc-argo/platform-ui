import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Icon from '../Icon';
import useTheme from '../utils/useTheme';

const Nav = styled('nav')`
  padding: 18px 29px;
  font-family: ${({ theme }) => theme.typography.title.fontFamily};

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
  font-size: 30px;
`;

const Sep = styled('li')`
  list-style: none;
  display: flex;
  userselect: none;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 30px;
`;

const interleave = ([x, ...xs], y) => {
  return xs.length === 0 ? [x] : [x, y, ...interleave(xs, y)];
};

const TitleBar = ({ children, className, id }) => {
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

TitleBar.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * DOM pass through
   */
  className: PropTypes.string,
  /**
   * DOM pass through
   */
  id: PropTypes.string,
};

export default TitleBar;
