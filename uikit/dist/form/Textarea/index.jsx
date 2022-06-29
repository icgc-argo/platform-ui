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
import React, { useState, useContext, useCallback, useEffect } from 'react';
import css from '@emotion/css';
import clsx from 'clsx';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import FormControlContext from '../FormControl/FormControlContext';
import { CountLabels } from './types';
const LINE_JUMP_PLACEHOLDER = ' øö ';
const Textarea = (_a) => {
  var {
      className,
      countDirection = 'asc',
      countLimit = 0,
      countPosition = 'right',
      countType = 'chars',
      focused: propsFocused, // so it's not passed to the html element
      onChange: propsOnChange,
      truncate,
      value = '',
    } = _a,
    props = __rest(_a, [
      'className',
      'countDirection',
      'countLimit',
      'countPosition',
      'countType',
      'focused',
      'onChange',
      'truncate',
      'value',
    ]);
  const [currentCount, setCurrentCount] = useState(0);
  const [internalValue, setInternalValue] = useState(value);
  const { disabled, error, focused, handleBlur, handleFocus } =
    useContext(FormControlContext) || {};
  const theme = useTheme();
  const hasOverflowed = countLimit && countLimit - currentCount < 0;
  const hasError = error || !!props.error || hasOverflowed;
  const isDisabled = disabled || props.disabled;
  const isFocused = focused || propsFocused;
  const countAlignment = countPosition.replace('absolute', '').trim() || 'right';
  const isAscending = countDirection === 'asc';
  const onBlur = (event) => {
    var _a;
    handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };
  const onFocus = (event) => {
    var _a;
    handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };
  const getCount = useCallback(
    (newCount) => (isAscending ? newCount : countLimit - newCount),
    [countLimit, isAscending],
  );
  const applyChanges = useCallback(
    (targetValue) => {
      if (countLimit === 0) {
        // without count limit, we don't care: just update the value as is
        setInternalValue(targetValue);
      } else {
        switch (countType) {
          case 'words': {
            // use a placeholder for line breaks, so we can respect white space on display
            const wordArray = targetValue.replace(/\n/g, LINE_JUMP_PLACEHOLDER).split(/\s/g);
            // discount the following exceptions as non-words:
            const empties = wordArray.filter(
              (x) =>
                !x || // empty spaces
                x === LINE_JUMP_PLACEHOLDER.trim() || // line breaks (placeholder)
                !x.match(/[a-zA-Z0-9]+/g),
            ).length;
            const newWordArray = truncate ? wordArray.slice(0, countLimit + empties) : wordArray;
            const wordCount = getCount(newWordArray.length - empties);
            const newValue = newWordArray.join(' ').replaceAll(LINE_JUMP_PLACEHOLDER, '\n');
            if (truncate && wordCount === countLimit) {
              setInternalValue(newValue.trim());
              setCurrentCount(countLimit);
            } else {
              setInternalValue(newValue);
              setCurrentCount(wordCount);
            }
            break;
          }
          default: {
            // Characters as default
            const newValue = truncate ? targetValue.slice(0, countLimit) : targetValue;
            setInternalValue(newValue);
            setCurrentCount(getCount(newValue.length));
            break;
          }
        }
      }
    },
    [countLimit, propsOnChange, truncate],
  );
  const handleChange = (event) => {
    // normalise line breaks
    let targetValue = event.target.value.replace(/(\r\n|\r|\n)/g, '\n');
    applyChanges(targetValue);
    propsOnChange === null || propsOnChange === void 0 ? void 0 : propsOnChange(event);
  };
  useEffect(() => {
    value && applyChanges(value);
  }, []);
  return (
    <div
      className="TextareaWrapper"
      css={css`
        position: relative;
      `}
    >
      <textarea
        {...props}
        className={clsx({ error: hasError, disabled: isDisabled, focused: isFocused }, className)}
        css={css`
          ${css(theme.typography.paragraph)};
          resize: vertical;
          width: 100%;
          box-sizing: border-box;
          padding: 8px 10px;
          border: 1px solid;
          border-radius: 8px;
          border-color: ${theme.input.borderColors.default};
          background-color: ${theme.input.colors.default};

          &:hover {
            border-color: ${theme.input.borderColors.hover} !important;
          }

          &.focused,
          &:focus {
            outline: 0;
            border-color: ${theme.input.borderColors.focus};
            box-shadow: 0px 0px 4px 0px ${theme.colors.secondary_1};
          }

          &.error {
            border-color: ${theme.input.borderColors.error};
          }

          &.disabled {
            border-color: ${theme.input.borderColors.disabled};
            background-color: ${theme.input.colors.disabled};
            color: ${theme.input.colors.grey};
            &:hover {
              border-color: #d0d1d8 !important;
            }
          }
        `}
        disabled={isDisabled}
        id={props.id}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        value={internalValue}
      />

      {countLimit > 0 && Object.keys(CountLabels).includes(countType) && (
        <Typography
          color={hasOverflowed ? 'error' : 'grey'}
          css={css`
            margin: 0;
            ${countPosition.includes('absolute')
              ? `
                position: absolute;
                ${countAlignment}: 6px;
              `
              : `text-align: ${countAlignment};`}

            .currentCount {
              margin-right: 2px;
            }
            .countLimit {
              margin-left: 2px;
            }
          `}
        >
          <span className="currentCount">{currentCount}</span>/
          <span className="countLimit">{countLimit}</span>{' '}
          <span className="countLabel">{CountLabels[countType]}</span>
        </Typography>
      )}
    </div>
  );
};
Textarea.displayName = 'Textarea';
export default Textarea;
//# sourceMappingURL=index.jsx.map
