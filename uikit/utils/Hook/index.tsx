import React from 'react';
import PropTypes from 'prop-types';

/*
 * Please edit me!
 */
const Hook: React.ComponentType<{
  initialState: any;
  /**
   * receives [state, setState] to keep with hooks semantic
   */
  render: (a: [any, React.Dispatch<any>]) => React.ReactNode | React.ReactNodeArray;
  /**
   * gets passed to React.useEffect, return cleanup function if needed
   */
  effect?: () => void | (() => () => void);
  /**
   * call result gets passed to React.useEffect, receives this component's state
   */
  watch?: (state: any) => any[];
}> = ({
  initialState,
  render = ([]) => null,
  effect = () => () => {},
  watch = (state: any) => [],
}) => {
  const [state, setState] = React.useState(initialState);
  React.useEffect(effect, watch(state));
  return render([state, setState]);
};

export default Hook;
