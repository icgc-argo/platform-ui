import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const StyledInput = styled("input")`
  border-radius: 8px;
  padding: ${({ theme, size }) => theme.input.paddings[size]};

  background-color: white;
  outline: none;

<<<<<<< HEAD
  border: solid 1px ${({ theme }) => theme.input.borderColors.grey_1};
=======
  font-size: ${({ theme, size }) => theme.input.fontSizes[size]};

  border: solid 1px ${({ theme }) => theme.input.borderColors.default};
>>>>>>> style updates
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
  error = false
}) => (
  <StyledInput
    placeholder={placeholder}
    value={value}
    type={type}
    onChange={onChange}
    disabled={disabled}
    size={size}
    error={error}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  error: PropTypes.bool
};

export default Input;
