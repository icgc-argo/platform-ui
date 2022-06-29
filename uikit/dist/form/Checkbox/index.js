'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.StyledCheckbox = exports.STYLEDCHECKBOX_SIZES = void 0;

var _core = require('@emotion/core');

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _react = _interopRequireDefault(require('react'));

var __jsx = _react['default'].createElement;

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
  (void 0 && (void 0).__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

var STYLEDCHECKBOX_SIZES = Object.freeze({
  SM: 'sm',
  MD: 'md',
});
exports.STYLEDCHECKBOX_SIZES = STYLEDCHECKBOX_SIZES;
var StyledCheckbox = /*#__PURE__*/ (0, _styledBase['default'])('div', {
  target: 'e1qsvi800',
  label: 'Uikit-StyledCheckbox',
})(
  'position:relative;cursor:pointer;width:min-content;input{margin:0;position:absolute;top:0;opacity:0;pointer-events:none;}input:checked + .checkbox{&:before{transform:rotate(-45deg) scale(1,1);}&:after{background:',
  function (_ref) {
    var theme = _ref.theme,
      disabled = _ref.disabled,
      color = _ref.color;
    return disabled
      ? theme.radiocheckbox.radio.disabled
      : color
      ? color
      : theme.radiocheckbox.radio.checked;
  },
  ";}}.checkbox{display:flex;flex-direction:row;align-items:center;&:before{transition:transform 0.2s ease-in;transform:rotate(-45deg) scale(0,0);content:'';position:absolute;top:",
  function (_ref2) {
    var theme = _ref2.theme,
      size = _ref2.size;
    return theme.checkbox.checkTopPositions[size];
  },
  ';left:',
  function (_ref3) {
    var theme = _ref3.theme,
      size = _ref3.size;
    return theme.checkbox.checkLeftPositions[size];
  },
  ';z-index:1;width:',
  function (_ref4) {
    var theme = _ref4.theme,
      size = _ref4.size;
    return theme.checkbox.checkWidths[size];
  },
  ';height:',
  function (_ref5) {
    var theme = _ref5.theme,
      size = _ref5.size;
    return theme.checkbox.checkHeights[size];
  },
  ";border:2px solid white;border-top-style:none;border-right-style:none;}&:after{display:inline-block;transition:background-color 0.2s ease-in;cursor:pointer;content:'';width:",
  function (_ref6) {
    var theme = _ref6.theme,
      size = _ref6.size;
    return theme.checkbox.boxWidths[size];
  },
  ';height:',
  function (_ref7) {
    var theme = _ref7.theme,
      size = _ref7.size;
    return theme.checkbox.boxHeights[size];
  },
  ';background-color:',
  function (_ref8) {
    var theme = _ref8.theme,
      disabled = _ref8.disabled;
    return theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : 'default'];
  },
  ';border:1px solid ',
  function (_ref9) {
    var theme = _ref9.theme,
      checked = _ref9.checked,
      disabled = _ref9.disabled,
      color = _ref9.color;

    if (disabled) {
      return theme.radiocheckbox.radio.disabled;
    } else if (checked && !disabled) {
      return color ? color : theme.radiocheckbox.radio.checked;
    } else {
      return theme.radiocheckbox.radio['default'];
    }
  },
  ';border-radius:2px;}}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQzRDIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5leHBvcnQgY29uc3QgU1RZTEVEQ0hFQ0tCT1hfU0laRVMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBTTTogJ3NtJyxcbiAgICBNRDogJ21kJyxcbn0pO1xuZXhwb3J0IGNvbnN0IFN0eWxlZENoZWNrYm94ID0gc3R5bGVkKCdkaXYnKSBgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aWR0aDogbWluLWNvbnRlbnQ7XG5cbiAgaW5wdXQge1xuICAgIG1hcmdpbjogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cblxuICBpbnB1dDpjaGVja2VkICsgLmNoZWNrYm94IHtcbiAgICAmOmJlZm9yZSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEsIDEpO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHsoeyB0aGVtZSwgZGlzYWJsZWQsIGNvbG9yIH0pID0+IGRpc2FibGVkXG4gICAgPyB0aGVtZS5yYWRpb2NoZWNrYm94LnJhZGlvLmRpc2FibGVkXG4gICAgOiBjb2xvclxuICAgICAgICA/IGNvbG9yXG4gICAgICAgIDogdGhlbWUucmFkaW9jaGVja2JveC5yYWRpby5jaGVja2VkfTtcbiAgICB9XG4gIH1cblxuICAuY2hlY2tib3gge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgJjpiZWZvcmUge1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1pbjtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZykgc2NhbGUoMCwgMCk7XG5cbiAgICAgIGNvbnRlbnQ6ICcnO1xuXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6ICR7KHsgdGhlbWUsIHNpemUgfSkgPT4gdGhlbWUuY2hlY2tib3guY2hlY2tUb3BQb3NpdGlvbnNbc2l6ZV19O1xuICAgICAgbGVmdDogJHsoeyB0aGVtZSwgc2l6ZSB9KSA9PiB0aGVtZS5jaGVja2JveC5jaGVja0xlZnRQb3NpdGlvbnNbc2l6ZV19O1xuICAgICAgei1pbmRleDogMTtcblxuICAgICAgd2lkdGg6ICR7KHsgdGhlbWUsIHNpemUgfSkgPT4gdGhlbWUuY2hlY2tib3guY2hlY2tXaWR0aHNbc2l6ZV19O1xuICAgICAgaGVpZ2h0OiAkeyh7IHRoZW1lLCBzaXplIH0pID0+IHRoZW1lLmNoZWNrYm94LmNoZWNrSGVpZ2h0c1tzaXplXX07XG5cbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xuICAgICAgYm9yZGVyLXRvcC1zdHlsZTogbm9uZTtcbiAgICAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcbiAgICB9XG5cbiAgICAmOmFmdGVyIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlLWluO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29udGVudDogJyc7XG5cbiAgICAgIHdpZHRoOiAkeyh7IHRoZW1lLCBzaXplIH0pID0+IHRoZW1lLmNoZWNrYm94LmJveFdpZHRoc1tzaXplXX07XG4gICAgICBoZWlnaHQ6ICR7KHsgdGhlbWUsIHNpemUgfSkgPT4gdGhlbWUuY2hlY2tib3guYm94SGVpZ2h0c1tzaXplXX07XG5cbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7KHsgdGhlbWUsIGRpc2FibGVkIH0pID0+IHRoZW1lLnJhZGlvY2hlY2tib3guYmFja2dyb3VuZENvbG9yc1tkaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnZGVmYXVsdCddfTtcblxuICAgICAgYm9yZGVyOiAxcHggc29saWRcbiAgICAgICAgJHsoeyB0aGVtZSwgY2hlY2tlZCwgZGlzYWJsZWQsIGNvbG9yIH0pID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoZW1lLnJhZGlvY2hlY2tib3gucmFkaW8uZGlzYWJsZWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNoZWNrZWQgJiYgIWRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBjb2xvciA/IGNvbG9yIDogdGhlbWUucmFkaW9jaGVja2JveC5yYWRpby5jaGVja2VkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoZW1lLnJhZGlvY2hlY2tib3gucmFkaW8uZGVmYXVsdDtcbiAgICB9XG59fTtcblxuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIH1cbiAgfVxuYDtcbi8qXG4gKiBCYXNpYyBjaGVja2JveCBpbnB1dFxuICovXG5jb25zdCBDaGVja2JveCA9IChfYSkgPT4ge1xuICAgIHZhciB7IGNoZWNrZWQgPSBmYWxzZSwgZGlzYWJsZWQgPSBmYWxzZSwgZm9yd2FyZGVkUmVmcywgaWQsIG9uQmx1ciwgb25DaGFuZ2UsIG9uRm9jdXMsICdhcmlhLWxhYmVsJzogYXJpYUxhYmVsLCB2YWx1ZSwgY29sb3IsIHNpemUgPSBTVFlMRURDSEVDS0JPWF9TSVpFUy5NRCB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJjaGVja2VkXCIsIFwiZGlzYWJsZWRcIiwgXCJmb3J3YXJkZWRSZWZzXCIsIFwiaWRcIiwgXCJvbkJsdXJcIiwgXCJvbkNoYW5nZVwiLCBcIm9uRm9jdXNcIiwgJ2FyaWEtbGFiZWwnLCBcInZhbHVlXCIsIFwiY29sb3JcIiwgXCJzaXplXCJdKTtcbiAgICBjb25zdCBjaGVja2JveFJlZiA9IChmb3J3YXJkZWRSZWZzID09PSBudWxsIHx8IGZvcndhcmRlZFJlZnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZvcndhcmRlZFJlZnNbMF0pIHx8IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgIGNvbnN0IEhpZGRlbkNoZWNrYm94UmVmID0gKGZvcndhcmRlZFJlZnMgPT09IG51bGwgfHwgZm9yd2FyZGVkUmVmcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZm9yd2FyZGVkUmVmc1sxXSkgfHwgUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgcmV0dXJuICg8U3R5bGVkQ2hlY2tib3ggZGF0YS12YWx1ZT17dmFsdWV9IGNoZWNrZWQ9e2NoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gY29sb3I9e2NvbG9yfSBzaXplPXtzaXplfT5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWY9e0hpZGRlbkNoZWNrYm94UmVmfSBjaGVja2VkPXtjaGVja2VkfSBkaXNhYmxlZD17ZGlzYWJsZWR9IGlkPXtpZH0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25Gb2N1cz17b25Gb2N1c30gYXJpYS1sYWJlbD17YXJpYUxhYmVsfSB2YWx1ZT17dmFsdWV9Lz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIiBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gSGlkZGVuQ2hlY2tib3hSZWYuY3VycmVudCAmJiBIaWRkZW5DaGVja2JveFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBIaWRkZW5DaGVja2JveFJlZi5jdXJyZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9fSByZWY9e2NoZWNrYm94UmVmfS8+XG4gICAgPC9TdHlsZWRDaGVja2JveD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
);
/*
 * Basic checkbox input
 */

exports.StyledCheckbox = StyledCheckbox;

var Checkbox = function Checkbox(_a) {
  var _a$checked = _a.checked,
    checked = _a$checked === void 0 ? false : _a$checked,
    _a$disabled = _a.disabled,
    disabled = _a$disabled === void 0 ? false : _a$disabled,
    forwardedRefs = _a.forwardedRefs,
    id = _a.id,
    onBlur = _a.onBlur,
    onChange = _a.onChange,
    onFocus = _a.onFocus,
    ariaLabel = _a['aria-label'],
    value = _a.value,
    color = _a.color,
    _a$size = _a.size,
    size = _a$size === void 0 ? STYLEDCHECKBOX_SIZES.MD : _a$size,
    props = __rest(_a, [
      'checked',
      'disabled',
      'forwardedRefs',
      'id',
      'onBlur',
      'onChange',
      'onFocus',
      'aria-label',
      'value',
      'color',
      'size',
    ]);

  var checkboxRef =
    (forwardedRefs === null || forwardedRefs === void 0 ? void 0 : forwardedRefs[0]) ||
    /*#__PURE__*/ _react['default'].createRef();

  var HiddenCheckboxRef =
    (forwardedRefs === null || forwardedRefs === void 0 ? void 0 : forwardedRefs[1]) ||
    /*#__PURE__*/ _react['default'].createRef();

  return (0, _core.jsx)(
    StyledCheckbox,
    {
      'data-value': value,
      checked: checked,
      disabled: disabled,
      color: color,
      size: size,
    },
    (0, _core.jsx)('input', {
      type: 'checkbox',
      ref: HiddenCheckboxRef,
      checked: checked,
      disabled: disabled,
      id: id,
      onBlur: onBlur,
      onChange: onChange,
      onFocus: onFocus,
      'aria-label': ariaLabel,
      value: value,
    }),
    (0, _core.jsx)('div', {
      className: 'checkbox',
      onClick: function onClick(event) {
        if (event.target !== HiddenCheckboxRef.current && HiddenCheckboxRef.current) {
          HiddenCheckboxRef.current.click();
        }
      },
      ref: checkboxRef,
    }),
  );
};

var _default = Checkbox;
exports['default'] = _default;
