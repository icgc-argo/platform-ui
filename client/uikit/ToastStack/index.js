import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../';

import Toast from '../Toast';

/*
 * Please edit me!
 */
const StackContainer = styled('div')`
  max-width: 400px;
`;
const ToastContainer = styled('div')`
  margin-top: 10px;
`;
const ToastStack = ({ toastConfigs = [], onInteraction = ({ toastIndex, payload }) => {} }) => {
  const animation = {
    opacity: [0, 1],
    translationX: [-100, 0],
    easing: 'easeOutSine',
  };
  return (
    <StackContainer>
      {toastConfigs.map((config, i) => (
        <ToastContainer key={i}>
          <Toast
            animation={animation}
            {...config}
            onInteraction={payload => {
              onInteraction({
                toastIndex: i,
                payload,
              });
              if (config.onInteraction) {
                config.onInteraction(payload);
              }
            }}
          />
        </ToastContainer>
      ))}
    </StackContainer>
  );
};

ToastStack.propTypes = {
  toastConfigs: PropTypes.arrayOf(PropTypes.shape(Toast.propTypes)),
};

export default ToastStack;
