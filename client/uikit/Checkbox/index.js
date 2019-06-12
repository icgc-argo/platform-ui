import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * Checkbox styles
 * ::before - checkmark
 * :: after - box
 */

export const StyledCheckbox = styled('input')`
  appearance: none;
  position: relative;
  cursor: pointer;
  margin: 0;

  &:before {
    transition: transform 0.25s ease;
    transform: rotate(-45deg) scale(0, 0);

    content: '';

    position: absolute;
    top: 4px;
    left: 2px;
    z-index: 1;

    width: 10px;
    height: 4px;

    border: 2px solid white;
    border-top-style: none;
    border-right-style: none;
  }

  &:checked {
    &:before {
      transform: rotate(-45deg) scale(1, 1);
    }

    &:after {
      background: ${({ theme, disabled }) =>
        theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked']};
    }
  }

  &:focus {
    outline: none;
  }

  &:after {
    cursor: pointer;
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 15px;
    height: 15px;

    background-color: ${({ theme, disabled }) =>
      theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : 'default']};

    border: 1px solid
      ${({ theme, checked, disabled }) =>
        theme.radiocheckbox.radio[
          checked && !disabled ? 'checked' : disabled ? 'disabled' : 'default'
        ]};

    border-radius: 2px;
  }
`;

/*
 * Basic checkbox input
 */
const Checkbox = ({ size, ...rest }) => <StyledCheckbox type="checkbox" {...rest} />;

Checkbox.propTypes = {};

export default Checkbox;
