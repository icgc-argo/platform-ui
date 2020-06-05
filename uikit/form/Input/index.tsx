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

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import { INPUT_SIZES, StyledInputWrapper, StyledInputWrapperProps } from '../common';
import { StyledInput, IconWrapper } from './styledComponents';
import FormControlContext from '../FormControl/FormControlContext';
import css from '@emotion/css';

export const INPUT_PRESETS = {
  DEFAULT: 'default',
  SEARCH: 'search',
};

const Input: React.ComponentType<
  {
    ['aria-label']: string;
    /**
     * commonly used configuration aliases
     */
    preset?: 'default' | 'search';
    /**
     * Placeholder
     */
    size?: 'sm' | 'lg';
    /**
     * Show an error?
     */
    error?: boolean;
    /**
     * Error message to show
     */
    errorMessage?: string;
    /**
     * Used for providing css override of the container with access to the internal state
     */
    getOverrideCss?: (a: any) => any;
    /**
     * Whether to show the clear button
     */
    showClear?: boolean;

    icon?: React.ReactElement;
    className?: string;
    id?: string;
    dataSize?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>
> = ({
  preset = INPUT_PRESETS.DEFAULT,
  value,
  onChange,
  onBlur = () => {},
  type,
  size: inputSize,
  dataSize,
  placeholder = preset === INPUT_PRESETS.SEARCH ? 'Search...' : null,
  icon = preset === INPUT_PRESETS.SEARCH ? <Icon name={'search'} /> : null,
  size = INPUT_SIZES.SM,
  className,
  error,
  disabled,
  showClear = preset === INPUT_PRESETS.SEARCH || false,
  getOverrideCss,
  ...props
}) => {
  const [activeState, setActive] = useState('default');

  const { disabled: calcDisabled = disabled, error: calcError = !!error } =
    useContext(FormControlContext) || {};

  const onClearClick = e => {
    e.target.value = '';
    onChange(e);
  };

  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <div className={className}>
      <StyledInputWrapper
        size={size as StyledInputWrapperProps['size']}
        onFocus={() => setActive('focus')}
        onBlur={() => setActive('default')}
        onClick={() => {
          if (inputRef.current) inputRef.current.focus();
        }}
        style={{ cursor: 'text' }}
        error={calcError}
        disabled={calcDisabled}
        inputState={activeState as StyledInputWrapperProps['inputState']}
        getOverrideCss={getOverrideCss}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          aria-label={props['aria-label']}
          placeholder={calcDisabled ? '' : placeholder}
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          inputSize={inputSize}
          size={dataSize}
          disabled={calcDisabled}
          id={props.id}
          ref={inputRef}
        />
        {showClear && value && String(value).length && (
          <div
            css={css`
              margin-right: 5px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              &:hover {
                cursor: pointer;
              }
            `}
          >
            <Icon
              title="Clear"
              name="times_circle"
              width="20px"
              height="20px"
              fill="grey_1"
              onClick={onClearClick}
            />
          </div>
        )}
      </StyledInputWrapper>
    </div>
  );
};

export default Input;
