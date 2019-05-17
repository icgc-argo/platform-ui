import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";
import useTheme from "../utils/useTheme";

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
    border-color: ${({ theme, variant }) =>
      theme.button.borderColors[variant].focus};
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
  size = variant === "secondary" ? "sm" : "md",
  isAsync = false
}) => {
  const [isLoading, setLoading] = useState(false);
  const theme = useTheme();
  const shouldShowLoading = isLoading && isAsync;
  const onClickFn = async event => {
    setLoading(true);
    await onClick(event);
    setLoading(false);
  };
  return (
    <StyledButton
      onClick={isAsync ? onClickFn : onClick}
      disabled={disabled}
      size={size}
      variant={variant}
    >
      <span style={{ visibility: shouldShowLoading ? "hidden" : "visible" }}>
        {children}
      </span>
      <span
        style={{
          position: "absolute",
          visibility: shouldShowLoading ? "visible" : "hidden"
        }}
      >
        <Icon
          name="spinner"
          width={"20px"}
          height={"20px"}
          fill={theme.button.textColors[variant].default}
        />
      </span>
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
  size: PropTypes.oneOf(["sm", "md"]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  /**
   * Use with async onClick handlers to set loading indicator
   */
  async: PropTypes.bool
};

export default Button;
