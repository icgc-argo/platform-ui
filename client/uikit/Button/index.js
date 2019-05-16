import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";

const StyledButton = styled("button")`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 100px;
  font-weight: 600;
  text-transform: uppercase;
  border-style: solid;

  border-width: ${({ theme, size }) => theme.button.borderWeights[size]};
  padding: ${({ theme, size }) => theme.button.paddings[size]};
  color: ${({ theme, variant }) => theme.button.textColors[variant].default};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ theme, size }) => theme.button.fontSizes[size]};
  background-color: ${({ theme, variant }) =>
    theme.button.colors[variant].default};
  border-color: ${({ theme, variant }) =>
    theme.button.borderColors[variant].default};

  &:focus {
    background-color: ${({ theme, variant }) =>
      theme.button.colors[variant].focus};
    border-color: ${({ theme }) => theme.button.focusBorder};
  }

  &:hover {
    background-color: ${({ theme, variant }) =>
      theme.button.colors[variant].hover};
    border-color: ${({ theme, variant }) =>
      theme.button.borderColors[variant].hover};
  }

  &:active {
    background-color: ${({ theme, variant }) =>
      theme.button.colors[variant].active};
    border-color: ${({ theme, variant }) =>
      theme.button.borderColors[variant].active};
  }

  &:disabled {
    background-color: ${({ theme, variant }) =>
      theme.button.colors[variant].disabled};
    border-color: ${({ theme, variant }) =>
      theme.button.borderColors[variant].disabled};
    color: ${({ theme, variant }) => theme.button.textColors[variant].disabled};
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
