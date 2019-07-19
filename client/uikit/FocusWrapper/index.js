import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'uikit';

const FocusWrapper = styled('button')`
  border: none;
  background: none;
  padding: 0px;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  transition: box-shadow 0.1s ease-in;
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
