import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Checkbox from '../Checkbox';
import { css } from 'uikit';
import RadioCheckContext from '../RadioCheckboxGroup/RadioCheckContext';

/**
 * Checkbox for Form
 * To be used with RadioCheckboxGroup
 */
const FormCheckbox = props => {
  const { id, name, value, label, children, disabled, type, checked } = props;

  const { onChange, isChecked = props.isChecked } = useContext(RadioCheckContext) || props;
  const onClick = () => onChange(value);
  const calcChecked = isChecked ? isChecked(value) : checked;

  return (
    <RadioCheckboxWrapper disabled={disabled} checked={calcChecked} onClick={onClick}>
      <Checkbox
        id={id}
        name={name}
        value={value}
        checked={calcChecked}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        css={css`
          margin-left: 8px;
        `}
      >
        {children}
      </label>
    </RadioCheckboxWrapper>
  );
};

FormCheckbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FormCheckbox;
