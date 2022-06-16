'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var React = _interopRequireWildcard(require('react'));

var _Typography = _interopRequireDefault(require('../Typography'));

var _Button = _interopRequireDefault(require('../Button'));

var _useClickAway = _interopRequireDefault(require('../utils/useClickAway'));

var _ThemeProvider = require('../ThemeProvider');

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
  };

var MenuItem = function MenuItem(props) {
  var theme = (0, _ThemeProvider.useTheme)();
  return (0, _core.jsx)(
    _Typography['default'],
    (0, _extends2['default'])(
      {
        variant: 'default',
        as: 'div',
      },
      props,
      {
        css: /*#__PURE__*/ (0, _core.css)(
          'padding:5px;&:hover{background:',
          theme.colors.secondary_4,
          ';};label:Uikit-MenuItem;' +
            (process.env.NODE_ENV === 'production'
              ? ''
              : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ3VFIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAndWlraXQvVHlwb2dyYXBoeSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ3Vpa2l0L0J1dHRvbic7XG5pbXBvcnQgdXNlQ2xpY2tBd2F5IGZyb20gJ3Vpa2l0L3V0aWxzL3VzZUNsaWNrQXdheSc7XG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ3Vpa2l0L1RoZW1lUHJvdmlkZXInO1xuY29uc3QgTWVudUl0ZW0gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgcmV0dXJuICg8VHlwb2dyYXBoeSB2YXJpYW50PVwiZGVmYXVsdFwiIGFzPVwiZGl2XCIgey4uLnByb3BzfSBjc3M9e2NzcyBgXG4gICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZDogJHt0aGVtZS5jb2xvcnMuc2Vjb25kYXJ5XzR9O1xuICAgICAgICB9XG4gICAgICBgfS8+KTtcbn07XG5mdW5jdGlvbiBEcm9wZG93bkJ1dHRvbihfYSkge1xuICAgIHZhciB7IGNoaWxkcmVuLCBvbkl0ZW1DbGljaywgbWVudUl0ZW1zLCBtZW51U2hvd246IGNvbnRyb2xsZWRNZW51U2hvd1N0YXRlLCBvbkNsaWNrIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJvbkl0ZW1DbGlja1wiLCBcIm1lbnVJdGVtc1wiLCBcIm1lbnVTaG93blwiLCBcIm9uQ2xpY2tcIl0pO1xuICAgIGNvbnN0IFttZW51U2hvd24sIHNldE1lbnVTaG93bl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICAgIGNvbnN0IG1lbnVSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICB1c2VDbGlja0F3YXkoe1xuICAgICAgICBkb21FbGVtZW50UmVmOiBtZW51UmVmLFxuICAgICAgICBvbkNsaWNrQXdheTogKCkgPT4gc2V0TWVudVNob3duKGZhbHNlKSxcbiAgICAgICAgb25FbGVtZW50Q2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHNldE1lbnVTaG93bihmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuICg8QnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgIHNldE1lbnVTaG93bih0cnVlKTtcbiAgICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICB9fSBjc3M9e2NzcyBgXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGB9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICAgIHsobWVudVNob3duIHx8IGNvbnRyb2xsZWRNZW51U2hvd1N0YXRlID09PSB0cnVlKSAmJiAoIC8vIGV4cGxpY2l0IGNoZWNrIGJlY2F1c2UgdW5kZWZpbmVkIGlzIGZhbHN5XG4gICAgPGRpdiByZWY9e21lbnVSZWZ9IGNzcz17Y3NzIGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IDEwcHg7XG4gICAgICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDZweCAwIHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAgICAgICAgIGJvcmRlcjogc29saWQgMXB4ICR7dGhlbWUuY29sb3JzLmdyZXlfMX07XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoZW1lLmNvbG9ycy53aGl0ZX07XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgICBjb2xvcjogJHt0aGVtZS5jb2xvcnMuYmxhY2t9O1xuICAgICAgICAgIGB9PlxuICAgICAgICAgIHttZW51SXRlbXMubWFwKChpdGVtKSA9PiAoPE1lbnVJdGVtIGtleT17U3RyaW5nKGl0ZW0udmFsdWUpfSBvbkNsaWNrPXsoKSA9PiAocmVzdC5pc0xvYWRpbmcgPyBudWxsIDogb25JdGVtQ2xpY2soaXRlbSkpfSB7Li4uaXRlbX0+XG4gICAgICAgICAgICAgIHtpdGVtLmRpc3BsYXl9XG4gICAgICAgICAgICA8L01lbnVJdGVtPikpfVxuICAgICAgICA8L2Rpdj4pfVxuICAgIDwvQnV0dG9uPik7XG59XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'),
        ),
      },
    ),
  );
};

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'yy44x2-Uikit-DropdownButton',
        styles: 'position:relative;;label:Uikit-DropdownButton;',
      }
    : {
        name: 'yy44x2-Uikit-DropdownButton',
        styles: 'position:relative;;label:Uikit-DropdownButton;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2RGdCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAndWlraXQvVHlwb2dyYXBoeSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ3Vpa2l0L0J1dHRvbic7XG5pbXBvcnQgdXNlQ2xpY2tBd2F5IGZyb20gJ3Vpa2l0L3V0aWxzL3VzZUNsaWNrQXdheSc7XG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ3Vpa2l0L1RoZW1lUHJvdmlkZXInO1xuY29uc3QgTWVudUl0ZW0gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgcmV0dXJuICg8VHlwb2dyYXBoeSB2YXJpYW50PVwiZGVmYXVsdFwiIGFzPVwiZGl2XCIgey4uLnByb3BzfSBjc3M9e2NzcyBgXG4gICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZDogJHt0aGVtZS5jb2xvcnMuc2Vjb25kYXJ5XzR9O1xuICAgICAgICB9XG4gICAgICBgfS8+KTtcbn07XG5mdW5jdGlvbiBEcm9wZG93bkJ1dHRvbihfYSkge1xuICAgIHZhciB7IGNoaWxkcmVuLCBvbkl0ZW1DbGljaywgbWVudUl0ZW1zLCBtZW51U2hvd246IGNvbnRyb2xsZWRNZW51U2hvd1N0YXRlLCBvbkNsaWNrIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJvbkl0ZW1DbGlja1wiLCBcIm1lbnVJdGVtc1wiLCBcIm1lbnVTaG93blwiLCBcIm9uQ2xpY2tcIl0pO1xuICAgIGNvbnN0IFttZW51U2hvd24sIHNldE1lbnVTaG93bl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICAgIGNvbnN0IG1lbnVSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICB1c2VDbGlja0F3YXkoe1xuICAgICAgICBkb21FbGVtZW50UmVmOiBtZW51UmVmLFxuICAgICAgICBvbkNsaWNrQXdheTogKCkgPT4gc2V0TWVudVNob3duKGZhbHNlKSxcbiAgICAgICAgb25FbGVtZW50Q2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHNldE1lbnVTaG93bihmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuICg8QnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgIHNldE1lbnVTaG93bih0cnVlKTtcbiAgICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICB9fSBjc3M9e2NzcyBgXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGB9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICAgIHsobWVudVNob3duIHx8IGNvbnRyb2xsZWRNZW51U2hvd1N0YXRlID09PSB0cnVlKSAmJiAoIC8vIGV4cGxpY2l0IGNoZWNrIGJlY2F1c2UgdW5kZWZpbmVkIGlzIGZhbHN5XG4gICAgPGRpdiByZWY9e21lbnVSZWZ9IGNzcz17Y3NzIGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IDEwcHg7XG4gICAgICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDZweCAwIHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAgICAgICAgIGJvcmRlcjogc29saWQgMXB4ICR7dGhlbWUuY29sb3JzLmdyZXlfMX07XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoZW1lLmNvbG9ycy53aGl0ZX07XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgICBjb2xvcjogJHt0aGVtZS5jb2xvcnMuYmxhY2t9O1xuICAgICAgICAgIGB9PlxuICAgICAgICAgIHttZW51SXRlbXMubWFwKChpdGVtKSA9PiAoPE1lbnVJdGVtIGtleT17U3RyaW5nKGl0ZW0udmFsdWUpfSBvbkNsaWNrPXsoKSA9PiAocmVzdC5pc0xvYWRpbmcgPyBudWxsIDogb25JdGVtQ2xpY2soaXRlbSkpfSB7Li4uaXRlbX0+XG4gICAgICAgICAgICAgIHtpdGVtLmRpc3BsYXl9XG4gICAgICAgICAgICA8L01lbnVJdGVtPikpfVxuICAgICAgICA8L2Rpdj4pfVxuICAgIDwvQnV0dG9uPik7XG59XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

function DropdownButton(_a) {
  var children = _a.children,
    onItemClick = _a.onItemClick,
    menuItems = _a.menuItems,
    controlledMenuShowState = _a.menuShown,
    _onClick = _a.onClick,
    rest = __rest(_a, ['children', 'onItemClick', 'menuItems', 'menuShown', 'onClick']);

  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    menuShown = _React$useState2[0],
    setMenuShown = _React$useState2[1];

  var theme = (0, _ThemeProvider.useTheme)();
  var menuRef = /*#__PURE__*/ React.createRef();
  (0, _useClickAway['default'])({
    domElementRef: menuRef,
    onClickAway: function onClickAway() {
      return setMenuShown(false);
    },
    onElementClick: function onElementClick() {
      setMenuShown(false);
    },
  });
  return (0, _core.jsx)(
    _Button['default'],
    (0, _extends2['default'])(
      {
        onClick: function onClick(e) {
          setMenuShown(true);

          if (_onClick) {
            _onClick(e);
          }
        },
        css: _ref,
      },
      rest,
    ),
    children,
    (menuShown || controlledMenuShowState === true) && // explicit check because undefined is falsy
      (0, _core.jsx)(
        'div',
        {
          ref: menuRef,
          css: /*#__PURE__*/ (0, _core.css)(
            'position:absolute;top:100%;left:10px;right:10px;background:white;z-index:1000;border-radius:4px;box-shadow:0 1px 6px 0 rgba(0,0,0,0.1),0 1px 5px 0 rgba(0,0,0,0.08);border:solid 1px ',
            theme.colors.grey_1,
            ';background-color:',
            theme.colors.white,
            ';text-transform:none;text-align:left;color:',
            theme.colors.black,
            ';;label:Uikit-DropdownButton;' +
              (process.env.NODE_ENV === 'production'
                ? ''
                : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrRWdDIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAndWlraXQvVHlwb2dyYXBoeSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ3Vpa2l0L0J1dHRvbic7XG5pbXBvcnQgdXNlQ2xpY2tBd2F5IGZyb20gJ3Vpa2l0L3V0aWxzL3VzZUNsaWNrQXdheSc7XG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ3Vpa2l0L1RoZW1lUHJvdmlkZXInO1xuY29uc3QgTWVudUl0ZW0gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgcmV0dXJuICg8VHlwb2dyYXBoeSB2YXJpYW50PVwiZGVmYXVsdFwiIGFzPVwiZGl2XCIgey4uLnByb3BzfSBjc3M9e2NzcyBgXG4gICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZDogJHt0aGVtZS5jb2xvcnMuc2Vjb25kYXJ5XzR9O1xuICAgICAgICB9XG4gICAgICBgfS8+KTtcbn07XG5mdW5jdGlvbiBEcm9wZG93bkJ1dHRvbihfYSkge1xuICAgIHZhciB7IGNoaWxkcmVuLCBvbkl0ZW1DbGljaywgbWVudUl0ZW1zLCBtZW51U2hvd246IGNvbnRyb2xsZWRNZW51U2hvd1N0YXRlLCBvbkNsaWNrIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJvbkl0ZW1DbGlja1wiLCBcIm1lbnVJdGVtc1wiLCBcIm1lbnVTaG93blwiLCBcIm9uQ2xpY2tcIl0pO1xuICAgIGNvbnN0IFttZW51U2hvd24sIHNldE1lbnVTaG93bl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICAgIGNvbnN0IG1lbnVSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICB1c2VDbGlja0F3YXkoe1xuICAgICAgICBkb21FbGVtZW50UmVmOiBtZW51UmVmLFxuICAgICAgICBvbkNsaWNrQXdheTogKCkgPT4gc2V0TWVudVNob3duKGZhbHNlKSxcbiAgICAgICAgb25FbGVtZW50Q2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHNldE1lbnVTaG93bihmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuICg8QnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgIHNldE1lbnVTaG93bih0cnVlKTtcbiAgICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICAgIG9uQ2xpY2soZSk7XG4gICAgICAgIH1cbiAgICB9fSBjc3M9e2NzcyBgXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGB9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICAgIHsobWVudVNob3duIHx8IGNvbnRyb2xsZWRNZW51U2hvd1N0YXRlID09PSB0cnVlKSAmJiAoIC8vIGV4cGxpY2l0IGNoZWNrIGJlY2F1c2UgdW5kZWZpbmVkIGlzIGZhbHN5XG4gICAgPGRpdiByZWY9e21lbnVSZWZ9IGNzcz17Y3NzIGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IDEwcHg7XG4gICAgICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDZweCAwIHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAgICAgICAgIGJvcmRlcjogc29saWQgMXB4ICR7dGhlbWUuY29sb3JzLmdyZXlfMX07XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoZW1lLmNvbG9ycy53aGl0ZX07XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgICBjb2xvcjogJHt0aGVtZS5jb2xvcnMuYmxhY2t9O1xuICAgICAgICAgIGB9PlxuICAgICAgICAgIHttZW51SXRlbXMubWFwKChpdGVtKSA9PiAoPE1lbnVJdGVtIGtleT17U3RyaW5nKGl0ZW0udmFsdWUpfSBvbkNsaWNrPXsoKSA9PiAocmVzdC5pc0xvYWRpbmcgPyBudWxsIDogb25JdGVtQ2xpY2soaXRlbSkpfSB7Li4uaXRlbX0+XG4gICAgICAgICAgICAgIHtpdGVtLmRpc3BsYXl9XG4gICAgICAgICAgICA8L01lbnVJdGVtPikpfVxuICAgICAgICA8L2Rpdj4pfVxuICAgIDwvQnV0dG9uPik7XG59XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'),
          ),
        },
        menuItems.map(function (item) {
          return (0, _core.jsx)(
            MenuItem,
            (0, _extends2['default'])(
              {
                key: String(item.value),
                onClick: function onClick() {
                  return rest.isLoading ? null : onItemClick(item);
                },
              },
              item,
            ),
            item.display,
          );
        }),
      ),
  );
}

var _default = DropdownButton;
exports['default'] = _default;
