'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var React = _interopRequireWildcard(require('react'));

var _reactTippy = require('react-tippy');

var _useTheme = _interopRequireDefault(require('../utils/useTheme'));

var _lodash = require('lodash');

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

var __jsx = React.createElement;

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
  }; // @flow

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '15dwzqf-Uikit-Tooltip',
        styles: '.tippy-popper .leave{opacity:0;};label:Uikit-Tooltip;',
      }
    : {
        name: '15dwzqf-Uikit-Tooltip',
        styles: '.tippy-popper .leave{opacity:0;};label:Uikit-Tooltip;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRzBCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbi8vIEBmbG93XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IFRvb2x0aXAgYXMgUmVhY3RUaXBweSB9IGZyb20gJ3JlYWN0LXRpcHB5JztcbmltcG9ydCB1c2VUaGVtZSBmcm9tICcuLi91dGlscy91c2VUaGVtZSc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoJztcbmNvbnN0IFRvb2x0aXAgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGh0bWwsIHBvc2l0aW9uID0gJ3RvcCcsIGFycm93ID0gdHJ1ZSB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcImNsYXNzTmFtZVwiLCBcImh0bWxcIiwgXCJwb3NpdGlvblwiLCBcImFycm93XCJdKTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3QgYXJyb3dTdHlsZXMgPSB7XG4gICAgICAgIHRvcDogYFxuICAgICAgcmlnaHQ6IDUwJTtcbiAgICAgIHRvcDogMTAwJTtcbiAgICAgIGJvcmRlci10b3AtY29sb3I6ICR7dGhlbWUuY29sb3JzLnByaW1hcnlfMX07XG4gICAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW4tcmlnaHQ6IC01cHg7XG4gICAgYCxcbiAgICAgICAgbGVmdDogYFxuICAgICAgYm90dG9tOiA1MCU7XG4gICAgICBsZWZ0OiAxMDAlO1xuICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhlbWUuY29sb3JzLnByaW1hcnlfMX07XG4gICAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItdG9wOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiAtNXB4O1xuICAgIGAsXG4gICAgICAgIGJvdHRvbTogYFxuICAgICAgbGVmdDogNTAlO1xuICAgICAgYm90dG9tOiAxMDAlO1xuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHt0aGVtZS5jb2xvcnMucHJpbWFyeV8xfTtcbiAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICAgIGAsXG4gICAgICAgIHJpZ2h0OiBgXG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHJpZ2h0OiAxMDAlO1xuICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAke3RoZW1lLmNvbG9ycy5wcmltYXJ5XzF9O1xuICAgICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgbWFyZ2luLXRvcDogLTVweDtcbiAgICBgLFxuICAgIH07XG4gICAgY29uc3QgVG9vbHRpcENvbnRhaW5lciA9IHN0eWxlZCgnZGl2JykgYFxuICAgICR7Y3NzKHRoZW1lLnR5cG9ncmFwaHkuY2FwdGlvbil9XG4gICAgYmFja2dyb3VuZDogJHt0aGVtZS5jb2xvcnMucHJpbWFyeV8xfTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgcGFkZGluZzogMnB4IDRweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAke2Fycm93ICYmXG4gICAgICAgIGBcbiAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgJHthcnJvd1N0eWxlc1twb3NpdGlvbl19XG4gICAgICB9XG4gICAgYH1cbiAgYDtcbiAgICByZXR1cm4gKDw+XG4gICAgICA8R2xvYmFsIHN0eWxlcz17Y3NzIGBcbiAgICAgICAgICAudGlwcHktcG9wcGVyIC5sZWF2ZSB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgYH0vPlxuICAgICAgPFJlYWN0VGlwcHkgcG9wcGVyT3B0aW9ucz17e1xuICAgICAgICBtb2RpZmllcnM6IG1lcmdlKHtcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LCByZXN0LnBvcHBlck9wdGlvbnMpLFxuICAgIH19IGh0bWw9ezxUb29sdGlwQ29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57aHRtbH08L1Rvb2x0aXBDb250YWluZXI+fSBwb3NpdGlvbj17cG9zaXRpb259IHsuLi5yZXN0fS8+XG4gICAgPC8+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var Tooltip = function Tooltip(_a) {
  var className = _a.className,
    html = _a.html,
    _a$position = _a.position,
    position = _a$position === void 0 ? 'top' : _a$position,
    _a$arrow = _a.arrow,
    arrow = _a$arrow === void 0 ? true : _a$arrow,
    rest = __rest(_a, ['className', 'html', 'position', 'arrow']);

  var theme = (0, _useTheme['default'])();
  var arrowStyles = {
    top: '\n      right: 50%;\n      top: 100%;\n      border-top-color: '.concat(
      theme.colors.primary_1,
      ';\n      border-right: 5px solid transparent;\n      border-left: 5px solid transparent;\n      margin-right: -5px;\n    ',
    ),
    left: '\n      bottom: 50%;\n      left: 100%;\n      border-left-color: '.concat(
      theme.colors.primary_1,
      ';\n      border-bottom: 5px solid transparent;\n      border-top: 5px solid transparent;\n      margin-bottom: -5px;\n    ',
    ),
    bottom: '\n      left: 50%;\n      bottom: 100%;\n      border-bottom-color: '.concat(
      theme.colors.primary_1,
      ';\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      margin-left: -5px;\n    ',
    ),
    right: '\n      top: 50%;\n      right: 100%;\n      border-right-color: '.concat(
      theme.colors.primary_1,
      ';\n      border-top: 5px solid transparent;\n      border-bottom: 5px solid transparent;\n      margin-top: -5px;\n    ',
    ),
  };
  var TooltipContainer = /*#__PURE__*/ (0, _styledBase['default'])('div', {
    target: 'e10m70zo0',
    label: 'Uikit-TooltipContainer',
  })(
    /*#__PURE__*/ (0, _core.css)(
      theme.typography.caption,
      ';label:Uikit-TooltipContainer;' +
        (process.env.NODE_ENV === 'production'
          ? ''
          : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRU0iLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMCBUaGUgT250YXJpbyBJbnN0aXR1dGUgZm9yIENhbmNlciBSZXNlYXJjaC4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICpcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZlxuICogdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wLiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZXG4gKiBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVNcbiAqIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UXG4gKiBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCxcbiAqIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRFxuICogVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTO1xuICogT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU5cbiAqIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuLy8gQGZsb3dcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgVG9vbHRpcCBhcyBSZWFjdFRpcHB5IH0gZnJvbSAncmVhY3QtdGlwcHknO1xuaW1wb3J0IHVzZVRoZW1lIGZyb20gJy4uL3V0aWxzL3VzZVRoZW1lJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnO1xuY29uc3QgVG9vbHRpcCA9IChfYSkgPT4ge1xuICAgIHZhciB7IGNsYXNzTmFtZSwgaHRtbCwgcG9zaXRpb24gPSAndG9wJywgYXJyb3cgPSB0cnVlIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2xhc3NOYW1lXCIsIFwiaHRtbFwiLCBcInBvc2l0aW9uXCIsIFwiYXJyb3dcIl0pO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICBjb25zdCBhcnJvd1N0eWxlcyA9IHtcbiAgICAgICAgdG9wOiBgXG4gICAgICByaWdodDogNTAlO1xuICAgICAgdG9wOiAxMDAlO1xuICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGVtZS5jb2xvcnMucHJpbWFyeV8xfTtcbiAgICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIG1hcmdpbi1yaWdodDogLTVweDtcbiAgICBgLFxuICAgICAgICBsZWZ0OiBgXG4gICAgICBib3R0b206IDUwJTtcbiAgICAgIGxlZnQ6IDEwMCU7XG4gICAgICBib3JkZXItbGVmdC1jb2xvcjogJHt0aGVtZS5jb2xvcnMucHJpbWFyeV8xfTtcbiAgICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIG1hcmdpbi1ib3R0b206IC01cHg7XG4gICAgYCxcbiAgICAgICAgYm90dG9tOiBgXG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICBib3R0b206IDEwMCU7XG4gICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAke3RoZW1lLmNvbG9ycy5wcmltYXJ5XzF9O1xuICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gICAgYCxcbiAgICAgICAgcmlnaHQ6IGBcbiAgICAgIHRvcDogNTAlO1xuICAgICAgcmlnaHQ6IDEwMCU7XG4gICAgICBib3JkZXItcmlnaHQtY29sb3I6ICR7dGhlbWUuY29sb3JzLnByaW1hcnlfMX07XG4gICAgICBib3JkZXItdG9wOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICAgIGAsXG4gICAgfTtcbiAgICBjb25zdCBUb29sdGlwQ29udGFpbmVyID0gc3R5bGVkKCdkaXYnKSBgXG4gICAgJHtjc3ModGhlbWUudHlwb2dyYXBoeS5jYXB0aW9uKX1cbiAgICBiYWNrZ3JvdW5kOiAke3RoZW1lLmNvbG9ycy5wcmltYXJ5XzF9O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICR7YXJyb3cgJiZcbiAgICAgICAgYFxuICAgICAgJjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAke2Fycm93U3R5bGVzW3Bvc2l0aW9uXX1cbiAgICAgIH1cbiAgICBgfVxuICBgO1xuICAgIHJldHVybiAoPD5cbiAgICAgIDxHbG9iYWwgc3R5bGVzPXtjc3MgYFxuICAgICAgICAgIC50aXBweS1wb3BwZXIgLmxlYXZlIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgfVxuICAgICAgICBgfS8+XG4gICAgICA8UmVhY3RUaXBweSBwb3BwZXJPcHRpb25zPXt7XG4gICAgICAgIG1vZGlmaWVyczogbWVyZ2Uoe1xuICAgICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhpZGU6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sIHJlc3QucG9wcGVyT3B0aW9ucyksXG4gICAgfX0gaHRtbD17PFRvb2x0aXBDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PntodG1sfTwvVG9vbHRpcENvbnRhaW5lcj59IHBvc2l0aW9uPXtwb3NpdGlvbn0gey4uLnJlc3R9Lz5cbiAgICA8Lz4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */'),
    ),
    ' background:',
    theme.colors.primary_1,
    ';border-radius:2px;padding:2px 4px;color:white;font-weight:normal;',
    arrow &&
      "\n      &:before {\n        content: '';\n        display: block;\n        position: absolute;\n        width: 0;\n        height: 0;\n        border: 5px solid transparent;\n        pointer-events: none;\n        ".concat(
        arrowStyles[position],
        '\n      }\n    ',
      ),
    process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwRTJDIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbi8vIEBmbG93XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IFRvb2x0aXAgYXMgUmVhY3RUaXBweSB9IGZyb20gJ3JlYWN0LXRpcHB5JztcbmltcG9ydCB1c2VUaGVtZSBmcm9tICcuLi91dGlscy91c2VUaGVtZSc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoJztcbmNvbnN0IFRvb2x0aXAgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGh0bWwsIHBvc2l0aW9uID0gJ3RvcCcsIGFycm93ID0gdHJ1ZSB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcImNsYXNzTmFtZVwiLCBcImh0bWxcIiwgXCJwb3NpdGlvblwiLCBcImFycm93XCJdKTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3QgYXJyb3dTdHlsZXMgPSB7XG4gICAgICAgIHRvcDogYFxuICAgICAgcmlnaHQ6IDUwJTtcbiAgICAgIHRvcDogMTAwJTtcbiAgICAgIGJvcmRlci10b3AtY29sb3I6ICR7dGhlbWUuY29sb3JzLnByaW1hcnlfMX07XG4gICAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW4tcmlnaHQ6IC01cHg7XG4gICAgYCxcbiAgICAgICAgbGVmdDogYFxuICAgICAgYm90dG9tOiA1MCU7XG4gICAgICBsZWZ0OiAxMDAlO1xuICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhlbWUuY29sb3JzLnByaW1hcnlfMX07XG4gICAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItdG9wOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiAtNXB4O1xuICAgIGAsXG4gICAgICAgIGJvdHRvbTogYFxuICAgICAgbGVmdDogNTAlO1xuICAgICAgYm90dG9tOiAxMDAlO1xuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHt0aGVtZS5jb2xvcnMucHJpbWFyeV8xfTtcbiAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICAgIGAsXG4gICAgICAgIHJpZ2h0OiBgXG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHJpZ2h0OiAxMDAlO1xuICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAke3RoZW1lLmNvbG9ycy5wcmltYXJ5XzF9O1xuICAgICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgbWFyZ2luLXRvcDogLTVweDtcbiAgICBgLFxuICAgIH07XG4gICAgY29uc3QgVG9vbHRpcENvbnRhaW5lciA9IHN0eWxlZCgnZGl2JykgYFxuICAgICR7Y3NzKHRoZW1lLnR5cG9ncmFwaHkuY2FwdGlvbil9XG4gICAgYmFja2dyb3VuZDogJHt0aGVtZS5jb2xvcnMucHJpbWFyeV8xfTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgcGFkZGluZzogMnB4IDRweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAke2Fycm93ICYmXG4gICAgICAgIGBcbiAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgJHthcnJvd1N0eWxlc1twb3NpdGlvbl19XG4gICAgICB9XG4gICAgYH1cbiAgYDtcbiAgICByZXR1cm4gKDw+XG4gICAgICA8R2xvYmFsIHN0eWxlcz17Y3NzIGBcbiAgICAgICAgICAudGlwcHktcG9wcGVyIC5sZWF2ZSB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgYH0vPlxuICAgICAgPFJlYWN0VGlwcHkgcG9wcGVyT3B0aW9ucz17e1xuICAgICAgICBtb2RpZmllcnM6IG1lcmdlKHtcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LCByZXN0LnBvcHBlck9wdGlvbnMpLFxuICAgIH19IGh0bWw9ezxUb29sdGlwQ29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57aHRtbH08L1Rvb2x0aXBDb250YWluZXI+fSBwb3NpdGlvbj17cG9zaXRpb259IHsuLi5yZXN0fS8+XG4gICAgPC8+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */',
  );
  return (0, _core.jsx)(
    React.Fragment,
    null,
    (0, _core.jsx)(_core.Global, {
      styles: _ref,
    }),
    (0, _core.jsx)(
      _reactTippy.Tooltip,
      (0, _extends2['default'])(
        {
          popperOptions: {
            modifiers: (0, _lodash.merge)(
              {
                preventOverflow: {
                  enabled: false,
                },
                flip: {
                  enabled: false,
                },
                hide: {
                  enabled: false,
                },
              },
              rest.popperOptions,
            ),
          },
          html: (0, _core.jsx)(
            TooltipContainer,
            {
              className: className,
            },
            html,
          ),
          position: position,
        },
        rest,
      ),
    ),
  );
};

var _default = Tooltip;
exports['default'] = _default;
