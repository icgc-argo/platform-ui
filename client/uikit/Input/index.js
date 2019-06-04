import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../Icon';
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

const DropdownIcon = styled(Icon)`
  height: 10px;
  width: 10px;
  padding: 13px;
`;

const Options = styled('ul')`
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  border: 1px solid grey;

  li:hover {
    background-color: green;
    cursor: pointer;
  }
`;

export const Select = ({ placeholder, value, onChange, type, disabled, size = 'sm' }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div>
      <StyledInputWrapper
        onClick={() => setExpanded(!isExpanded)}
        disabled={disabled}
        size={size}
        inputState={activeState}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          - Select an option -
        </div>
        <DropdownIcon name="arrow" />
      </StyledInputWrapper>
      <Options isExpanded={isExpanded}>
        <li>Value 1</li>
        <li>Value 2</li>
      </Options>
    </div>
  );
};
