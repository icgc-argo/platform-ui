import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../../Icon';
import { StyledInput, StyledInputWrapper, ErrorMsg, IconWrapper } from './styledComponents';

const Input = ({
  placeholder,
  value,
  onChange,
  type,
  disabled,
  icon = null,
  size = 'sm',
  error = false,
  errorMessage = '',
}) => {
  const [activeState, setActive] = useState('default');

  return (
    <div>
      <StyledInputWrapper
        onFocus={() => setActive('focus')}
        onBlur={() => setActive('default')}
        error={error}
        disabled={disabled}
        size={size}
        error={error}
        inputState={activeState}
      >
        {icon ? <IconWrapper>{icon}</IconWrapper> : null}
        <StyledInput
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
