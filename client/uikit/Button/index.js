import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledButton = styled("button")`
  color: ${({ theme, variant }) => theme.button[variant].color};
`;

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md"
}) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    size={size}
    variant={variant}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "warning"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Button;
