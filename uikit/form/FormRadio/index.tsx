import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Radio from '../Radio';
import css from '@emotion/css';
import RadioCheckContext from '../RadioCheckboxGroup/RadioCheckContext';

/**
 * FormRadio to be used with RadioCheckboxGroup
 */
const FormRadio: React.ComponentType<{
  id?: string;
  name?: string;
  value?: any;
  children: React.ReactNode;
  checked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  'aria-label'?: string;
}> = props => {
  const { ['aria-label']: ariaLabel, value, children, disabled, checked = false } = props;
  const { onChange, isChecked } = useContext(RadioCheckContext) || {
    ...props,
    isChecked: props.checked,
  };
  const onClick = () => onChange(value);
  const calcChecked = isChecked
    ? isChecked instanceof Function
      ? isChecked(value)
      : isChecked
    : checked;

  return (
    <RadioCheckboxWrapper disabled={disabled} checked={calcChecked} onClick={onClick}>
      <Radio aria-label={ariaLabel} checked={calcChecked} disabled={disabled} onChange={onChange} />
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

export default FormRadio;
