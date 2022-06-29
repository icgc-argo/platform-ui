'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireDefault(require('react'));

var _FormControlContext = _interopRequireDefault(require('./FormControlContext'));

var __jsx = _react['default'].createElement;

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

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

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'dyplte-Uikit-FormControl',
        styles: 'margin-bottom:10px;;label:Uikit-FormControl;',
      }
    : {
        name: 'dyplte-Uikit-FormControl',
        styles: 'margin-bottom:10px;;label:Uikit-FormControl;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRG9DIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBGb3JtQ29udHJvbENvbnRleHQgZnJvbSAnLi9Gb3JtQ29udHJvbENvbnRleHQnO1xuY29uc3QgRm9ybUNvbnRyb2wgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIEZvcm1Db250cm9sKF9hLCByZWYpIHtcbiAgICB2YXIgeyBjb21wb25lbnQ6IENvbXBvbmVudCA9ICdkaXYnLCBkaXNhYmxlZCA9IGZhbHNlLCBlcnJvciA9IGZhbHNlLCByZXF1aXJlZCA9IGZhbHNlIH0gPSBfYSwgb3RoZXIgPSBfX3Jlc3QoX2EsIFtcImNvbXBvbmVudFwiLCBcImRpc2FibGVkXCIsIFwiZXJyb3JcIiwgXCJyZXF1aXJlZFwiXSk7XG4gICAgY29uc3QgW2ZvY3VzZWQsIHNldEZvY3VzZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IGNoaWxkQ29udGV4dCA9IHtcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgIGVycm9yLFxuICAgICAgICByZXF1aXJlZCxcbiAgICAgICAgZm9jdXNlZCxcbiAgICAgICAgaGFuZGxlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgICAgIHNldEZvY3VzZWQodHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZUJsdXI6ICgpID0+IHtcbiAgICAgICAgICAgIHNldEZvY3VzZWQoZmFsc2UpO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuICg8Rm9ybUNvbnRyb2xDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtjaGlsZENvbnRleHR9PlxuICAgICAgPENvbXBvbmVudCByZWY9e3JlZn0gY3NzPXtjc3MgYFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIGB9IHsuLi5vdGhlcn0vPlxuICAgIDwvRm9ybUNvbnRyb2xDb250ZXh0LlByb3ZpZGVyPik7XG59KTtcbkZvcm1Db250cm9sLmRpc3BsYXlOYW1lID0gJ0Zvcm1Db250cm9sJztcbmV4cG9ydCBkZWZhdWx0IEZvcm1Db250cm9sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var FormControl = /*#__PURE__*/ _react['default'].forwardRef(function FormControl(_a, ref) {
  var _a$component = _a.component,
    Component = _a$component === void 0 ? 'div' : _a$component,
    _a$disabled = _a.disabled,
    disabled = _a$disabled === void 0 ? false : _a$disabled,
    _a$error = _a.error,
    error = _a$error === void 0 ? false : _a$error,
    _a$required = _a.required,
    required = _a$required === void 0 ? false : _a$required,
    other = __rest(_a, ['component', 'disabled', 'error', 'required']);

  var _React$useState = _react['default'].useState(false),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];

  var childContext = {
    disabled: disabled,
    error: error,
    required: required,
    focused: focused,
    handleFocus: function handleFocus() {
      setFocused(true);
    },
    handleBlur: function handleBlur() {
      setFocused(false);
    },
  };
  return (0, _core.jsx)(
    _FormControlContext['default'].Provider,
    {
      value: childContext,
    },
    (0, _core.jsx)(
      Component,
      (0, _extends2['default'])(
        {
          ref: ref,
          css: _ref,
        },
        other,
      ),
    ),
  );
});

FormControl.displayName = 'FormControl';
var _default = FormControl;
exports['default'] = _default;
