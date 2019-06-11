import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import { INPUT_SIZES, StyledInputWrapper } from '../common';
import { StyledInput, IconWrapper } from './styledComponents';
import FormControlContext from '../FormControl/FormControlContext';

export const INPUT_PRESETS = {
  DEFAULT: 'default',
  SEARCH: 'search',
};

const Input = ({
  preset = INPUT_PRESETS.DEFAULT,
  value,
  onChange,
  type,
  placeholder = preset === INPUT_PRESETS.SEARCH ? 'Search...' : null,
  icon = preset === INPUT_PRESETS.SEARCH ? <Icon name={INPUT_PRESETS.SEARCH} /> : null,
  size = INPUT_SIZES.SM,
  className,
  error,
  disabled,
  ...props
}) => {
  const [activeState, setActive] = useState('default');

  const { disabled: calcDisabled = disabled, error: calcError = error } =
    useContext(FormControlContext) || {};

  return (
    <div className={className}>
      <StyledInputWrapper
        size={size}
        onFocus={() => setActive('focus')}
        onBlur={() => setActive('default')}
        error={calcError}
        disabled={calcDisabled}
        size={size}
        inputState={activeState}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          aria-label={props['aria-label']}
          placeholder={calcDisabled ? '' : placeholder}
          value={value}
          type={type}
          onChange={onChange}
          size={size}
          disabled={calcDisabled}
          id={props.id}
        />
      </StyledInputWrapper>
    </div>
  );
};

Input.propTypes = {
  ['aria-label']: PropTypes.string.isRequired,
  /**
   * commonly used configuration aliases
   */
  preset: PropTypes.oneOf([INPUT_PRESETS.DEFAULT, INPUT_PRESETS.SEARCH]),
  /**
   * Placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Size
   */
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
};

export default Input;
