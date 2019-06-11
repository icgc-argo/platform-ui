import React, { useState } from 'react';
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

export const RadioGroup = ({ onChange, children, selectedItem }) => {
  return React.Children.map(children, child => {
    console.log('child props', child.props);
    return React.cloneElement(child, {
      checked: child.props.value === selectedItem,
      onChange: e => {
        console.log('on change!');
        onChange(e);
      },
    });
  });
};

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
