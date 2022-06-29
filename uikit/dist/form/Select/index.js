'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _react = _interopRequireWildcard(require('react'));

var _common = require('../common');

var _Typography = _interopRequireDefault(require('../../Typography'));

var _styledComponents = require('./styledComponents');

var _useTheme = _interopRequireDefault(require('../../utils/useTheme'));

var _Tooltip = _interopRequireDefault(require('../../Tooltip'));

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

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1v0n05g-Uikit-styledInputWrapper',
        styles: 'flex:1;padding:0 10px;line-height:0;;label:Uikit-styledInputWrapper;',
      }
    : {
        name: '1v0n05g-Uikit-styledInputWrapper',
        styles: 'flex:1;padding:0 10px;line-height:0;;label:Uikit-styledInputWrapper;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvRytCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgeyBTdHlsZWRJbnB1dFdyYXBwZXIsIElOUFVUX1NJWkVTIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJy4uLy4uL1R5cG9ncmFwaHknO1xuaW1wb3J0IHsgRHJvcGRvd25JY29uLCBPcHRpb25zTGlzdCwgT3B0aW9uLCBIaWRkZW5TZWxlY3QsIFBPUFVQX1BPU0lUSU9OUywgfSBmcm9tICcuL3N0eWxlZENvbXBvbmVudHMnO1xuaW1wb3J0IHVzZVRoZW1lIGZyb20gJy4uLy4uL3V0aWxzL3VzZVRoZW1lJztcbmltcG9ydCBUb29sdGlwIGZyb20gJ3Vpa2l0L1Rvb2x0aXAnO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuY29uc3QgU2VsZWN0ID0gKF9hKSA9PiB7XG4gICAgdmFyIHsgcGxhY2Vob2xkZXIgPSAnLSBTZWxlY3QgYW4gb3B0aW9uIC0nLCBpZCwgdmFsdWUgPSAnJywgZGlzYWJsZWQgPSBmYWxzZSwgc2l6ZSA9IElOUFVUX1NJWkVTLlNNLCBvcHRpb25zID0gW10sIGVycm9yID0gZmFsc2UsIHBvcHVwUG9zaXRpb24gPSBQT1BVUF9QT1NJVElPTlMuRE9XTiB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJwbGFjZWhvbGRlclwiLCBcImlkXCIsIFwidmFsdWVcIiwgXCJkaXNhYmxlZFwiLCBcInNpemVcIiwgXCJvcHRpb25zXCIsIFwiZXJyb3JcIiwgXCJwb3B1cFBvc2l0aW9uXCJdKTtcbiAgICBjb25zdCBbYWN0aXZlU3RhdGUsIHNldEFjdGl2ZV0gPSB1c2VTdGF0ZSgnZGVmYXVsdCcpO1xuICAgIGNvbnN0IFtzZWxlY3RlZFZhbHVlLCBzZXRTZWxlY3RlZFZhbHVlXSA9IHVzZVN0YXRlKHZhbHVlKTtcbiAgICBjb25zdCBbaXNFeHBhbmRlZCwgc2V0RXhwYW5kZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHsgZGlzYWJsZWQ6IGNhbGNEaXNhYmxlZCwgZXJyb3I6IGNhbGNFcnJvciwgaGFuZGxlQmx1ciwgaGFuZGxlRm9jdXMgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRyb2xDb250ZXh0KSB8fCB7fTtcbiAgICBjb25zdCBvbkJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBoYW5kbGVCbHVyID09PSBudWxsIHx8IGhhbmRsZUJsdXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUJsdXIoKTtcbiAgICAgICAgKF9hID0gcHJvcHMub25CbHVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICBzZXRBY3RpdmUoJ2RlZmF1bHQnKTtcbiAgICAgICAgc2V0RXhwYW5kZWQoZmFsc2UpO1xuICAgIH07XG4gICAgLy8gY3VzdG9tIGV2ZW50IGZ1bmN0aW9uIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIGNvbnN0IG9uQ2hhbmdlID0gKGV2ZW50LCBjdXN0b21TZWxlY3RWYWx1ZSkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBldmVudFZhbHVlID0gY3VzdG9tU2VsZWN0VmFsdWUgfHwgZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAoX2EgPSBwcm9wcy5ldmVudE9uQ2hhbmdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICAoX2IgPSBwcm9wcy5vbkNoYW5nZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwocHJvcHMsIGV2ZW50VmFsdWUpO1xuICAgICAgICBzZXRBY3RpdmUoJ2RlZmF1bHQnKTtcbiAgICAgICAgc2V0RXhwYW5kZWQoZmFsc2UpO1xuICAgICAgICBzZXRTZWxlY3RlZFZhbHVlKGV2ZW50VmFsdWUpO1xuICAgIH07XG4gICAgY29uc3Qgb25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGhhbmRsZUZvY3VzID09PSBudWxsIHx8IGhhbmRsZUZvY3VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kbGVGb2N1cygpO1xuICAgICAgICAoX2EgPSBwcm9wcy5vbkZvY3VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICBzZXRBY3RpdmUoJ2ZvY3VzJyk7XG4gICAgICAgIHNldEV4cGFuZGVkKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFzRXJyb3IgPSBjYWxjRXJyb3IgfHwgISFlcnJvcjtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gY2FsY0Rpc2FibGVkIHx8IGRpc2FibGVkO1xuICAgIGNvbnN0IEhpZGRlblNlbGVjdFJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgIGNvbnN0IGFyaWFMYWJlbCA9IHByb3BzWydhcmlhLWxhYmVsJ107XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBvcHRpb25zLmZpbmQoKHsgdmFsdWU6IG9wdGlvblZhbHVlIH0pID0+IFN0cmluZyhvcHRpb25WYWx1ZSkgPT09IFN0cmluZyhzZWxlY3RlZFZhbHVlKSk7XG4gICAgY29uc3QgaXNTb21ldGhpbmdTZWxlY3RlZCA9ICEhKHNlbGVjdGVkVmFsdWUgJiYgc2VsZWN0ZWRPcHRpb24pO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICBjb25zdCB3cmFwcGVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRDbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJOb2RlID0gd3JhcHBlclJlZi5jdXJyZW50O1xuICAgICAgICAgICAgaWYgKHdyYXBwZXJOb2RlICYmICF3cmFwcGVyTm9kZS5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgc2V0RXhwYW5kZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldEFjdGl2ZSgnZGVmYXVsdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNFeHBhbmRlZCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGRvY3VtZW50Q2xpY2tIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBkb2N1bWVudENsaWNrSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBkb2N1bWVudENsaWNrSGFuZGxlcik7XG4gICAgfSwgW2lzRXhwYW5kZWRdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICB2YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZSB8fCBzZXRTZWxlY3RlZFZhbHVlKHZhbHVlKTtcbiAgICB9LCBbdmFsdWVdKTtcbiAgICBjb25zdCBzdHlsZWRJbnB1dFdyYXBwZXIgPSAoPFN0eWxlZElucHV0V3JhcHBlciBlcnJvcj17aGFzRXJyb3J9IHJlZj17d3JhcHBlclJlZn0gc2l6ZT17c2l6ZX0gc3R5bGU9e3sgekluZGV4OiAxIH19IGRpc2FibGVkPXtpc0Rpc2FibGVkfSBpbnB1dFN0YXRlPXthY3RpdmVTdGF0ZX0gcm9sZT1cImJ1dHRvblwiPlxuICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cInBhcmFncmFwaFwiIGNvbG9yPXtpc0Rpc2FibGVkXG4gICAgICAgID8gdGhlbWUuaW5wdXQudGV4dENvbG9ycy5kaXNhYmxlZFxuICAgICAgICA6IGlzU29tZXRoaW5nU2VsZWN0ZWQgfHwgaXNFeHBhbmRlZFxuICAgICAgICAgICAgPyAnYmxhY2snXG4gICAgICAgICAgICA6ICdncmV5J30gY3NzPXtjc3MgYFxuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgICAgICBgfT5cbiAgICAgICAgeyhzZWxlY3RlZFZhbHVlICYmIHNlbGVjdGVkT3B0aW9uID8gc2VsZWN0ZWRPcHRpb24uY29udGVudCA6IGZhbHNlKSB8fCBwbGFjZWhvbGRlcn1cbiAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgIDxEcm9wZG93bkljb24gZGlzYWJsZWQ9e2lzRGlzYWJsZWR9IHRoZW1lPXt0aGVtZX0vPlxuICAgIDwvU3R5bGVkSW5wdXRXcmFwcGVyPik7XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfSBzdHlsZT17T2JqZWN0LmFzc2lnbih7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sIChwcm9wcy5zdHlsZSB8fCB7fSkpfSBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHBlck5vZGUgPSB3cmFwcGVyUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKHdyYXBwZXJOb2RlICYmIHdyYXBwZXJOb2RlLmNvbnRhaW5zKHRhcmdldCkgJiYgaXNFeHBhbmRlZCkge1xuICAgICAgICAgICAgc2V0RXhwYW5kZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IEhpZGRlblNlbGVjdFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBIaWRkZW5TZWxlY3RSZWYuY3VycmVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfX0+XG4gICAgICBcbiAgICAgIDxIaWRkZW5TZWxlY3QgYXJpYS1sYWJlbD17YXJpYUxhYmVsfSBkaXNhYmxlZD17aXNEaXNhYmxlZH0gaWQ9e2lkfSByZWY9e0hpZGRlblNlbGVjdFJlZn0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25Gb2N1cz17b25Gb2N1c30gdmFsdWU9e3NlbGVjdGVkVmFsdWV9PlxuICAgICAgICBcbiAgICAgICAge1t7IGNvbnRlbnQ6IHBsYWNlaG9sZGVyLCBkaXNhYmxlZDogdHJ1ZSwgdmFsdWU6ICcnIH1dXG4gICAgICAgIC5jb25jYXQob3B0aW9ucylcbiAgICAgICAgLm1hcCgoeyBjb250ZW50LCBkaXNhYmxlZCwgdmFsdWU6IG9wdGlvblZhbHVlIH0pID0+ICg8b3B0aW9uIGRpc2FibGVkPXtkaXNhYmxlZH0ga2V5PXtvcHRpb25WYWx1ZX0gdmFsdWU9e29wdGlvblZhbHVlfT5cbiAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICA8L29wdGlvbj4pKX1cbiAgICAgIDwvSGlkZGVuU2VsZWN0PlxuXG4gICAgICB7cHJvcHMuaGludFRleHQgPyAoPFRvb2x0aXAgdW5tb3VudEhUTUxXaGVuSGlkZSBwb3NpdGlvbj1cImJvdHRvbVwiIGh0bWw9ezxzcGFuPntwcm9wcy5oaW50VGV4dH08L3NwYW4+fT5cbiAgICAgICAgICB7c3R5bGVkSW5wdXRXcmFwcGVyfVxuICAgICAgICA8L1Rvb2x0aXA+KSA6IChzdHlsZWRJbnB1dFdyYXBwZXIpfVxuXG4gICAgICB7aXNFeHBhbmRlZCAmJiAoPE9wdGlvbnNMaXN0IHJvbGU9XCJsaXN0Ym94XCIgaWQ9e2Ake2lkfS1vcHRpb25zYH0gY2xhc3NOYW1lPXtwb3B1cFBvc2l0aW9ufT5cbiAgICAgICAgICB7b3B0aW9ucy5tYXAoKHsgY29udGVudCwgdmFsdWU6IG9wdGlvblZhbHVlIH0pID0+ICg8T3B0aW9uIGtleT17b3B0aW9uVmFsdWV9IHZhbHVlPXtvcHRpb25WYWx1ZX0gb25Nb3VzZURvd249eyhldmVudCkgPT4ge1xuICAgICAgICBvbkNoYW5nZShldmVudCwgb3B0aW9uVmFsdWUpO1xuICAgIH19PlxuICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgIDwvT3B0aW9uPikpfVxuICAgICAgICA8L09wdGlvbnNMaXN0Pil9XG4gICAgPC9kaXY+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var Select = function Select(_a) {
  var _a$placeholder = _a.placeholder,
    placeholder = _a$placeholder === void 0 ? '- Select an option -' : _a$placeholder,
    id = _a.id,
    _a$value = _a.value,
    value = _a$value === void 0 ? '' : _a$value,
    _a$disabled = _a.disabled,
    disabled = _a$disabled === void 0 ? false : _a$disabled,
    _a$size = _a.size,
    size = _a$size === void 0 ? _common.INPUT_SIZES.SM : _a$size,
    _a$options = _a.options,
    options = _a$options === void 0 ? [] : _a$options,
    _a$error = _a.error,
    error = _a$error === void 0 ? false : _a$error,
    _a$popupPosition = _a.popupPosition,
    popupPosition =
      _a$popupPosition === void 0 ? _styledComponents.POPUP_POSITIONS.DOWN : _a$popupPosition,
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

  var _useState = (0, _react.useState)('default'),
    activeState = _useState[0],
    setActive = _useState[1];

  var _useState2 = (0, _react.useState)(value),
    selectedValue = _useState2[0],
    setSelectedValue = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
    isExpanded = _useState3[0],
    setExpanded = _useState3[1];

  var _ref2 = (0, _react.useContext)(_FormControlContext['default']) || {},
    calcDisabled = _ref2.disabled,
    calcError = _ref2.error,
    handleBlur = _ref2.handleBlur,
    handleFocus = _ref2.handleFocus;

  var onBlur = function onBlur(event) {
    var _a;

    handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
    setActive('default');
    setExpanded(false);
  }; // custom event function for backwards compatibility

  var onChange = function onChange(event, customSelectValue) {
    var _a, _b;

    var eventValue = customSelectValue || event.target.value;
    (_a = props.eventOnChange) === null || _a === void 0 ? void 0 : _a.call(props, event);
    (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, eventValue);
    setActive('default');
    setExpanded(false);
    setSelectedValue(eventValue);
  };

  var onFocus = function onFocus(event) {
    var _a;

    handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
    setActive('focus');
    setExpanded(true);
  };

  var hasError = calcError || !!error;
  var isDisabled = calcDisabled || disabled;

  var HiddenSelectRef = /*#__PURE__*/ _react['default'].createRef();

  var ariaLabel = props['aria-label'];
  var selectedOption = options.find(function (_ref3) {
    var optionValue = _ref3.value;
    return String(optionValue) === String(selectedValue);
  });
  var isSomethingSelected = !!(selectedValue && selectedOption);
  var theme = (0, _useTheme['default'])();

  var wrapperRef = /*#__PURE__*/ _react['default'].createRef();

  (0, _react.useEffect)(
    function () {
      var documentClickHandler = function documentClickHandler(event) {
        var target = event.target;
        var wrapperNode = wrapperRef.current;

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

      return function () {
        return document.removeEventListener('mouseup', documentClickHandler);
      };
    },
    [isExpanded],
  );
  (0, _react.useEffect)(
    function () {
      value === selectedValue || setSelectedValue(value);
    },
    [value],
  );
  var styledInputWrapper = (0, _core.jsx)(
    _common.StyledInputWrapper,
    {
      error: hasError,
      ref: wrapperRef,
      size: size,
      style: {
        zIndex: 1,
      },
      disabled: isDisabled,
      inputState: activeState,
      role: 'button',
    },
    (0, _core.jsx)(
      _Typography['default'],
      {
        variant: 'paragraph',
        color: isDisabled
          ? theme.input.textColors.disabled
          : isSomethingSelected || isExpanded
          ? 'black'
          : 'grey',
        css: _ref,
      },
      (selectedValue && selectedOption ? selectedOption.content : false) || placeholder,
    ),
    (0, _core.jsx)(_styledComponents.DropdownIcon, {
      disabled: isDisabled,
      theme: theme,
    }),
  );
  return (0, _core.jsx)(
    'div',
    {
      className: props.className,
      style: Object.assign(
        {
          position: 'relative',
        },
        props.style || {},
      ),
      onClick: function onClick(event) {
        var wrapperNode = wrapperRef.current;
        var target = event.target;

        if (wrapperNode && wrapperNode.contains(target) && isExpanded) {
          setExpanded(false);
        } else if (document.activeElement !== HiddenSelectRef.current) {
          HiddenSelectRef.current.focus();
        }
      },
    },
    (0, _core.jsx)(
      _styledComponents.HiddenSelect,
      {
        'aria-label': ariaLabel,
        disabled: isDisabled,
        id: id,
        ref: HiddenSelectRef,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        value: selectedValue,
      },
      [
        {
          content: placeholder,
          disabled: true,
          value: '',
        },
      ]
        .concat(options)
        .map(function (_ref4) {
          var content = _ref4.content,
            disabled = _ref4.disabled,
            optionValue = _ref4.value;
          return (0, _core.jsx)(
            'option',
            {
              disabled: disabled,
              key: optionValue,
              value: optionValue,
            },
            content,
          );
        }),
    ),
    props.hintText
      ? (0, _core.jsx)(
          _Tooltip['default'],
          {
            unmountHTMLWhenHide: true,
            position: 'bottom',
            html: (0, _core.jsx)('span', null, props.hintText),
          },
          styledInputWrapper,
        )
      : styledInputWrapper,
    isExpanded &&
      (0, _core.jsx)(
        _styledComponents.OptionsList,
        {
          role: 'listbox',
          id: ''.concat(id, '-options'),
          className: popupPosition,
        },
        options.map(function (_ref5) {
          var content = _ref5.content,
            optionValue = _ref5.value;
          return (0, _core.jsx)(
            _styledComponents.Option,
            {
              key: optionValue,
              value: optionValue,
              onMouseDown: function onMouseDown(event) {
                onChange(event, optionValue);
              },
            },
            content,
          );
        }),
      ),
  );
};

var _default = Select;
exports['default'] = _default;
