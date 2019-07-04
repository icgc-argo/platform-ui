import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '..';

const StyledLink = styled('span')`
  * {
    ${({ theme }) => css(theme.typography.default)}
    cursor: pointer;
    color: ${({ theme }) => theme.colors.accent2_dark};
    text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
    font-weight: ${({ bold }) => (bold ? 'bold' : 'inherit')};
    ${({ uppercase }) =>
      uppercase &&
      css`
        text-transform: uppercase;
      `}
    :hover {
      color: ${({ theme }) => theme.colors.accent2_1};
    }
    :active {
      color: ${({ theme }) => theme.colors.accent2};
    }
  }
`;

const BuiltInDomLink = ({ ...props }) => <a {...props} />;

const Link = ({
  href,
  Component = BuiltInDomLink,
  variant = LINK_VARIANTS.INLINE,
  uppercase = variant === LINK_VARIANTS.BLOCK,
  withChevron = variant === LINK_VARIANTS.BLOCK,
  underline = variant === LINK_VARIANTS.INLINE,
  bold = variant === LINK_VARIANTS.BLOCK,
  className,
  ...rest
}) => (
  <StyledLink uppercase={uppercase} underline={underline} bold={bold} className={className}>
    <Component href={href} {...rest}>
      {rest.children} {withChevron && '›'}
    </Component>
  </StyledLink>
);

export const LINK_VARIANTS = Object.freeze({
  INLINE: 'INLINE',
  BLOCK: 'BLOCK',
});

Link.propTypes = {
  /**
   * Some frameworks like Next.JS have their own Link component, we want to support that
   */
  Component: PropTypes.func,

  variant: PropTypes.oneOf([LINK_VARIANTS.INLINE, LINK_VARIANTS.BLOCK]),
  uppercase: PropTypes.bool,
  withChevron: PropTypes.bool,
  underline: PropTypes.bool,
  href: PropTypes.string,
};

export default Link;
