import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledButton = styled("button")`
  color: ${({ theme, variant }) => theme.button[variant].color};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  line-height: ${({ theme, size }) => theme.button.sizes[size]};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  loading = false
}) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    size={size}
    variant={variant}
  >
    {loading ? "Loading..." : children}
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
