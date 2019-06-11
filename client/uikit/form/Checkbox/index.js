import React from 'react';
import PropTypes from 'prop-types';
import { StyledCheckbox } from './styledComponents';
import { RadioCheckboxWrapper } from '../common';

const Checkbox = ({ id, name, value, label, children, checked, onChange, disabled, type }) => (
  <RadioCheckboxWrapper disabled={disabled} checked={checked}>
    <StyledCheckbox
      type="checkbox"
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

export default Checkbox;
