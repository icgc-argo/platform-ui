import React, { AnchorHTMLAttributes } from 'react';
declare type LinkVariant = 'INLINE' | 'BLOCK';
export declare type HyperLinkProps = {
  variant?: LinkVariant;
  uppercase?: boolean;
  withChevron?: boolean;
  underline?: boolean;
  bold?: boolean;
  href?: string;
  invert?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
declare const Link: React.ForwardRefExoticComponent<
  {
    variant?: LinkVariant;
    uppercase?: boolean;
    withChevron?: boolean;
    underline?: boolean;
    bold?: boolean;
    href?: string;
    invert?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.RefAttributes<HTMLAnchorElement>
>;
export declare const LINK_VARIANTS: Readonly<{
  INLINE: LinkVariant;
  BLOCK: LinkVariant;
}>;
export default Link;
