import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Radio from '../Radio';
import css from '@emotion/css';

const FormRadio = ({ id, name, value, label, children, checked, onChange, disabled }) => {
  const onClick = () => onChange(value);
  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked} onClick={onClick}>
      <Radio
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        css={css`
          margin-left: 28px;
        `}
      >
        {children}
      </label>
    </RadioCheckboxWrapper>
  );
};

FormRadio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FormRadio;
