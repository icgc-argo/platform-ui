import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * Checkbox styles
 * ::before - checkmark
 * ::after - box
 */

export const StyledCheckbox = styled<
  'div',
  { disabled?: boolean; checked?: boolean; color?: string }
>('div')`
  position: relative;
  cursor: pointer;

  input {
    margin: 0;
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
      background: ${({ theme, disabled, color }) =>
        disabled
          ? theme.radiocheckbox.radio.disabled
          : color
          ? color
          : theme.radiocheckbox.radio.checked};
    }
  }

  .checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;

    &:before {
      transition: transform 0.2s ease-in;
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
      display: inline-block;
      transition: background-color 0.2s ease-in;
      cursor: pointer;
      content: '';

      width: 15px;
      height: 15px;

      background-color: ${({ theme, disabled }) =>
        theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : 'default']};

      border: 1px solid
        ${({ theme, checked, disabled, color }) => {
          if (disabled) {
            return theme.radiocheckbox.radio.disabled;
          } else if (checked && !disabled) {
            return color ? color : theme.radiocheckbox.radio.checked;
          } else {
            return theme.radiocheckbox.radio.default;
          }
        }};

      border-radius: 2px;
    }
  }
`;

/*
 * Basic checkbox input
 */
const Checkbox = ({
  checked,
  disabled = false,
  onChange,
  'aria-label': ariaLabel,
  value,
  color,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (e: any | void) => any | void;
  'aria-label': string;
  value: string | number;
  color?: string;
}) => {
  const HiddenCheckboxRef = React.createRef<HTMLInputElement>();

  return (
    <StyledCheckbox
      data-value={value}
      checked={checked}
      disabled={disabled}
      onClick={onChange}
      color={color}
    >
      <input
        type="checkbox"
        ref={HiddenCheckboxRef}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      <div
        className="checkbox"
        onClick={e => {
          if (document.activeElement !== HiddenCheckboxRef.current && HiddenCheckboxRef.current) {
            HiddenCheckboxRef.current.focus();
          }
        }}
      />
    </StyledCheckbox>
  );
};

export default Checkbox;
