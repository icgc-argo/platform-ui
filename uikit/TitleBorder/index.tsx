// @flow
import { css, styled } from '..';
import React from 'react';

const TitleBorder = styled('hr')`
  border: 0;
  width: ${({ width }) => (width ? width : 'auto')};
  height: 3px;
  border-radius: 1.5px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  margin: 0;
`;

export default TitleBorder;
