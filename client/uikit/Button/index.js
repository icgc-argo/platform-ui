import React from "react";
import PropTypes from "prop-types";

/** Button component */
const Button = ({ children }) => <button>{children}</button>;

Button.propTypes = {
  /** Button text */
  children: PropTypes.node.isRequired
};

export default Button;
