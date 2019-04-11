import React from "react";
import PropTypes from "propTypes";

const Template = ({ children }) => <div>{children}</div>;

Template.propTypes = {
  children: PropTypes.node.isRequired
};

export default Template;
