import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Button;
