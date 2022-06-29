'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _react = _interopRequireDefault(require('react'));

var _noData = _interopRequireDefault(require('../assets/noData.svg'));

var _Typography = _interopRequireDefault(require('../Typography'));

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

var Container = /*#__PURE__*/ (0, _styledBase['default'])('div', {
  target: 'e1hhxelq0',
  label: 'Uikit-Container',
})(
  process.env.NODE_ENV === 'production'
    ? {
        name: '4wj7j',
        styles:
          'display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;',
      }
    : {
        name: '4wj7j',
        styles:
          'display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQ2dDIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBub0RhdGFTdmcgZnJvbSAndWlraXQvYXNzZXRzL25vRGF0YS5zdmcnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnLi4vVHlwb2dyYXBoeSc7XG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQoJ2RpdicpIGBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDgwcHggMDtcbmA7XG5jb25zdCBDb250ZW50UGxhY2Vob2xkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjaGlsZHJlbiA9IDxpbWcgYWx0PVwibm8gZGF0YSBmb3VuZFwiIHNyYz17bm9EYXRhU3ZnfS8+LCB0aXRsZSA9ICdObyBEYXRhIEZvdW5kLicsIHN1YnRpdGxlLCBsaW5rIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJ0aXRsZVwiLCBcInN1YnRpdGxlXCIsIFwibGlua1wiXSk7XG4gICAgcmV0dXJuICg8Q29udGFpbmVyIHsuLi5yZXN0fT5cbiAgICB7Y2hpbGRyZW59XG4gICAgPFR5cG9ncmFwaHkgY3NzPXtjc3MgYFxuICAgICAgICBtYXJnaW4tdG9wOiAxNHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgYH0gY29sb3I9XCJncmV5XCIgdmFyaWFudD1cIm5hdmlnYXRpb25cIiBhcz1cInBcIiBib2xkPlxuICAgICAge3RpdGxlfVxuICAgIDwvVHlwb2dyYXBoeT5cbiAgICA8VHlwb2dyYXBoeSBjc3M9e2NzcyBgXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICBgfSBjb2xvcj1cImdyZXlcIiB2YXJpYW50PVwiZGF0YVwiIGFzPVwicFwiPlxuICAgICAge3N1YnRpdGxlfVxuICAgIDwvVHlwb2dyYXBoeT5cbiAgICB7bGlua31cbiAgPC9Db250YWluZXI+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBDb250ZW50UGxhY2Vob2xkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      },
);

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'dcoow8-Uikit-ContentPlaceholder',
        styles: 'margin-top:14px;margin-bottom:0;;label:Uikit-ContentPlaceholder;',
      }
    : {
        name: 'dcoow8-Uikit-ContentPlaceholder',
        styles: 'margin-top:14px;margin-bottom:0;;label:Uikit-ContentPlaceholder;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Q3lCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBub0RhdGFTdmcgZnJvbSAndWlraXQvYXNzZXRzL25vRGF0YS5zdmcnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnLi4vVHlwb2dyYXBoeSc7XG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQoJ2RpdicpIGBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDgwcHggMDtcbmA7XG5jb25zdCBDb250ZW50UGxhY2Vob2xkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjaGlsZHJlbiA9IDxpbWcgYWx0PVwibm8gZGF0YSBmb3VuZFwiIHNyYz17bm9EYXRhU3ZnfS8+LCB0aXRsZSA9ICdObyBEYXRhIEZvdW5kLicsIHN1YnRpdGxlLCBsaW5rIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJ0aXRsZVwiLCBcInN1YnRpdGxlXCIsIFwibGlua1wiXSk7XG4gICAgcmV0dXJuICg8Q29udGFpbmVyIHsuLi5yZXN0fT5cbiAgICB7Y2hpbGRyZW59XG4gICAgPFR5cG9ncmFwaHkgY3NzPXtjc3MgYFxuICAgICAgICBtYXJnaW4tdG9wOiAxNHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgYH0gY29sb3I9XCJncmV5XCIgdmFyaWFudD1cIm5hdmlnYXRpb25cIiBhcz1cInBcIiBib2xkPlxuICAgICAge3RpdGxlfVxuICAgIDwvVHlwb2dyYXBoeT5cbiAgICA8VHlwb2dyYXBoeSBjc3M9e2NzcyBgXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICBgfSBjb2xvcj1cImdyZXlcIiB2YXJpYW50PVwiZGF0YVwiIGFzPVwicFwiPlxuICAgICAge3N1YnRpdGxlfVxuICAgIDwvVHlwb2dyYXBoeT5cbiAgICB7bGlua31cbiAgPC9Db250YWluZXI+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBDb250ZW50UGxhY2Vob2xkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var _ref2 =
  process.env.NODE_ENV === 'production'
    ? {
        name: '18lpof-Uikit-ContentPlaceholder',
        styles: 'margin-top:10px;margin-bottom:0;;label:Uikit-ContentPlaceholder;',
      }
    : {
        name: '18lpof-Uikit-ContentPlaceholder',
        styles: 'margin-top:10px;margin-bottom:0;;label:Uikit-ContentPlaceholder;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRHlCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBub0RhdGFTdmcgZnJvbSAndWlraXQvYXNzZXRzL25vRGF0YS5zdmcnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnLi4vVHlwb2dyYXBoeSc7XG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQoJ2RpdicpIGBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDgwcHggMDtcbmA7XG5jb25zdCBDb250ZW50UGxhY2Vob2xkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjaGlsZHJlbiA9IDxpbWcgYWx0PVwibm8gZGF0YSBmb3VuZFwiIHNyYz17bm9EYXRhU3ZnfS8+LCB0aXRsZSA9ICdObyBEYXRhIEZvdW5kLicsIHN1YnRpdGxlLCBsaW5rIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJ0aXRsZVwiLCBcInN1YnRpdGxlXCIsIFwibGlua1wiXSk7XG4gICAgcmV0dXJuICg8Q29udGFpbmVyIHsuLi5yZXN0fT5cbiAgICB7Y2hpbGRyZW59XG4gICAgPFR5cG9ncmFwaHkgY3NzPXtjc3MgYFxuICAgICAgICBtYXJnaW4tdG9wOiAxNHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgYH0gY29sb3I9XCJncmV5XCIgdmFyaWFudD1cIm5hdmlnYXRpb25cIiBhcz1cInBcIiBib2xkPlxuICAgICAge3RpdGxlfVxuICAgIDwvVHlwb2dyYXBoeT5cbiAgICA8VHlwb2dyYXBoeSBjc3M9e2NzcyBgXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICBgfSBjb2xvcj1cImdyZXlcIiB2YXJpYW50PVwiZGF0YVwiIGFzPVwicFwiPlxuICAgICAge3N1YnRpdGxlfVxuICAgIDwvVHlwb2dyYXBoeT5cbiAgICB7bGlua31cbiAgPC9Db250YWluZXI+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBDb250ZW50UGxhY2Vob2xkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var ContentPlaceholder = function ContentPlaceholder(_a) {
  var _a$children = _a.children,
    children =
      _a$children === void 0
        ? (0, _core.jsx)('img', {
            alt: 'no data found',
            src: _noData['default'],
          })
        : _a$children,
    _a$title = _a.title,
    title = _a$title === void 0 ? 'No Data Found.' : _a$title,
    subtitle = _a.subtitle,
    link = _a.link,
    rest = __rest(_a, ['children', 'title', 'subtitle', 'link']);

  return (0, _core.jsx)(
    Container,
    rest,
    children,
    (0, _core.jsx)(
      _Typography['default'],
      {
        css: _ref,
        color: 'grey',
        variant: 'navigation',
        as: 'p',
        bold: true,
      },
      title,
    ),
    (0, _core.jsx)(
      _Typography['default'],
      {
        css: _ref2,
        color: 'grey',
        variant: 'data',
        as: 'p',
      },
      subtitle,
    ),
    link,
  );
};

var _default = ContentPlaceholder;
exports['default'] = _default;
