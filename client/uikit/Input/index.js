import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Icon from "../Icon";

const StyledInputWrapper = styled("div")`
  display: flex;
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  color: ${({ theme, disabled }) =>
    theme.input.textColors[disabled ? "disabled" : "default"]};
  background-color: ${({ theme, disabled }) =>
    theme.input.colors[disabled ? "disabled" : "default"]};
  font-size: ${({ theme, size }) => theme.input.fontSizes[size]};
  border-color: ${({ theme, inputState, error, disabled }) => {
    const state = error ? "error" : disabled ? "disabled" : inputState;
    return theme.input.borderColors[state];
  }};

  &:hover {
    border-color: ${({ theme }) => theme.input.borderColors.hover};
  }
`;

const StyledInput = styled("input")`
  padding: ${({ theme, size }) => theme.input.paddings[size]};
  border: none;
  outline: none;
  flex: 1;
  width: 100%;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
`;

const ErrorMsg = styled("div")`
  color: ${({ theme }) => theme.input.textColors.error};
  margin-top: 1px;
  margin-left: 5px;
  font-size: 12px;
`;

const IconWrapper = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 11px;
  background-color: inherit;
  color: inherit;
`;

const Input = ({
  placeholder,
  value,
  onChange,
  type,
  disabled,
  icon = null,
  size = "sm",
  error = false,
  errorMessage = ""
}) => {
  const [activeState, setActive] = useState("default");

  return (
    <div>
      <StyledInputWrapper
        onFocus={() => setActive("focus")}
        onBlur={() => setActive("default")}
        error={error}
        disabled={disabled}
        size={size}
        error={error}
        inputState={activeState}
      >
        {icon ? <IconWrapper>{icon}</IconWrapper> : null}
        <StyledInput
          placeholder={disabled ? "" : placeholder}
          value={value}
          type={type}
          onChange={onChange}
          size={size}
        />
      </StyledInputWrapper>
      {error && errorMessage ? <ErrorMsg>{errorMessage}</ErrorMsg> : null}
    </div>
  );
};

Input.propTypes = {
  /**
   * Placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Size
   */
  size: PropTypes.oneOf(["sm", "lg"]),
  /**
   * Show an error?
   */
  error: PropTypes.bool,
  /**
   * Error message to show
   */
  errorMessage: PropTypes.string
};

export default Input;
