import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * Checkbox styles
 * ::before - checkmark
 * :: after - box
 */

export const StyledCheckbox = styled('div')`
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    top: 0;
    opacity: 0;
    pointer-events: none;
  }

  input:checked + .checkbox {
    &:before {
      transform: rotate(-45deg) scale(1, 1);
    }

    &:after {
      background: ${({ theme, disabled }) =>
        theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked']};
    }
  }

  .checkbox {
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
  }
`;

/*
 * Basic checkbox input
 */
const Checkbox = ({ checked, disabled }) => {
  const HiddenCheckboxRef = React.createRef();

  return (
    <StyledCheckbox checked={checked} disabled={disabled}>
      <input type="checkbox" ref={HiddenCheckboxRef} checked={checked} disabled={disabled} />
      <div
        className="checkbox"
        onClick={e => {
          if (document.activeElement !== HiddenCheckboxRef.current) {
            HiddenCheckboxRef.current.focus();
          }
        }}
      />
    </StyledCheckbox>
  );
};

Checkbox.propTypes = {};

export default Checkbox;
