import React, { AnchorHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '..';

type LinkVariant = 'INLINE' | 'BLOCK';
export type HyperLinkProps = {
  variant?: LinkVariant;
  uppercase?: boolean;
  withChevron?: boolean;
  underline?: boolean;
  bold?: boolean;
  href?: string;
  invert?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const StyledLink = styled<'a', HyperLinkProps>('a')`
  ${({ theme }) => css(theme.typography.default)}
  cursor: pointer;
  color: ${({ theme, invert }) => (invert ? theme.colors.white : theme.colors.accent2_dark)};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'inherit')};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'default')};

  :hover {
    color: ${({ theme }) => theme.colors.accent2_1};
  }
  :active {
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

const Link = React.forwardRef<HTMLAnchorElement, HyperLinkProps>(
  (
    {
      href,
      variant = LINK_VARIANTS.INLINE,
      uppercase = variant === LINK_VARIANTS.BLOCK,
      withChevron = variant === LINK_VARIANTS.BLOCK,
      underline = variant === LINK_VARIANTS.INLINE,
      bold = variant === LINK_VARIANTS.BLOCK,
      invert = false,
      children,
      ...rest
    },
    ref,
  ) => (
    <StyledLink
      ref={ref}
      uppercase={uppercase}
      underline={underline}
      bold={bold}
      href={href}
      invert={invert}
      {...rest}
    >
      {children}
      {withChevron && ' ›'}
    </StyledLink>
  ),
);

export const LINK_VARIANTS = Object.freeze({
  INLINE: 'INLINE' as LinkVariant,
  BLOCK: 'BLOCK' as LinkVariant,
});

export default Link;
