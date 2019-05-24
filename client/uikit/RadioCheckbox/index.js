import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import useTheme from "../utils/useTheme";

const StyledWrapper = styled("div")`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.radiocheckbox.borderColors.default};

  color: ${({ theme, disabled }) =>
    theme.radiocheckbox.textColors[disabled ? "disabled" : "default"]};

  padding: 4px 6px 4px 8px;

  label {
    position: relative;
    margin-left: 8px;
    cursor: pointer;
    color: inherit;
    font-size: 14px;
  }
`;

const StyledRadio = styled("input")`
  position: relative;
  cursor: pointer;
  margin: 0;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 1px;
    z-index: 1;

    width: 0.65rem;
    height: 0.65rem;

    background: ${({ theme, disabled }) =>
      theme.radiocheckbox.radio[disabled ? "disabled" : "checked"]};
    border-radius: 50%;

    transition: transform 0.65s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transform: scale(0, 0);
  }

  &:checked {
    &:before {
      transform: scale(1, 1);
    }
  }

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -2px;

    width: 14px;
    height: 14px;

    background-color: white;

    border-radius: 50%;
    border: 1px solid
      ${({ theme, disabled, checked }) =>
        theme.radiocheckbox.radio[
          disabled && !checked ? "disabled" : "default"
        ]};
  }
`;

const StyledCheckbox = styled("input")`
  position: relative;
  cursor: pointer;
  margin: 0;

  &:before {
    transition: transform 0.65s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    transform: rotate(-45deg) scale(0, 0);

    content: "";

    position: absolute;
    top: 4px;
    left: 3px;
    z-index: 1;

    width: 10px;
    height: 4px;

    border: 2px solid white;
    border-top-style: none;
    border-right-style: none;
  }

  &:checked {
    &:before {
      transform: rotate(-45deg) scale(1, 1);
    }

    &:after {
      background: ${({ theme, disabled }) =>
        theme.radiocheckbox.radio[disabled ? "disabled" : "checked"]};
    }
  }

  &:after {
    content: "";

    position: absolute;
    top: -2px;
    left: 0;

    width: 16px;
    height: 16px;

    background: #fff;

    border: 1px solid
      ${({ theme, checked, disabled }) =>
        theme.radiocheckbox.radio[
          checked && !disabled ? "checked" : disabled ? "disabled" : "default"
        ]};

    border-radius: 2px;
    cursor: pointer;
  }
`;

const RadioCheckbox = ({
  id,
  name,
  value,
  label,
  children,
  checked,
  onChange,
  disabled,
  type
}) => (
  <StyledWrapper disabled={disabled} checked={checked}>
    {type === "radio" ? (
      <StyledRadio
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    ) : (
      <StyledCheckbox
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    )}
    <label htmlFor={name}>{children}</label>
  </StyledWrapper>
);

RadioCheckbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.children,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default RadioCheckbox;
