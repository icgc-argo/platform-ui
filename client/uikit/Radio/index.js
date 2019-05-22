import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import useTheme from "../utils/useTheme";

const StyledRadio = styled("div")`
  border: 1px solid #dcdde1;
  padding: 4px 6px 4px 8px;

  label {
    position: relative;
    margin-left: 11px;
    cursor: pointer;
  }

  input {
    position: relative;
    cursor: pointer;
    margin: 0;

    &:before {
      content: "";
      position: absolute;
      top: 1px;
      left: 3px;
      z-index: 1;

      width: 0.75rem;
      height: 0.75rem;

      background: #0774d3;
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
      top: -0.125rem;
      left: 0;

      width: 1rem;
      height: 1rem;

      background-color: white;

      border: 1px solid #babcc2;
      border-radius: 50%;
    }
  }
`;

const Radio = ({ id, name, value, label, children, checked, onChange }) => (
  <StyledRadio>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={name}>{children}</label>
  </StyledRadio>
);

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.children,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default Radio;
