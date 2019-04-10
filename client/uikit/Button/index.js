import React from "react";
import PropTypes from "prop-types";

const Button = ({ children }) => <button>{children}</button>;

Button.propTypes = {
  // Button text
  children: PropTypes.node.required
};

export default Button;
