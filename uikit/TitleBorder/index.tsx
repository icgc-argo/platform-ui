import { css, styled } from '..';
import React from 'react';
import defaultTheme from 'uikit/theme/defaultTheme';

const TitleBorder = styled<'hr', { width?: string; color: keyof typeof defaultTheme.colors }>('hr')`
  border: 0;
  width: ${({ width }) => (width ? width : 'auto')};
  height: 3px;
  border-radius: 1.5px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  margin: 0;
`;

export default TitleBorder;
