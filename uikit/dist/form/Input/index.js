'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.INPUT_PRESETS = void 0;

var _core = require('@emotion/core');

var _css2 = _interopRequireDefault(require('@emotion/css'));

var _react = _interopRequireWildcard(require('react'));

var _Button = _interopRequireDefault(require('../../Button'));

var _Icon = _interopRequireDefault(require('../../Icon'));

var _common = require('../common');

var _styledComponents = require('./styledComponents');

var _FormControlContext = _interopRequireDefault(require('../FormControl/FormControlContext'));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

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

var INPUT_PRESETS = {
  DEFAULT: 'default',
  SEARCH: 'search',
};
exports.INPUT_PRESETS = INPUT_PRESETS;

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1o4oxq0-Uikit-Input',
        styles:
          'display:block;height:20px;width:20px;border:none;background-color:unset;padding:0;margin-right:5px;&:hover{cursor:pointer;}&:hover,&:focus{background-color:unset;};label:Uikit-Input;',
      }
    : {
        name: '1o4oxq0-Uikit-Input',
        styles:
          'display:block;height:20px;width:20px;border:none;background-color:unset;padding:0;margin-right:5px;&:hover{cursor:pointer;}&:hover,&:focus{background-color:unset;};label:Uikit-Input;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2RTJFIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCdXR0b24gZnJvbSAndWlraXQvQnV0dG9uJztcbmltcG9ydCBJY29uIGZyb20gJy4uLy4uL0ljb24nO1xuaW1wb3J0IHsgSU5QVVRfU0laRVMsIFN0eWxlZElucHV0V3JhcHBlciB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBTdHlsZWRJbnB1dCwgSWNvbldyYXBwZXIgfSBmcm9tICcuL3N0eWxlZENvbXBvbmVudHMnO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuaW1wb3J0IGNzcyBmcm9tICdAZW1vdGlvbi9jc3MnO1xuZXhwb3J0IGNvbnN0IElOUFVUX1BSRVNFVFMgPSB7XG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuICAgIFNFQVJDSDogJ3NlYXJjaCcsXG59O1xuY29uc3QgSW5wdXQgPSBSZWFjdC5mb3J3YXJkUmVmKChfYSwgcmVmKSA9PiB7XG4gICAgdmFyIHsgcHJlc2V0ID0gSU5QVVRfUFJFU0VUUy5ERUZBVUxULCB2YWx1ZSA9ICcnLCBvbkNoYW5nZSwgdHlwZSwgc2l6ZTogaW5wdXRTaXplLCBkYXRhU2l6ZSwgcGxhY2Vob2xkZXIgPSBwcmVzZXQgPT09IElOUFVUX1BSRVNFVFMuU0VBUkNIID8gJ1NlYXJjaC4uLicgOiBudWxsLCBpY29uID0gcHJlc2V0ID09PSBJTlBVVF9QUkVTRVRTLlNFQVJDSCA/IDxJY29uIG5hbWU9eydzZWFyY2gnfSBoZWlnaHQ9XCIxNHB4XCIvPiA6IG51bGwsIHNpemUgPSBJTlBVVF9TSVpFUy5TTSwgY2xhc3NOYW1lLCBlcnJvciwgZGlzYWJsZWQsIHNob3dDbGVhciA9IHByZXNldCA9PT0gSU5QVVRfUFJFU0VUUy5TRUFSQ0ggfHwgZmFsc2UsIGdldE92ZXJyaWRlQ3NzIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcInByZXNldFwiLCBcInZhbHVlXCIsIFwib25DaGFuZ2VcIiwgXCJ0eXBlXCIsIFwic2l6ZVwiLCBcImRhdGFTaXplXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJpY29uXCIsIFwic2l6ZVwiLCBcImNsYXNzTmFtZVwiLCBcImVycm9yXCIsIFwiZGlzYWJsZWRcIiwgXCJzaG93Q2xlYXJcIiwgXCJnZXRPdmVycmlkZUNzc1wiXSk7XG4gICAgY29uc3QgeyBkaXNhYmxlZDogY2FsY0Rpc2FibGVkLCBmb2N1c2VkLCBlcnJvcjogY2FsY0Vycm9yLCBoYW5kbGVCbHVyLCBoYW5kbGVGb2N1cyB9ID0gdXNlQ29udGV4dChGb3JtQ29udHJvbENvbnRleHQpIHx8IHt9O1xuICAgIGNvbnN0IFthY3RpdmVTdGF0ZSwgc2V0QWN0aXZlXSA9IHVzZVN0YXRlKGZvY3VzZWQgPyAnZm9jdXMnIDogJ2RlZmF1bHQnKTtcbiAgICBjb25zdCBoYXNFcnJvciA9IGNhbGNFcnJvciB8fCAhIWVycm9yO1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBjYWxjRGlzYWJsZWQgfHwgZGlzYWJsZWQ7XG4gICAgY29uc3Qgb25CbHVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc2V0QWN0aXZlKCdkZWZhdWx0Jyk7XG4gICAgICAgIGhhbmRsZUJsdXIgPT09IG51bGwgfHwgaGFuZGxlQmx1ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZGxlQmx1cigpO1xuICAgICAgICAoX2EgPSBwcm9wcy5vbkJsdXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHByb3BzLCBldmVudCk7XG4gICAgfTtcbiAgICBjb25zdCBvbkNsZWFyQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgIG9uQ2hhbmdlKGUpO1xuICAgIH07XG4gICAgY29uc3Qgb25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHNldEFjdGl2ZSgnZm9jdXMnKTtcbiAgICAgICAgaGFuZGxlRm9jdXMgPT09IG51bGwgfHwgaGFuZGxlRm9jdXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUZvY3VzKCk7XG4gICAgICAgIChfYSA9IHByb3BzLm9uRm9jdXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHByb3BzLCBldmVudCk7XG4gICAgfTtcbiAgICBjb25zdCBpbnB1dFJlZiA9IChyZWYgfHwgUmVhY3QuY3JlYXRlUmVmKCkpO1xuICAgIGNvbnN0IGNsZWFyQnV0dG9uUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgPFN0eWxlZElucHV0V3JhcHBlciBzaXplPXtzaXplfSBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiBlLnRhcmdldCAhPT0gKGNsZWFyQnV0dG9uUmVmID09PSBudWxsIHx8IGNsZWFyQnV0dG9uUmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbGVhckJ1dHRvblJlZi5jdXJyZW50KSlcbiAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9fSBvbkZvY3VzPXsoZSkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlOiBUeXBlU2NyaXB0IHdyb25nbHkgdGhyb3dzIGVycm9yIGJlY2F1c2UgdGhlIHdyYXBwZXIgaXMgYSBkaXYsIGJ1dCBpdCBjb250YWlucyBhIGJ1dHRvblxuICAgICAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiBlLnRhcmdldCAhPT0gKGNsZWFyQnV0dG9uUmVmID09PSBudWxsIHx8IGNsZWFyQnV0dG9uUmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbGVhckJ1dHRvblJlZi5jdXJyZW50KSlcbiAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9fSBzdHlsZT17eyBjdXJzb3I6ICd0ZXh0JyB9fSBlcnJvcj17aGFzRXJyb3J9IGRpc2FibGVkPXtpc0Rpc2FibGVkfSBpbnB1dFN0YXRlPXthY3RpdmVTdGF0ZX0gZ2V0T3ZlcnJpZGVDc3M9e2dldE92ZXJyaWRlQ3NzfT5cbiAgICAgICAgICB7aWNvbiAmJiA8SWNvbldyYXBwZXI+e2ljb259PC9JY29uV3JhcHBlcj59XG4gICAgICAgICAgPFN0eWxlZElucHV0IGFyaWEtbGFiZWw9e3Byb3BzWydhcmlhLWxhYmVsJ119IHBsYWNlaG9sZGVyPXtpc0Rpc2FibGVkID8gJycgOiBwbGFjZWhvbGRlcn0gdmFsdWU9e3ZhbHVlfSB0eXBlPXt0eXBlfSBvbkJsdXI9e29uQmx1cn0gb25DaGFuZ2U9e29uQ2hhbmdlfSBvbkZvY3VzPXtvbkZvY3VzfSBpbnB1dFNpemU9e2lucHV0U2l6ZX0gc2l6ZT17ZGF0YVNpemV9IGRpc2FibGVkPXtpc0Rpc2FibGVkfSBpZD17cHJvcHMuaWR9IHJlZj17aW5wdXRSZWZ9Lz5cbiAgICAgICAgICB7c2hvd0NsZWFyICYmIHZhbHVlICYmIFN0cmluZyh2YWx1ZSkubGVuZ3RoICYmICg8QnV0dG9uIGNzcz17Y3NzIGBcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHVuc2V0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICY6aG92ZXIsXG4gICAgICAgICAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB1bnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGB9IG9uQ2xpY2s9e29uQ2xlYXJDbGlja30gdHlwZT1cImJ1dHRvblwiIHJlZj17Y2xlYXJCdXR0b25SZWZ9IGFyaWEtbGFiZWw9XCJDbGVhciB0ZXh0XCI+XG4gICAgICAgICAgICAgIDxJY29uIHRpdGxlPVwiQ2xlYXJcIiBuYW1lPVwidGltZXNfY2lyY2xlXCIgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMjBweFwiIGZpbGw9XCJncmV5XzFcIi8+XG4gICAgICAgICAgICA8L0J1dHRvbj4pfVxuICAgICAgICA8L1N0eWxlZElucHV0V3JhcHBlcj5cbiAgICAgIDwvZGl2Pik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var Input = /*#__PURE__*/ _react['default'].forwardRef(function (_a, ref) {
  var _a$preset = _a.preset,
    preset = _a$preset === void 0 ? INPUT_PRESETS.DEFAULT : _a$preset,
    _a$value = _a.value,
    value = _a$value === void 0 ? '' : _a$value,
    onChange = _a.onChange,
    type = _a.type,
    inputSize = _a.size,
    dataSize = _a.dataSize,
    _a$placeholder = _a.placeholder,
    placeholder =
      _a$placeholder === void 0
        ? preset === INPUT_PRESETS.SEARCH
          ? 'Search...'
          : null
        : _a$placeholder,
    _a$icon = _a.icon,
    icon =
      _a$icon === void 0
        ? preset === INPUT_PRESETS.SEARCH
          ? (0, _core.jsx)(_Icon['default'], {
              name: 'search',
              height: '14px',
            })
          : null
        : _a$icon,
    _a$size = _a.size,
    size = _a$size === void 0 ? _common.INPUT_SIZES.SM : _a$size,
    className = _a.className,
    error = _a.error,
    disabled = _a.disabled,
    _a$showClear = _a.showClear,
    showClear = _a$showClear === void 0 ? preset === INPUT_PRESETS.SEARCH || false : _a$showClear,
    getOverrideCss = _a.getOverrideCss,
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

  var _ref2 = (0, _react.useContext)(_FormControlContext['default']) || {},
    calcDisabled = _ref2.disabled,
    focused = _ref2.focused,
    calcError = _ref2.error,
    handleBlur = _ref2.handleBlur,
    handleFocus = _ref2.handleFocus;

  var _useState = (0, _react.useState)(focused ? 'focus' : 'default'),
    activeState = _useState[0],
    setActive = _useState[1];

  var hasError = calcError || !!error;
  var isDisabled = calcDisabled || disabled;

  var onBlur = function onBlur(event) {
    var _a;

    setActive('default');
    handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };

  var onClearClick = function onClearClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.value = '';
    onChange(e);
  };

  var onFocus = function onFocus(event) {
    var _a;

    setActive('focus');
    handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };

  var inputRef = ref || /*#__PURE__*/ _react['default'].createRef();

  var clearButtonRef = /*#__PURE__*/ _react['default'].createRef();

  return (0, _core.jsx)(
    'div',
    {
      className: className,
    },
    (0, _core.jsx)(
      _common.StyledInputWrapper,
      {
        size: size,
        onClick: function onClick(e) {
          if (
            inputRef.current &&
            e.target !==
              (clearButtonRef === null || clearButtonRef === void 0
                ? void 0
                : clearButtonRef.current)
          )
            inputRef.current.focus();
        },
        onFocus: function onFocus(e) {
          // @ts-ignore: TypeScript wrongly throws error because the wrapper is a div, but it contains a button
          if (
            inputRef.current &&
            e.target !==
              (clearButtonRef === null || clearButtonRef === void 0
                ? void 0
                : clearButtonRef.current)
          )
            inputRef.current.focus();
        },
        style: {
          cursor: 'text',
        },
        error: hasError,
        disabled: isDisabled,
        inputState: activeState,
        getOverrideCss: getOverrideCss,
      },
      icon && (0, _core.jsx)(_styledComponents.IconWrapper, null, icon),
      (0, _core.jsx)(_styledComponents.StyledInput, {
        'aria-label': props['aria-label'],
        placeholder: isDisabled ? '' : placeholder,
        value: value,
        type: type,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        inputSize: inputSize,
        size: dataSize,
        disabled: isDisabled,
        id: props.id,
        ref: inputRef,
      }),
      showClear &&
        value &&
        String(value).length &&
        (0, _core.jsx)(
          _Button['default'],
          {
            css: _ref,
            onClick: onClearClick,
            type: 'button',
            ref: clearButtonRef,
            'aria-label': 'Clear text',
          },
          (0, _core.jsx)(_Icon['default'], {
            title: 'Clear',
            name: 'times_circle',
            width: '20px',
            height: '20px',
            fill: 'grey_1',
          }),
        ),
    ),
  );
});

var _default = Input;
exports['default'] = _default;
