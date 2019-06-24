import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../';

import Toast from '../Toast';

/*
 * Please edit me!
 */
const StackContainer = styled('div')``;
const ToastContainer = styled('div')`
  margin-top: 10px;
`;
const ToastStack = ({ toastConfigs = [] }) => {
  const animation = {};
  return (
    <StackContainer>
      {toastConfigs.map((config, i) => (
        <ToastContainer key={i}>
          <Toast animation={animation} {...config} />
        </ToastContainer>
      ))}
    </StackContainer>
  );
};

ToastStack.propTypes = {
  toastConfigs: PropTypes.arrayOf(PropTypes.shape(Toast.propTypes)),
};

export default ToastStack;
