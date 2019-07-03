import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '..';

const StyledLink = styled('span')`
  ${({ theme }) => css(theme.typography.default)}
  * {
    color: ${({ theme }) => theme.colors.accent2_dark};
    text-decoration: underline;
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.accent2_1};
    }
    :active {
      color: ${({ theme }) => theme.colors.accent2};
    }
  }
`;

const BuiltInDomLink = ({ ...props }) => <a {...props} />;

const Link = ({ href, Component = BuiltInDomLink, ...rest }) => (
  <StyledLink>
    <Component href={href} {...rest} />
  </StyledLink>
);

Link.propTypes = {
  /**
   * Some frameworks like Next.JS have their own Link component, we want to support that
   */
  Component: PropTypes.func,
  href: PropTypes.string,
};

export default Link;
