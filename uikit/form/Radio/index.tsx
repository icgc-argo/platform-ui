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
