import React from 'react';
import PropTypes from 'prop-types';
import { StyledRadio } from './styledComponents';
import { RadioCheckboxWrapper } from '../common';

const Radio = ({ id, name, value, label, children, checked, onChange, disabled }) => (
  <RadioCheckboxWrapper disabled={disabled} checked={checked}>
    <StyledRadio
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />

    <label htmlFor={name}>{children}</label>
  </RadioCheckboxWrapper>
);

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.children,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Radio;
