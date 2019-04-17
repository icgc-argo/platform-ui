import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Button = ({ children, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

const StyledButton = styled(Button)`
  color: ${({ theme, variant }) => {
    return theme.button[variant].color;
  }};
`;

StyledButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "warning"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

StyledButton.defaultProps = {
  size: "md",
  variant: "primary",
  disabled: false,
  onClick: x => x
};

export default StyledButton;
