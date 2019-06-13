import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import RadioInput from '../../RadioInput';
import css from '@emotion/css';

const Radio = ({ id, name, value, label, children, checked, onChange, disabled }) => {
  const onClick = () => onChange(value);
  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked} onClick={onClick}>
      <RadioInput id={id} name={name} value={value} checked={checked} disabled={disabled} />
      <label
        css={css`
          margin-left: 32px;
        `}
      >
        {children}
      </label>
    </RadioCheckboxWrapper>
  );
};

export const RadioGroup = ({ onChange, children, selectedItem }) => (
  <StyledGroup role="radiogroup">
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        checked: child.props.value === selectedItem,
        onChange: e => {
          onChange(e);
        },
      }),
    )}
  </StyledGroup>
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
