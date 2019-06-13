import React from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import { default as CheckboxInput } from '../../input/Checkbox';
import css from '@emotion/css';

const Checkbox = ({ id, name, value, label, children, checked, onChange, disabled, type }) => {
  const onClick = () => onChange(value);
  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked}>
      <CheckboxInput
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onClick}
        disabled={disabled}
      />
      <label
        css={css`
          margin-left: 24px;
        `}
        onClick={onClick}
      >
        {children}
      </label>
    </RadioCheckboxWrapper>
  );
};

export const CheckboxGroup = ({ onChange, children, selectedItems }) => (
  <StyledGroup>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        checked: selectedItems.has(child.props.value),
        onChange: e => {
          onChange(e);
        },
      }),
    )}
  </StyledGroup>
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
