import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../../Icon';
import { StyledInput, StyledInputWrapper, ErrorMsg, IconWrapper } from './styledComponents';

export const INPUT_PRESETS = {
  DEFAULT: 'default',
  SEARCH: 'search',
};

const Input = ({
  preset = INPUT_PRESETS.DEFAULT,
  value,
  onChange,
  type,
  disabled,
  placeholder = preset === INPUT_PRESETS.SEARCH ? 'Search...' : null,
  icon = preset === INPUT_PRESETS.SEARCH ? <Icon name={INPUT_PRESETS.SEARCH} /> : null,
  size = 'sm',
  error = false,
  errorMessage = '',
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  return (
    <div>
      <StyledInputWrapper
        size={size}
        onFocus={() => setActive('focus')}
        onBlur={() => setActive('default')}
        error={error}
        disabled={disabled}
        size={size}
        error={error}
        inputState={activeState}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          aria-label={props['aria-label']}
          placeholder={disabled ? '' : placeholder}
          value={value}
          type={type}
          onChange={onChange}
          size={size}
          disabled={disabled}
        />
      </StyledInputWrapper>
      {error && errorMessage ? <ErrorMsg>{errorMessage}</ErrorMsg> : null}
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
  size: PropTypes.oneOf(['sm', 'lg']),
  /**
   * Show an error?
   */
  error: PropTypes.bool,
  /**
   * Error message to show
   */
  errorMessage: PropTypes.string,
};

export default Input;
