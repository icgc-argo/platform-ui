import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Radio from '../Radio';
import { css } from 'uikit';
import RadioCheckContext from '../RadioCheckboxGroup/RadioCheckContext';

/**
 * FormRadio to be used with RadioCheckboxGroup
 */
const FormRadio = props => {
  const { id, name, value, label, children, disabled, checked = false } = props;
  const { onChange, isChecked } = useContext(RadioCheckContext) || props;
  const onClick = () => onChange(value);
  const calcChecked = isChecked ? isChecked(value) : checked;

  return (
    <RadioCheckboxWrapper disabled={disabled} checked={calcChecked} onClick={onClick}>
      <Radio
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
