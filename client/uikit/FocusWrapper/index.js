import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled-base';

const FocusWrapper = styled('button')`
  border: none;
  background: none;
  padding: 0px;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  transition: box-shadow 0.2s ease-in;
  border-radius: 2px;
  line-height: 0px;
  &:focus {
    box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.colors.secondary_1};
  }
`;

FocusWrapper.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default FocusWrapper;
