import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  return (
    <div className={className}>
      <FormControlContext.Consumer>
        {contextValue => (
          <StyledInputWrapper
            size={size}
            onFocus={() => setActive('focus')}
            onBlur={() => setActive('default')}
            error={contextValue.error}
            disabled={contextValue.disabled}
            size={size}
            inputState={activeState}
          >
            {icon && <IconWrapper>{icon}</IconWrapper>}
            <StyledInput
              aria-label={props['aria-label']}
              placeholder={contextValue.disabled ? '' : placeholder}
              value={value}
              type={type}
              onChange={onChange}
              size={size}
              disabled={contextValue.disabled}
              id={props.id}
            />
          </StyledInputWrapper>
        )}
      </FormControlContext.Consumer>
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
