import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import { INPUT_SIZES, StyledInputWrapper } from '../common';
import { StyledInput, IconWrapper } from './styledComponents';
import FormControlContext from '../FormControl/FormControlContext';
import css from '@emotion/css';

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
  showClear = preset === INPUT_PRESETS.SEARCH || false,
  getOverrideCss,
  ...props
}) => {
  const [activeState, setActive] = useState('default');

  const { disabled: calcDisabled = disabled, error: calcError = error } =
    useContext(FormControlContext) || {};

  const onClearClick = e => {
    e.target.value = '';
    onChange(e);
  };

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
        getOverrideCss={getOverrideCss}
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
        {showClear && value && value.length && (
          <div
            css={css`
              margin-right: 5px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Icon
              name="times_circle"
              width="20px"
              height="20px"
              fill="grey_1"
              onClick={onClearClick}
            />
          </div>
        )}
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
  /**
   * Show an error?
   */
  error: PropTypes.bool,
  /**
   * Whether this input is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Error message to show
   */
  errorMessage: PropTypes.string,
  /**
   * Used for providing css override of the container with access to the internal state
   */
  getOverrideCss: PropTypes.func,
  /**
   * Whether to show the clear button
   */
  showClear: PropTypes.bool,
};

export default Input;
