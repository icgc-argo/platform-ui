import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';

/*
 * :before
 * Outer box (border) offset
 * half the width & height, minus border
 * can't use transform to place it or it will transition
 */
type StyledRadioProps = {
  disabled?: boolean;
  checked?: boolean;
};
export const StyledRadio = styled<'div', StyledRadioProps>('div')`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    position: absolute;
    margin: 0;
    top: 0;
    opacity: 0;
    pointer-events: none;
  }

  input:checked + .radio:before {
    transform: scale(1);
  }

  .radio {
    display: flex;
    flex-direction: row;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      z-index: 1;
      border-radius: 9999px;

      top: 4px;
      left: 4px;

      width: 10px;
      height: 10px;

      background: ${({ theme, disabled }) =>
        theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked']};

      transform: scale(0, 0);
      transition: transform 0.2s ease-in;
    }

    &:after {
      content: '';
      border-radius: 9999px;
      display: inline-block;

      width: 16px;
      height: 16px;

      border: 1px solid
        ${({ theme, disabled, checked }) =>
          theme.radiocheckbox.radio[disabled && !checked ? 'disabled' : 'default']};
    }
  }
`;

/**
 * Radio input
 * ::before - checked dot
 * ::after - circle outline
 */
const Radio = ({
  disabled = false,
  checked,
  onChange,
  'aria-label': ariaLabel,
  ...props
}: {
  checked: boolean;
  disabled: boolean;
  onChange: (e: any | void) => any | void;
  'aria-label': string;
}) => {
  const HiddenRadioRef = React.createRef<HTMLInputElement>();

  return (
    <StyledRadio role="radio" disabled={disabled} checked={checked} aria-checked={checked}>
      <input
        type="radio"
        ref={HiddenRadioRef}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={onChange}
      />
      <div
        className="radio"
        onClick={(e): void => {
          if (document.activeElement !== HiddenRadioRef.current && HiddenRadioRef.current) {
            HiddenRadioRef.current.focus();
          }
        }}
      />
    </StyledRadio>
  );
};

export default Radio;
