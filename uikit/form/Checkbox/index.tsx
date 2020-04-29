import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * Checkbox styles
 * ::before - checkmark
 * ::after - box
 */
export type StyledCheckboxStyles = 'sm' | 'md';

export const STYLEDCHECKBOX_SIZES: {
  SM: StyledCheckboxStyles;
  MD: StyledCheckboxStyles;
} = Object.freeze({
  SM: 'sm',
  MD: 'md',
});

export const StyledCheckbox = styled<
  'div',
  { disabled?: boolean; checked?: boolean; color?: string; size?: 'sm' | 'md' }
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
      top: ${({ theme, size }) => theme.checkbox.checkTopPositions[size]};
      left: ${({ theme, size }) => theme.checkbox.checkLeftPositions[size]};
      z-index: 1;

      width: ${({ theme, size }) => theme.checkbox.checkWidths[size]};
      height: ${({ theme, size }) => theme.checkbox.checkHeights[size]};

      border: 2px solid white;
      border-top-style: none;
      border-right-style: none;
    }

    &:after {
      display: inline-block;
      transition: background-color 0.2s ease-in;
      cursor: pointer;
      content: '';

      width: ${({ theme, size }) => theme.checkbox.boxWidths[size]};
      height: ${({ theme, size }) => theme.checkbox.boxHeights[size]};

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
  size = STYLEDCHECKBOX_SIZES.MD,
  ...props
}: {
  checked: boolean;
  disabled?: boolean;
  size?: StyledCheckboxStyles;
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
      size={size}
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
