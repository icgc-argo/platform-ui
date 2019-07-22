import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
/* import PropTypes from 'prop-types'; */

const Tag = styled('div')`
  box-sizing: border-box;
  display: inline-block;
  min-height: 14px;
  ${({ theme }) => css(theme.typography.paragraph)};
  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 8px;
  background-color: #0774d3;
  color: white;
`;

Tag.propTypes = {};

export default Tag;
