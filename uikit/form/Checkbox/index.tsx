/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { RefObject } from 'react';
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
  width: min-content;

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
  checked = false,
  disabled = false,
  forwardedRefs,
  id,
  onBlur,
  onChange,
  onFocus,
  'aria-label': ariaLabel,
  value,
  color,
  size = STYLEDCHECKBOX_SIZES.MD,
  ...props
}: {
  checked: boolean;
  disabled?: boolean;
  forwardedRefs?: RefObject<HTMLInputElement>[];
  id?: string;
  size?: StyledCheckboxStyles;
  onBlur?: (e: any | void) => any | void;
  onChange: (e: any | void) => any | void;
  onFocus?: (e: any | void) => any | void;
  'aria-label': string;
  value: string | number;
  color?: string;
}) => {
  const checkboxRef = forwardedRefs?.[0] || React.createRef<HTMLInputElement>();
  const HiddenCheckboxRef = forwardedRefs?.[1] || React.createRef<HTMLInputElement>();

  return (
    <StyledCheckbox
      data-value={value}
      checked={checked}
      disabled={disabled}
      color={color}
      size={size}
    >
      <input
        type="checkbox"
        ref={HiddenCheckboxRef}
        checked={checked}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        aria-label={ariaLabel}
        value={value}
      />
      <div
        className="checkbox"
        onClick={(event) => {
          if (event.target !== HiddenCheckboxRef.current && HiddenCheckboxRef.current) {
            HiddenCheckboxRef.current.click();
          }
        }}
        ref={checkboxRef}
      />
    </StyledCheckbox>
  );
};

export default Checkbox;
