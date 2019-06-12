import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledRadio, StyledLabel, StyledRadioGroup } from './styledComponents';
import { RadioCheckboxWrapper } from '../common';

const Radio = ({ id, name, value, label, children, checked, onChange, disabled }) => {
  const onClick = () => onChange(value);
  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked}>
      <StyledRadio
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
      />

      <StyledLabel onClick={onClick}>{children}</StyledLabel>
    </RadioCheckboxWrapper>
  );
};

export const RadioGroup = ({ onChange, children, selectedItem }) => (
  <StyledRadioGroup>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        checked: child.props.value === selectedItem,
        onChange: e => {
          onChange(e);
        },
      }),
    )}
  </StyledRadioGroup>
);

RadioGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  selectedItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
    .isRequired,
};

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Radio;
