import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Checkbox from '../Checkbox';
import css from '@emotion/css';
import RadioCheckContext from '../RadioCheckboxGroup/RadioCheckContext';

/**
 * Checkbox for Form
 * To be used with RadioCheckboxGroup
 */
const FormCheckbox = props => {
  const { id, name, value, label, children, disabled, type } = props;

  const { onChange, isChecked = props.isChecked } = useContext(RadioCheckContext) || props;
  const onClick = () => onChange(value);
  const checked = isChecked(value);

  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked} onClick={onClick}>
      <Checkbox
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        css={css`
          margin-left: 24px;
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
