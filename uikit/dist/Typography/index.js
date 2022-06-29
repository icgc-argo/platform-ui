'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var React = _interopRequireWildcard(require('react'));

var _memoize = _interopRequireDefault(require('lodash/memoize'));

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

var defaultTags = {
  hero: 'h1',
  title: 'h2',
  subtitle: 'h3',
  subtitle2: 'h4',
  paragraph: 'p',
  span: 'span',
};
var createTypographyComponentMapFromTheme = (0, _memoize['default'])(function (themeObj) {
  return Object.entries(themeObj.typography).reduce(function (acc, _ref) {
    var _ref2 = (0, _slicedToArray2['default'])(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

    return Object.assign(
      Object.assign({}, acc),
      (0, _defineProperty2['default'])(
        {},
        key,
        /*#__PURE__*/ (0, _styledBase['default'])(defaultTags[key] || 'span', {
          target: 'e15g2fdp0',
        })(
          '',
          function (_ref3) {
            var theme = _ref3.theme;
            return theme.typography[key];
          },
          process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5Q3NMIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC9tZW1vaXplJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vVGhlbWVQcm92aWRlcic7XG5jb25zdCBkZWZhdWx0VGFncyA9IHtcbiAgICBoZXJvOiAnaDEnLFxuICAgIHRpdGxlOiAnaDInLFxuICAgIHN1YnRpdGxlOiAnaDMnLFxuICAgIHN1YnRpdGxlMjogJ2g0JyxcbiAgICBwYXJhZ3JhcGg6ICdwJyxcbiAgICBzcGFuOiAnc3BhbicsXG59O1xuY29uc3QgY3JlYXRlVHlwb2dyYXBoeUNvbXBvbmVudE1hcEZyb21UaGVtZSA9IG1lbW9pemUoKHRoZW1lT2JqKSA9PiBPYmplY3QuZW50cmllcyh0aGVtZU9iai50eXBvZ3JhcGh5KS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhY2MpLCB7IFtrZXldOiBzdHlsZWQoZGVmYXVsdFRhZ3Nba2V5XSB8fCAnc3BhbicpKHt9LCAoeyB0aGVtZSB9KSA9PiB0aGVtZS50eXBvZ3JhcGh5W2tleV0pIH0pKSwge30pKTtcbmNvbnN0IGNyZWF0ZURvbUNvbXBvbmVudCA9IG1lbW9pemUoKGRvbUNvbXBvbmVudE5hbWUsIGNvbXBvbmVudHMsIHZhcmlhbnQpID0+IGNvbXBvbmVudHNbdmFyaWFudF0ud2l0aENvbXBvbmVudChkb21Db21wb25lbnROYW1lKSwgXG4vKiogQHRvZG86IHRoaXMgY2FjaGUta2V5IHJlc29sdXRpb24gZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21wb25lbnRzLCBzbyB0aGVtZSBjaGFuZ2Ugd29uJ3QgcHJvcGVybHkgY2hhbmdlIHR5cG9ncmFwaHkgYXRtLiBOZWVkIHRvIGZpeCB0aGlzISAgKi9cbihkb21Db21wb25lbnROYW1lLCBjb21wb25lbnRzLCB2YXJpYW50KSA9PiBgJHtkb21Db21wb25lbnROYW1lfS4ke3ZhcmlhbnR9YCk7XG5jb25zdCBjcmVhdGVTdHlsZWREb21Db21wb25lbnQgPSBtZW1vaXplKChDb21wb25lbnQpID0+IHN0eWxlZChDb21wb25lbnQpIGBcbiAgICBmb250LXdlaWdodDogJHsoeyBib2xkIH0pID0+IChib2xkID8gYGJvbGRgIDogYG5vcm1hbGApfTtcbiAgICBjb2xvcjogJHsoeyB0aGVtZSwgY29sb3IgfSkgPT4gKGNvbG9yID8gdGhlbWUuY29sb3JzW2NvbG9yXSB8fCBjb2xvciA6ICdpbmhlcml0Jyl9O1xuICBgKTtcbmNvbnN0IFR5cG9ncmFwaHkgPSAoX2EpID0+IHtcbiAgICB2YXIgeyB2YXJpYW50ID0gJ3BhcmFncmFwaCcsIGNvbXBvbmVudDogZG9tQ29tcG9uZW50TmFtZSwgYm9sZCA9IGZhbHNlLCBjb2xvciB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInZhcmlhbnRcIiwgXCJjb21wb25lbnRcIiwgXCJib2xkXCIsIFwiY29sb3JcIl0pO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICBjb25zdCBjb21wb25lbnRNYXAgPSBjcmVhdGVUeXBvZ3JhcGh5Q29tcG9uZW50TWFwRnJvbVRoZW1lKHRoZW1lKTtcbiAgICBjb25zdCBDb21wb25lbnQgPSBkb21Db21wb25lbnROYW1lXG4gICAgICAgID8gY3JlYXRlRG9tQ29tcG9uZW50KGRvbUNvbXBvbmVudE5hbWUsIGNvbXBvbmVudE1hcCwgdmFyaWFudClcbiAgICAgICAgOiBjb21wb25lbnRNYXBbdmFyaWFudF07XG4gICAgY29uc3QgU3R5bGVkVGV4dCA9IGNyZWF0ZVN0eWxlZERvbUNvbXBvbmVudChDb21wb25lbnQpO1xuICAgIHJldHVybiA8U3R5bGVkVGV4dCB7Li4ucmVzdH0gYm9sZD17Ym9sZH0gY29sb3I9e2NvbG9yfS8+O1xufTtcbmV4cG9ydCBkZWZhdWx0IFR5cG9ncmFwaHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        ),
      ),
    );
  }, {});
});
var createDomComponent = (0, _memoize['default'])(
  function (domComponentName, components, variant) {
    return components[variant].withComponent(domComponentName, {
      target: 'e15g2fdp2',
    });
  },
  /** @todo: this cache-key resolution doesn't take into account components, so theme change won't properly change typography atm. Need to fix this!  */
  function (domComponentName, components, variant) {
    return ''.concat(domComponentName, '.').concat(variant);
  },
);
var createStyledDomComponent = (0, _memoize['default'])(function (Component) {
  return /*#__PURE__*/ (0, _styledBase['default'])(Component, {
    target: 'e15g2fdp1',
  })(
    'font-weight:',
    function (_ref4) {
      var bold = _ref4.bold;
      return bold ? 'bold' : 'normal';
    },
    ';color:',
    function (_ref5) {
      var theme = _ref5.theme,
        color = _ref5.color;
      return color ? theme.colors[color] || color : 'inherit';
    },
    ';' +
      (process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QzBFIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC9tZW1vaXplJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vVGhlbWVQcm92aWRlcic7XG5jb25zdCBkZWZhdWx0VGFncyA9IHtcbiAgICBoZXJvOiAnaDEnLFxuICAgIHRpdGxlOiAnaDInLFxuICAgIHN1YnRpdGxlOiAnaDMnLFxuICAgIHN1YnRpdGxlMjogJ2g0JyxcbiAgICBwYXJhZ3JhcGg6ICdwJyxcbiAgICBzcGFuOiAnc3BhbicsXG59O1xuY29uc3QgY3JlYXRlVHlwb2dyYXBoeUNvbXBvbmVudE1hcEZyb21UaGVtZSA9IG1lbW9pemUoKHRoZW1lT2JqKSA9PiBPYmplY3QuZW50cmllcyh0aGVtZU9iai50eXBvZ3JhcGh5KS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhY2MpLCB7IFtrZXldOiBzdHlsZWQoZGVmYXVsdFRhZ3Nba2V5XSB8fCAnc3BhbicpKHt9LCAoeyB0aGVtZSB9KSA9PiB0aGVtZS50eXBvZ3JhcGh5W2tleV0pIH0pKSwge30pKTtcbmNvbnN0IGNyZWF0ZURvbUNvbXBvbmVudCA9IG1lbW9pemUoKGRvbUNvbXBvbmVudE5hbWUsIGNvbXBvbmVudHMsIHZhcmlhbnQpID0+IGNvbXBvbmVudHNbdmFyaWFudF0ud2l0aENvbXBvbmVudChkb21Db21wb25lbnROYW1lKSwgXG4vKiogQHRvZG86IHRoaXMgY2FjaGUta2V5IHJlc29sdXRpb24gZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCBjb21wb25lbnRzLCBzbyB0aGVtZSBjaGFuZ2Ugd29uJ3QgcHJvcGVybHkgY2hhbmdlIHR5cG9ncmFwaHkgYXRtLiBOZWVkIHRvIGZpeCB0aGlzISAgKi9cbihkb21Db21wb25lbnROYW1lLCBjb21wb25lbnRzLCB2YXJpYW50KSA9PiBgJHtkb21Db21wb25lbnROYW1lfS4ke3ZhcmlhbnR9YCk7XG5jb25zdCBjcmVhdGVTdHlsZWREb21Db21wb25lbnQgPSBtZW1vaXplKChDb21wb25lbnQpID0+IHN0eWxlZChDb21wb25lbnQpIGBcbiAgICBmb250LXdlaWdodDogJHsoeyBib2xkIH0pID0+IChib2xkID8gYGJvbGRgIDogYG5vcm1hbGApfTtcbiAgICBjb2xvcjogJHsoeyB0aGVtZSwgY29sb3IgfSkgPT4gKGNvbG9yID8gdGhlbWUuY29sb3JzW2NvbG9yXSB8fCBjb2xvciA6ICdpbmhlcml0Jyl9O1xuICBgKTtcbmNvbnN0IFR5cG9ncmFwaHkgPSAoX2EpID0+IHtcbiAgICB2YXIgeyB2YXJpYW50ID0gJ3BhcmFncmFwaCcsIGNvbXBvbmVudDogZG9tQ29tcG9uZW50TmFtZSwgYm9sZCA9IGZhbHNlLCBjb2xvciB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInZhcmlhbnRcIiwgXCJjb21wb25lbnRcIiwgXCJib2xkXCIsIFwiY29sb3JcIl0pO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICBjb25zdCBjb21wb25lbnRNYXAgPSBjcmVhdGVUeXBvZ3JhcGh5Q29tcG9uZW50TWFwRnJvbVRoZW1lKHRoZW1lKTtcbiAgICBjb25zdCBDb21wb25lbnQgPSBkb21Db21wb25lbnROYW1lXG4gICAgICAgID8gY3JlYXRlRG9tQ29tcG9uZW50KGRvbUNvbXBvbmVudE5hbWUsIGNvbXBvbmVudE1hcCwgdmFyaWFudClcbiAgICAgICAgOiBjb21wb25lbnRNYXBbdmFyaWFudF07XG4gICAgY29uc3QgU3R5bGVkVGV4dCA9IGNyZWF0ZVN0eWxlZERvbUNvbXBvbmVudChDb21wb25lbnQpO1xuICAgIHJldHVybiA8U3R5bGVkVGV4dCB7Li4ucmVzdH0gYm9sZD17Ym9sZH0gY29sb3I9e2NvbG9yfS8+O1xufTtcbmV4cG9ydCBkZWZhdWx0IFR5cG9ncmFwaHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */'),
  );
});

var Typography = function Typography(_a) {
  var _a$variant = _a.variant,
    variant = _a$variant === void 0 ? 'paragraph' : _a$variant,
    domComponentName = _a.component,
    _a$bold = _a.bold,
    bold = _a$bold === void 0 ? false : _a$bold,
    color = _a.color,
    rest = __rest(_a, ['variant', 'component', 'bold', 'color']);

  var theme = (0, _ThemeProvider.useTheme)();
  var componentMap = createTypographyComponentMapFromTheme(theme);
  var Component = domComponentName
    ? createDomComponent(domComponentName, componentMap, variant)
    : componentMap[variant];
  var StyledText = createStyledDomComponent(Component);
  return (0, _core.jsx)(
    StyledText,
    (0, _extends2['default'])({}, rest, {
      bold: bold,
      color: color,
    }),
  );
};

var _default = Typography;
exports['default'] = _default;
