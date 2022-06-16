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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import React, { useState, useContext } from 'react';
import Button from 'uikit/Button';
import Icon from '../../Icon';
import { INPUT_SIZES, StyledInputWrapper } from '../common';
import { StyledInput, IconWrapper } from './styledComponents';
import FormControlContext from '../FormControl/FormControlContext';
import css from '@emotion/css';
export const INPUT_PRESETS = {
  DEFAULT: 'default',
  SEARCH: 'search',
};
const Input = React.forwardRef((_a, ref) => {
  var {
      preset = INPUT_PRESETS.DEFAULT,
      value = '',
      onChange,
      type,
      size: inputSize,
      dataSize,
      placeholder = preset === INPUT_PRESETS.SEARCH ? 'Search...' : null,
      icon = preset === INPUT_PRESETS.SEARCH ? <Icon name={'search'} height="14px" /> : null,
      size = INPUT_SIZES.SM,
      className,
      error,
      disabled,
      showClear = preset === INPUT_PRESETS.SEARCH || false,
      getOverrideCss,
    } = _a,
    props = __rest(_a, [
      'preset',
      'value',
      'onChange',
      'type',
      'size',
      'dataSize',
      'placeholder',
      'icon',
      'size',
      'className',
      'error',
      'disabled',
      'showClear',
      'getOverrideCss',
    ]);
  const {
    disabled: calcDisabled,
    focused,
    error: calcError,
    handleBlur,
    handleFocus,
  } = useContext(FormControlContext) || {};
  const [activeState, setActive] = useState(focused ? 'focus' : 'default');
  const hasError = calcError || !!error;
  const isDisabled = calcDisabled || disabled;
  const onBlur = (event) => {
    var _a;
    setActive('default');
    handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };
  const onClearClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.value = '';
    onChange(e);
  };
  const onFocus = (event) => {
    var _a;
    setActive('focus');
    handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };
  const inputRef = ref || React.createRef();
  const clearButtonRef = React.createRef();
  return (
    <div className={className}>
      <StyledInputWrapper
        size={size}
        onClick={(e) => {
          if (
            inputRef.current &&
            e.target !==
              (clearButtonRef === null || clearButtonRef === void 0
                ? void 0
                : clearButtonRef.current)
          )
            inputRef.current.focus();
        }}
        onFocus={(e) => {
          // @ts-ignore: TypeScript wrongly throws error because the wrapper is a div, but it contains a button
          if (
            inputRef.current &&
            e.target !==
              (clearButtonRef === null || clearButtonRef === void 0
                ? void 0
                : clearButtonRef.current)
          )
            inputRef.current.focus();
        }}
        style={{ cursor: 'text' }}
        error={hasError}
        disabled={isDisabled}
        inputState={activeState}
        getOverrideCss={getOverrideCss}
      >
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          aria-label={props['aria-label']}
          placeholder={isDisabled ? '' : placeholder}
          value={value}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          inputSize={inputSize}
          size={dataSize}
          disabled={isDisabled}
          id={props.id}
          ref={inputRef}
        />
        {showClear && value && String(value).length && (
          <Button
            css={css`
              display: block;
              height: 20px;
              width: 20px;
              border: none;
              background-color: unset;
              padding: 0;
              margin-right: 5px;
              &:hover {
                cursor: pointer;
              }
              &:hover,
              &:focus {
                background-color: unset;
              }
            `}
            onClick={onClearClick}
            type="button"
            ref={clearButtonRef}
            aria-label="Clear text"
          >
            <Icon title="Clear" name="times_circle" width="20px" height="20px" fill="grey_1" />
          </Button>
        )}
      </StyledInputWrapper>
    </div>
  );
});
export default Input;
//# sourceMappingURL=index.jsx.map
