'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.StyledRadio = void 0;

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

var StyledRadio = /*#__PURE__*/ (0, _styledBase['default'])('div', {
  target: 'e145dwlt0',
  label: 'Uikit-StyledRadio',
})(
  "position:relative;cursor:pointer;display:flex;flex-direction:row;align-items:center;input{position:absolute;margin:0;top:0;opacity:0;pointer-events:none;}input:checked + .radio:before{transform:scale(1);}.radio{display:flex;flex-direction:row;align-items:center;&:before{content:'';position:absolute;z-index:1;border-radius:9999px;top:4px;left:4px;width:10px;height:10px;background:",
  function (_ref) {
    var theme = _ref.theme,
      disabled = _ref.disabled;
    return theme.radiocheckbox.radio[disabled ? 'disabled' : 'checked'];
  },
  ";transform:scale(0,0);transition:transform 0.2s ease-in;}&:after{content:'';border-radius:9999px;display:inline-block;width:16px;height:16px;border:1px solid ",
  function (_ref2) {
    var theme = _ref2.theme,
      disabled = _ref2.disabled,
      checked = _ref2.checked;
    return theme.radiocheckbox.radio[disabled && !checked ? 'disabled' : 'default'];
  },
  ';}}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQnlDIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5leHBvcnQgY29uc3QgU3R5bGVkUmFkaW8gPSBzdHlsZWQoJ2RpdicpIGBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgaW5wdXQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDA7XG4gICAgdG9wOiAwO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cblxuICBpbnB1dDpjaGVja2VkICsgLnJhZGlvOmJlZm9yZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuXG4gIC5yYWRpbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgICBib3JkZXItcmFkaXVzOiA5OTk5cHg7XG5cbiAgICAgIHRvcDogNHB4O1xuICAgICAgbGVmdDogNHB4O1xuXG4gICAgICB3aWR0aDogMTBweDtcbiAgICAgIGhlaWdodDogMTBweDtcblxuICAgICAgYmFja2dyb3VuZDogJHsoeyB0aGVtZSwgZGlzYWJsZWQgfSkgPT4gdGhlbWUucmFkaW9jaGVja2JveC5yYWRpb1tkaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnY2hlY2tlZCddfTtcblxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLCAwKTtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UtaW47XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG5cbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkXG4gICAgICAgICR7KHsgdGhlbWUsIGRpc2FibGVkLCBjaGVja2VkIH0pID0+IHRoZW1lLnJhZGlvY2hlY2tib3gucmFkaW9bZGlzYWJsZWQgJiYgIWNoZWNrZWQgPyAnZGlzYWJsZWQnIDogJ2RlZmF1bHQnXX07XG4gICAgfVxuICB9XG5gO1xuLyoqXG4gKiBSYWRpbyBpbnB1dFxuICogOjpiZWZvcmUgLSBjaGVja2VkIGRvdFxuICogOjphZnRlciAtIGNpcmNsZSBvdXRsaW5lXG4gKi9cbmNvbnN0IFJhZGlvID0gKF9hKSA9PiB7XG4gICAgdmFyIHsgZGlzYWJsZWQgPSBmYWxzZSwgY2hlY2tlZCwgb25DaGFuZ2UsICdhcmlhLWxhYmVsJzogYXJpYUxhYmVsIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcImRpc2FibGVkXCIsIFwiY2hlY2tlZFwiLCBcIm9uQ2hhbmdlXCIsICdhcmlhLWxhYmVsJ10pO1xuICAgIGNvbnN0IEhpZGRlblJhZGlvUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgcmV0dXJuICg8U3R5bGVkUmFkaW8gcm9sZT1cInJhZGlvXCIgZGlzYWJsZWQ9e2Rpc2FibGVkfSBjaGVja2VkPXtjaGVja2VkfSBhcmlhLWNoZWNrZWQ9e2NoZWNrZWR9PlxuICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHJlZj17SGlkZGVuUmFkaW9SZWZ9IGNoZWNrZWQ9e2NoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gYXJpYS1sYWJlbD17YXJpYUxhYmVsfSBvbkNoYW5nZT17b25DaGFuZ2V9Lz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmFkaW9cIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gSGlkZGVuUmFkaW9SZWYuY3VycmVudCAmJiBIaWRkZW5SYWRpb1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBIaWRkZW5SYWRpb1JlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9fS8+XG4gICAgPC9TdHlsZWRSYWRpbz4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IFJhZGlvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
);
/**
 * Radio input
 * ::before - checked dot
 * ::after - circle outline
 */

exports.StyledRadio = StyledRadio;

var Radio = function Radio(_a) {
  var _a$disabled = _a.disabled,
    disabled = _a$disabled === void 0 ? false : _a$disabled,
    checked = _a.checked,
    onChange = _a.onChange,
    ariaLabel = _a['aria-label'],
    props = __rest(_a, ['disabled', 'checked', 'onChange', 'aria-label']);

  var HiddenRadioRef = /*#__PURE__*/ _react['default'].createRef();

  return (0, _core.jsx)(
    StyledRadio,
    {
      role: 'radio',
      disabled: disabled,
      checked: checked,
      'aria-checked': checked,
    },
    (0, _core.jsx)('input', {
      type: 'radio',
      ref: HiddenRadioRef,
      checked: checked,
      disabled: disabled,
      'aria-label': ariaLabel,
      onChange: onChange,
    }),
    (0, _core.jsx)('div', {
      className: 'radio',
      onClick: function onClick(e) {
        if (document.activeElement !== HiddenRadioRef.current && HiddenRadioRef.current) {
          HiddenRadioRef.current.focus();
        }
      },
    }),
  );
};

var _default = Radio;
exports['default'] = _default;
