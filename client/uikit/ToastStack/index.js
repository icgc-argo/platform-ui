import React from 'react';
import PropTypes from 'prop-types';
import { differenceBy } from 'lodash';

import { styled } from '../';
import Toast from '../Toast';

const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const ANIMATION_DURATION = 350;

const StackContainer = styled('div')`
  max-width: 400px;
`;
const AnimatedContainer = styled('div')`
  margin-top: 10px;
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  @keyframes exit {
    from {
      opacity: 1;
      transform: translateX(0px);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
  animation: ${({ unMounting }) => (unMounting ? 'exit' : 'enter')} ${ANIMATION_DURATION / 1000}s
    ease-in-out;
`;
const ToastStack = ({ toastConfigs = [], onInteraction = ({ id, toastIndex, payload }) => {} }) => {
  // holds on to a local copy of toastConfigs for timing with animation
  const convertToLocalStack = toastConfigs => toastConfigs.map(i => ({ ...i, unMounting: false }));
  const [stack, setStack] = React.useState(convertToLocalStack(toastConfigs));
  const previousToastConfigs = usePrevious(toastConfigs);
  const currentlyUnmountingItems = React.createRef();

  // observes toastConfigs from props to sync up with local state, with some delay for animation
  React.useEffect(
    stuff => {
      const [itemToRemove] = differenceBy(previousToastConfigs, toastConfigs);
      if (itemToRemove) {
        setStack(
          convertToLocalStack(previousToastConfigs).map(item => ({
            ...item,
            unMounting: item.id === itemToRemove.id,
          })),
        );
        setTimeout(() => {
          setStack(convertToLocalStack(toastConfigs));
        }, ANIMATION_DURATION);
      } else {
        setStack(convertToLocalStack(toastConfigs));
      }
    },
    [toastConfigs],
  );

  return (
    <StackContainer>
      {stack.map(({ id, unMounting, ...rest }, i) => (
        <AnimatedContainer key={id} unMounting={unMounting}>
          <Toast
            {...rest}
            onInteraction={payload => {
              onInteraction({
                toastIndex: i,
                id,
                payload,
              });
              if (rest.onInteraction) {
                rest.onInteraction(payload);
              }
            }}
          />
        </AnimatedContainer>
      ))}
    </StackContainer>
  );
};

ToastStack.propTypes = {
  toastConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      ...Toast.propTypes,
    }),
  ),
  onInteraction: PropTypes.func,
};

export default ToastStack;
