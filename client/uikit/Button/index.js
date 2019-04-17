import React, { useState } from "react";
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
  box-shadow: none;

  &:hover {
  }

  &:focus {
  }

  &:active {
  }

  &:disabled {
  }
`;

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  showLoader = false
}) => {
  const [isLoading, setLoading] = useState(false);
  const onClickFn = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <StyledButton
      onClick={showLoader ? onClickFn : onClick}
      disabled={disabled}
      size={size}
      variant={variant}
    >
      {isLoading ? "Loading..." : children}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Button variant type eg. primary
   */
  variant: PropTypes.oneOf(["primary", "secondary", "warning"]),
  /**
   * Button size
   */
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  /**
   * Use with async onClick handlers to set loading indicator
   */
  showLoader: PropTypes.boolean
};

export default Button;
