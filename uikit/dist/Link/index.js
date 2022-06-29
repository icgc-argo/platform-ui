'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.LINK_VARIANTS = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

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

var StyledLink = /*#__PURE__*/ (0, _styledBase['default'])('a', {
  target: 'eb8ttyh0',
  label: 'Uikit-StyledLink',
})(
  function (_ref) {
    var theme = _ref.theme;
    return /*#__PURE__*/ (0, _core.css)(
      theme.typography['default'],
      ';label:Uikit-StyledLink;' +
        (process.env.NODE_ENV === 'production'
          ? ''
          : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQ21CIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQoJ2EnKSBgXG4gICR7KHsgdGhlbWUgfSkgPT4gY3NzKHRoZW1lLnR5cG9ncmFwaHkuZGVmYXVsdCl9XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6ICR7KHsgdGhlbWUsIGludmVydCB9KSA9PiAoaW52ZXJ0ID8gdGhlbWUuY29sb3JzLndoaXRlIDogdGhlbWUuY29sb3JzLmFjY2VudDJfZGFyayl9O1xuICB0ZXh0LWRlY29yYXRpb246ICR7KHsgdW5kZXJsaW5lIH0pID0+ICh1bmRlcmxpbmUgPyAndW5kZXJsaW5lJyA6ICdub25lJyl9O1xuICBmb250LXdlaWdodDogJHsoeyBib2xkIH0pID0+IChib2xkID8gJ2JvbGQnIDogJ2luaGVyaXQnKX07XG4gIHRleHQtdHJhbnNmb3JtOiAkeyh7IHVwcGVyY2FzZSB9KSA9PiAodXBwZXJjYXNlID8gJ3VwcGVyY2FzZScgOiAnZGVmYXVsdCcpfTtcblxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5hY2NlbnQyXzF9O1xuICB9XG4gIDphY3RpdmUge1xuICAgIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5hY2NlbnQyfTtcbiAgfVxuYDtcbmNvbnN0IExpbmsgPSBSZWFjdC5mb3J3YXJkUmVmKChfYSwgcmVmKSA9PiB7XG4gICAgdmFyIHsgaHJlZiwgdmFyaWFudCA9IExJTktfVkFSSUFOVFMuSU5MSU5FLCB1cHBlcmNhc2UgPSB2YXJpYW50ID09PSBMSU5LX1ZBUklBTlRTLkJMT0NLLCB3aXRoQ2hldnJvbiA9IHZhcmlhbnQgPT09IExJTktfVkFSSUFOVFMuQkxPQ0ssIHVuZGVybGluZSA9IHZhcmlhbnQgPT09IExJTktfVkFSSUFOVFMuSU5MSU5FLCBib2xkID0gdmFyaWFudCA9PT0gTElOS19WQVJJQU5UUy5CTE9DSywgaW52ZXJ0ID0gZmFsc2UsIGNoaWxkcmVuIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiaHJlZlwiLCBcInZhcmlhbnRcIiwgXCJ1cHBlcmNhc2VcIiwgXCJ3aXRoQ2hldnJvblwiLCBcInVuZGVybGluZVwiLCBcImJvbGRcIiwgXCJpbnZlcnRcIiwgXCJjaGlsZHJlblwiXSk7XG4gICAgcmV0dXJuICg8U3R5bGVkTGluayByZWY9e3JlZn0gdXBwZXJjYXNlPXt1cHBlcmNhc2V9IHVuZGVybGluZT17dW5kZXJsaW5lfSBib2xkPXtib2xkfSBocmVmPXtocmVmfSBpbnZlcnQ9e2ludmVydH0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgICAge3dpdGhDaGV2cm9uICYmICcg4oC6J31cbiAgICA8L1N0eWxlZExpbms+KTtcbn0pO1xuZXhwb3J0IGNvbnN0IExJTktfVkFSSUFOVFMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBJTkxJTkU6ICdJTkxJTkUnLFxuICAgIEJMT0NLOiAnQkxPQ0snLFxufSk7XG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
    );
  },
  ' cursor:pointer;color:',
  function (_ref2) {
    var theme = _ref2.theme,
      invert = _ref2.invert;
    return invert ? theme.colors.white : theme.colors.accent2_dark;
  },
  ';text-decoration:',
  function (_ref3) {
    var underline = _ref3.underline;
    return underline ? 'underline' : 'none';
  },
  ';font-weight:',
  function (_ref4) {
    var bold = _ref4.bold;
    return bold ? 'bold' : 'inherit';
  },
  ';text-transform:',
  function (_ref5) {
    var uppercase = _ref5.uppercase;
    return uppercase ? 'uppercase' : 'default';
  },
  ';:hover{color:',
  function (_ref6) {
    var theme = _ref6.theme;
    return theme.colors.accent2_1;
  },
  ';}:active{color:',
  function (_ref7) {
    var theme = _ref7.theme;
    return theme.colors.accent2;
  },
  ';}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQytCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQoJ2EnKSBgXG4gICR7KHsgdGhlbWUgfSkgPT4gY3NzKHRoZW1lLnR5cG9ncmFwaHkuZGVmYXVsdCl9XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6ICR7KHsgdGhlbWUsIGludmVydCB9KSA9PiAoaW52ZXJ0ID8gdGhlbWUuY29sb3JzLndoaXRlIDogdGhlbWUuY29sb3JzLmFjY2VudDJfZGFyayl9O1xuICB0ZXh0LWRlY29yYXRpb246ICR7KHsgdW5kZXJsaW5lIH0pID0+ICh1bmRlcmxpbmUgPyAndW5kZXJsaW5lJyA6ICdub25lJyl9O1xuICBmb250LXdlaWdodDogJHsoeyBib2xkIH0pID0+IChib2xkID8gJ2JvbGQnIDogJ2luaGVyaXQnKX07XG4gIHRleHQtdHJhbnNmb3JtOiAkeyh7IHVwcGVyY2FzZSB9KSA9PiAodXBwZXJjYXNlID8gJ3VwcGVyY2FzZScgOiAnZGVmYXVsdCcpfTtcblxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5hY2NlbnQyXzF9O1xuICB9XG4gIDphY3RpdmUge1xuICAgIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5hY2NlbnQyfTtcbiAgfVxuYDtcbmNvbnN0IExpbmsgPSBSZWFjdC5mb3J3YXJkUmVmKChfYSwgcmVmKSA9PiB7XG4gICAgdmFyIHsgaHJlZiwgdmFyaWFudCA9IExJTktfVkFSSUFOVFMuSU5MSU5FLCB1cHBlcmNhc2UgPSB2YXJpYW50ID09PSBMSU5LX1ZBUklBTlRTLkJMT0NLLCB3aXRoQ2hldnJvbiA9IHZhcmlhbnQgPT09IExJTktfVkFSSUFOVFMuQkxPQ0ssIHVuZGVybGluZSA9IHZhcmlhbnQgPT09IExJTktfVkFSSUFOVFMuSU5MSU5FLCBib2xkID0gdmFyaWFudCA9PT0gTElOS19WQVJJQU5UUy5CTE9DSywgaW52ZXJ0ID0gZmFsc2UsIGNoaWxkcmVuIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiaHJlZlwiLCBcInZhcmlhbnRcIiwgXCJ1cHBlcmNhc2VcIiwgXCJ3aXRoQ2hldnJvblwiLCBcInVuZGVybGluZVwiLCBcImJvbGRcIiwgXCJpbnZlcnRcIiwgXCJjaGlsZHJlblwiXSk7XG4gICAgcmV0dXJuICg8U3R5bGVkTGluayByZWY9e3JlZn0gdXBwZXJjYXNlPXt1cHBlcmNhc2V9IHVuZGVybGluZT17dW5kZXJsaW5lfSBib2xkPXtib2xkfSBocmVmPXtocmVmfSBpbnZlcnQ9e2ludmVydH0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgICAge3dpdGhDaGV2cm9uICYmICcg4oC6J31cbiAgICA8L1N0eWxlZExpbms+KTtcbn0pO1xuZXhwb3J0IGNvbnN0IExJTktfVkFSSUFOVFMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBJTkxJTkU6ICdJTkxJTkUnLFxuICAgIEJMT0NLOiAnQkxPQ0snLFxufSk7XG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
);

var Link = /*#__PURE__*/ _react['default'].forwardRef(function (_a, ref) {
  var href = _a.href,
    _a$variant = _a.variant,
    variant = _a$variant === void 0 ? LINK_VARIANTS.INLINE : _a$variant,
    _a$uppercase = _a.uppercase,
    uppercase = _a$uppercase === void 0 ? variant === LINK_VARIANTS.BLOCK : _a$uppercase,
    _a$withChevron = _a.withChevron,
    withChevron = _a$withChevron === void 0 ? variant === LINK_VARIANTS.BLOCK : _a$withChevron,
    _a$underline = _a.underline,
    underline = _a$underline === void 0 ? variant === LINK_VARIANTS.INLINE : _a$underline,
    _a$bold = _a.bold,
    bold = _a$bold === void 0 ? variant === LINK_VARIANTS.BLOCK : _a$bold,
    _a$invert = _a.invert,
    invert = _a$invert === void 0 ? false : _a$invert,
    children = _a.children,
    rest = __rest(_a, [
      'href',
      'variant',
      'uppercase',
      'withChevron',
      'underline',
      'bold',
      'invert',
      'children',
    ]);

  return (0, _core.jsx)(
    StyledLink,
    (0, _extends2['default'])(
      {
        ref: ref,
        uppercase: uppercase,
        underline: underline,
        bold: bold,
        href: href,
        invert: invert,
      },
      rest,
    ),
    children,
    withChevron && ' ›',
  );
});

var LINK_VARIANTS = Object.freeze({
  INLINE: 'INLINE',
  BLOCK: 'BLOCK',
});
exports.LINK_VARIANTS = LINK_VARIANTS;
var _default = Link;
exports['default'] = _default;
