import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";

const StyledButton = styled("button")`
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  line-height: ${({ theme, size }) => theme.button.sizes[size]};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 20px;

  padding: 10px 24px;
  background-color: ${({ theme, variant }) => theme.button[variant].default};

  &:hover {
    background-color: ${({ theme, variant }) => theme.button[variant].hover};
  }

  &:focus {
    background-color: ${({ theme, variant }) => theme.button[variant].focus};
    border: 2px solid ${({ theme }) => theme.button.focusBorder};
  }

  &:active {
    background-color: ${({ theme, variant }) => theme.button[variant].active};
  }

  &:disabled {
    background-color: ${({ theme, variant }) => theme.button[variant].disabled};
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

  const onClickFn = async event => {
    setLoading(true);
    await onClick(event);
    setLoading(false);
  };

  return (
    <StyledButton
      onClick={showLoader ? onClickFn : onClick}
      disabled={disabled}
      size={size}
      variant={variant}
    >
      {isLoading && showLoader ? (
        <Icon name="spinner" width={"40px"} height={"40px"} fill={"#fff"} />
      ) : (
        children
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Button variant type eg. primary
   */
  variant: PropTypes.oneOf(["primary", "secondary"]),
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
  showLoader: PropTypes.bool
};

export default Button;
