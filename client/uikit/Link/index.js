import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '..';

const StyledLink = styled('a')`
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
`;

const Link = ({
  href,
  variant = LINK_VARIANTS.INLINE,
  uppercase = variant === LINK_VARIANTS.BLOCK,
  withChevron = variant === LINK_VARIANTS.BLOCK,
  underline = variant === LINK_VARIANTS.INLINE,
  bold = variant === LINK_VARIANTS.BLOCK,
  children,
  ...rest
}) => (
  <StyledLink uppercase={uppercase} underline={underline} bold={bold} href={href} {...rest}>
    {children} {withChevron && '›'}
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
  variant: PropTypes.oneOf([LINK_VARIANTS.INLINE, LINK_VARIANTS.BLOCK]),
  uppercase: PropTypes.bool,
  withChevron: PropTypes.bool,
  underline: PropTypes.bool,
  href: PropTypes.string,
};

export default Link;
