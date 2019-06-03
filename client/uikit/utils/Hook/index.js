import React from 'react';
import PropTypes from 'prop-types';

/*
 * Please edit me!
 */
const Hook = ({ initialState, render = () => null, effect = () => () => {}, watch = () => [] }) => {
  const [state, setState] = React.useState(initialState);
  React.useEffect(effect, watch(state));
  return render([state, setState]);
};

Hook.propTypes = {
  initialState: PropTypes.any.isRequired,
  /**
   * receives [state, setState] to keep with hooks semantic
   */
  render: PropTypes.func.isRequired,
  /**
   * gets passed to React.useEffect, return cleanup function if needed
   */
  effect: PropTypes.func,
  /**
   * call result gets passed to React.useEffect, receives this component's state
   */
  watch: PropTypes.func,
};

export default Hook;
