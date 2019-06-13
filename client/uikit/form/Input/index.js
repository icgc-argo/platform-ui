import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Icon from '../../Icon';
import { INPUT_SIZES, StyledInputWrapper } from '../common';
import { StyledInput, ErrorMsg, IconWrapper } from './styledComponents';

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
  size = INPUT_SIZES.SM,
  error = false,
  errorMessage = '',
  className,
  getOverrideCss,
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  return (
    <div className={className}>
      <StyledInputWrapper
        size={size}
        onFocus={() => setActive('focus')}
        onBlur={() => setActive('default')}
        error={error}
        disabled={disabled}
        size={size}
        error={error}
        inputState={activeState}
        getOverrideCss={getOverrideCss}
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
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  /**
   * Show an error?
   */
  error: PropTypes.bool,
  /**
   * Error message to show
   */
  errorMessage: PropTypes.string,
  /**
   * Used for providing css override of the container with access to the internal state
   */
  getOverrideCss: PropTypes.func,
};

export default Input;
