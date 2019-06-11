import React from 'react';
import PropTypes from 'prop-types';
import { StyledCheckbox, StyledLabel } from './styledComponents';
import { RadioCheckboxWrapper } from '../common';

const Checkbox = ({ id, name, value, label, children, checked, onChange, disabled, type }) => {
  const onClick = () => onChange(value);
  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked}>
      <StyledCheckbox
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onClick}
        disabled={disabled}
      />
      <StyledLabel onClick={onClick}>{children}</StyledLabel>
    </RadioCheckboxWrapper>
  );
};

export const CheckboxGroup = ({ onChange, children, selectedItems }) =>
  React.Children.map(children, child =>
    React.cloneElement(child, {
      checked: selectedItems.has(child.props.value),
      onChange: e => {
        onChange(e);
      },
    }),
  );

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
