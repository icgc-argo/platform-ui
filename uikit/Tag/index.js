//@flow
import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

export const TAG_VARIANTS = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

const Tag: React.ComponentType<{
  variant?: $Keys<typeof TAG_VARIANTS>,
}> = styled('div')`
  ${({ theme }) => css(theme.typography.paragraph)};
  box-sizing: border-box;
  display: inline-block;
  min-height: 14px;
  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 8px;
  background-color: ${({ theme, variant = 'INFO' }) =>
    ({
      [TAG_VARIANTS.ERROR]: theme.colors.error,
      [TAG_VARIANTS.WARNING]: theme.colors.warning,
      [TAG_VARIANTS.INFO]: theme.colors.secondary,
    }[variant])};
  color: white;
`;

export default Tag;
