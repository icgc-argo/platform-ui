import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const StyledInput = styled("input")`
  width: 100%;
  border-radius: 8px;
  padding: ${({ theme, size }) => theme.input.paddings[size]};
  background-color: white;
  outline: none;

  border: solid 1px ${({ theme }) => theme.input.borderColors.grey_1};
  font-size: ${({ theme, size }) => theme.input.fontSizes[size]};

  border: solid 1px ${({ theme }) => theme.input.borderColors.default};

  border: solid 1px
    ${({ theme, error }) =>
      theme.input.borderColors[error ? "error" : "default"]};

  &:hover {
    border: solid 1px ${({ theme }) => theme.input.borderColors.lightBlue};
  }

  &:focus {
    border: solid 1px ${({ theme }) => theme.input.borderColors.grey};
  }

  &:active {
    border: solid 1px ${({ theme }) => theme.input.borderColors.grey};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grey_1};
    border: solid 1px ${({ theme }) => theme.input.borderColors.grey_1};
    background-color: ${({ theme }) => theme.input.borderColors.grey_1};
  }
`;

const ErrorMsg = styled("div")`
  color: ${({ theme }) => theme.input.textColors.error};
  margin-top: 1px;
  margin-left: 5px;
  font-size: 11px;
`;

/**
 * Basic  input component
 */
const Input = ({
  placeholder,
  value,
  onChange,
  type,
  disabled,
  size = "sm",
  error = false,
  errorMessage = ""
}) => (
  <React.Fragment>
    <StyledInput
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      disabled={disabled}
      size={size}
      error={error}
    />
    {error && errorMessage ? <ErrorMsg> {errorMessage}</ErrorMsg> : null}
  </React.Fragment>
);

Input.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default Input;
