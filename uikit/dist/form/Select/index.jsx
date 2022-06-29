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
import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import { StyledInputWrapper, INPUT_SIZES } from '../common';
import Typography from '../../Typography';
import {
  DropdownIcon,
  OptionsList,
  Option,
  HiddenSelect,
  POPUP_POSITIONS,
} from './styledComponents';
import useTheme from '../../utils/useTheme';
import Tooltip from 'uikit/Tooltip';
import FormControlContext from '../FormControl/FormControlContext';
const Select = (_a) => {
  var {
      placeholder = '- Select an option -',
      id,
      value = '',
      disabled = false,
      size = INPUT_SIZES.SM,
      options = [],
      error = false,
      popupPosition = POPUP_POSITIONS.DOWN,
    } = _a,
    props = __rest(_a, [
      'placeholder',
      'id',
      'value',
      'disabled',
      'size',
      'options',
      'error',
      'popupPosition',
    ]);
  const [activeState, setActive] = useState('default');
  const [selectedValue, setSelectedValue] = useState(value);
  const [isExpanded, setExpanded] = useState(false);
  const {
    disabled: calcDisabled,
    error: calcError,
    handleBlur,
    handleFocus,
  } = useContext(FormControlContext) || {};
  const onBlur = (event) => {
    var _a;
    handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
    setActive('default');
    setExpanded(false);
  };
  // custom event function for backwards compatibility
  const onChange = (event, customSelectValue) => {
    var _a, _b;
    const eventValue = customSelectValue || event.target.value;
    (_a = props.eventOnChange) === null || _a === void 0 ? void 0 : _a.call(props, event);
    (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, eventValue);
    setActive('default');
    setExpanded(false);
    setSelectedValue(eventValue);
  };
  const onFocus = (event) => {
    var _a;
    handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
    setActive('focus');
    setExpanded(true);
  };
  const hasError = calcError || !!error;
  const isDisabled = calcDisabled || disabled;
  const HiddenSelectRef = React.createRef();
  const ariaLabel = props['aria-label'];
  const selectedOption = options.find(
    ({ value: optionValue }) => String(optionValue) === String(selectedValue),
  );
  const isSomethingSelected = !!(selectedValue && selectedOption);
  const theme = useTheme();
  const wrapperRef = React.createRef();
  useEffect(() => {
    const documentClickHandler = (event) => {
      const target = event.target;
      const wrapperNode = wrapperRef.current;
      if (wrapperNode && !wrapperNode.contains(target)) {
        setExpanded(false);
        setActive('default');
      }
    };
    if (isExpanded) {
      document.addEventListener('mouseup', documentClickHandler);
    } else {
      document.removeEventListener('mouseup', documentClickHandler);
    }
    return () => document.removeEventListener('mouseup', documentClickHandler);
  }, [isExpanded]);
  useEffect(() => {
    value === selectedValue || setSelectedValue(value);
  }, [value]);
  const styledInputWrapper = (
    <StyledInputWrapper
      error={hasError}
      ref={wrapperRef}
      size={size}
      style={{ zIndex: 1 }}
      disabled={isDisabled}
      inputState={activeState}
      role="button"
    >
      <Typography
        variant="paragraph"
        color={
          isDisabled
            ? theme.input.textColors.disabled
            : isSomethingSelected || isExpanded
            ? 'black'
            : 'grey'
        }
        css={css`
          flex: 1;
          padding: 0 10px;
          line-height: 0;
        `}
      >
        {(selectedValue && selectedOption ? selectedOption.content : false) || placeholder}
      </Typography>
      <DropdownIcon disabled={isDisabled} theme={theme} />
    </StyledInputWrapper>
  );
  return (
    <div
      className={props.className}
      style={Object.assign({ position: 'relative' }, props.style || {})}
      onClick={(event) => {
        const wrapperNode = wrapperRef.current;
        const target = event.target;
        if (wrapperNode && wrapperNode.contains(target) && isExpanded) {
          setExpanded(false);
        } else if (document.activeElement !== HiddenSelectRef.current) {
          HiddenSelectRef.current.focus();
        }
      }}
    >
      <HiddenSelect
        aria-label={ariaLabel}
        disabled={isDisabled}
        id={id}
        ref={HiddenSelectRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={selectedValue}
      >
        {[{ content: placeholder, disabled: true, value: '' }]
          .concat(options)
          .map(({ content, disabled, value: optionValue }) => (
            <option disabled={disabled} key={optionValue} value={optionValue}>
              {content}
            </option>
          ))}
      </HiddenSelect>

      {props.hintText ? (
        <Tooltip unmountHTMLWhenHide position="bottom" html={<span>{props.hintText}</span>}>
          {styledInputWrapper}
        </Tooltip>
      ) : (
        styledInputWrapper
      )}

      {isExpanded && (
        <OptionsList role="listbox" id={`${id}-options`} className={popupPosition}>
          {options.map(({ content, value: optionValue }) => (
            <Option
              key={optionValue}
              value={optionValue}
              onMouseDown={(event) => {
                onChange(event, optionValue);
              }}
            >
              {content}
            </Option>
          ))}
        </OptionsList>
      )}
    </div>
  );
};
export default Select;
//# sourceMappingURL=index.jsx.map
