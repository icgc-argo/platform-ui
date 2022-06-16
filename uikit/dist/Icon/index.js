'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.ICON_NAMES = exports.BUILT_IN_ICON_COLORS = void 0;

var _core = require('@emotion/core');

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _react = _interopRequireDefault(require('react'));

var _icons = _interopRequireDefault(require('./icons'));

var _useTheme = _interopRequireDefault(require('../utils/useTheme'));

var _defaultTheme = _interopRequireDefault(require('../theme/defaultTheme'));

var _get = _interopRequireDefault(require('lodash/get'));

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

var Icon = function Icon(_a) {
  var name = _a.name,
    width = _a.width,
    height = _a.height,
    fill = _a.fill,
    className = _a.className,
    title = _a.title,
    outline = _a.outline,
    rest = __rest(_a, ['name', 'width', 'height', 'fill', 'className', 'title', 'outline']);

  var theme = (0, _useTheme['default'])();
  var svg = _icons['default'][name];

  var resolveFill = function resolveFill(fill) {
    return (fill && theme.colors[fill]) || fill;
  };

  var resolveOutline = function resolveOutline(outline) {
    return outline
      ? Object.assign(Object.assign({}, outline), {
          color: resolveFill(outline.color),
        })
      : null;
  };

  return (0, _core.jsx)(
    'svg',
    (0, _extends2['default'])(
      {
        css: /*#__PURE__*/ (0, _core.css)(
          svg.css || '',
          ' height:',
          height,
          ';width:',
          width,
          ';;label:Uikit-Icon;' +
            (process.env.NODE_ENV === 'production'
              ? ''
              : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QzBCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB1c2VUaGVtZSBmcm9tICcuLi91dGlscy91c2VUaGVtZSc7XG5pbXBvcnQgZGVmYXVsdFRoZW1lIGZyb20gJy4uL3RoZW1lL2RlZmF1bHRUaGVtZSc7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xuY29uc3QgSWNvbiA9IChfYSkgPT4ge1xuICAgIHZhciB7IG5hbWUsIHdpZHRoLCBoZWlnaHQsIGZpbGwsIGNsYXNzTmFtZSwgdGl0bGUsIG91dGxpbmUgfSA9IF9hLCByZXN0ID0gX19yZXN0KF9hLCBbXCJuYW1lXCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIiwgXCJmaWxsXCIsIFwiY2xhc3NOYW1lXCIsIFwidGl0bGVcIiwgXCJvdXRsaW5lXCJdKTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3Qgc3ZnID0gaWNvbnNbbmFtZV07XG4gICAgY29uc3QgcmVzb2x2ZUZpbGwgPSAoZmlsbCkgPT4gKGZpbGwgJiYgdGhlbWUuY29sb3JzW2ZpbGxdKSB8fCBmaWxsO1xuICAgIGNvbnN0IHJlc29sdmVPdXRsaW5lID0gKG91dGxpbmUpID0+IG91dGxpbmUgPyBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG91dGxpbmUpLCB7IGNvbG9yOiByZXNvbHZlRmlsbChvdXRsaW5lLmNvbG9yKSB9KSA6IG51bGw7XG4gICAgcmV0dXJuICg8c3ZnIGNzcz17Y3NzIGBcbiAgICAgICAgJHtzdmcuY3NzIHx8ICcnfVxuICAgICAgICBoZWlnaHQ6ICR7aGVpZ2h0fTtcbiAgICAgICAgd2lkdGg6ICR7d2lkdGh9O1xuICAgICAgYH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e3N2Zy52aWV3Qm94fSB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgey4uLnJlc3R9PlxuICAgICAgPGc+XG4gICAgICAgIHtzdmcubWFzayA/ICg8bWFzayBpZD1cIm1hc2tcIiBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgICAgPHBhdGggZD17c3ZnLm1hc2t9Lz5cbiAgICAgICAgICA8L21hc2s+KSA6IG51bGx9XG4gICAgICAgIHtzdmcucGF0aERlZmluaXRpb25zID8gKHN2Zy5wYXRoRGVmaW5pdGlvbnMubWFwKChwYXRoRGVmLCBpKSA9PiAoPHBhdGgga2V5PXtpfSBmaWxsPXtwYXRoRGVmLmZpbGwgfHwgcmVzb2x2ZUZpbGwoZmlsbCkgfHwgcGF0aERlZi5kZWZhdWx0RmlsbCB8fCBzdmcuZGVmYXVsdEZpbGx9IHN0cm9rZT17Z2V0KHJlc29sdmVPdXRsaW5lKG91dGxpbmUpLCAnY29sb3InLCBudWxsKX0gc3Ryb2tlV2lkdGg9e2dldChyZXNvbHZlT3V0bGluZShvdXRsaW5lKSwgJ3dpZHRoJywgbnVsbCl9IGZpbGxSdWxlPXtwYXRoRGVmLmZpbGxSdWxlIHx8IHN2Zy5maWxsUnVsZSB8fCAnbm9uemVybyd9IGQ9e3BhdGhEZWYuZH0gbWFzaz17cGF0aERlZi5tYXNrIHx8IHN2Zy5tYXNrID8gJ3VybCgjbWFzayknIDogJyd9Lz4pKSkgOiAoPHBhdGggZmlsbD17cmVzb2x2ZUZpbGwoZmlsbCkgfHwgc3ZnLmRlZmF1bHRGaWxsfSBzdHJva2U9e2dldChyZXNvbHZlT3V0bGluZShvdXRsaW5lKSwgJ2NvbG9yJywgbnVsbCl9IHN0cm9rZVdpZHRoPXtnZXQocmVzb2x2ZU91dGxpbmUob3V0bGluZSksICd3aWR0aCcsIG51bGwpfSBmaWxsUnVsZT17c3ZnLmZpbGxSdWxlIHx8ICdub256ZXJvJ30gZD17c3ZnLnBhdGh9IG1hc2s9e3N2Zy5tYXNrID8gJ3VybCgjbWFzayknIDogJyd9Lz4pfVxuICAgICAgPC9nPlxuICAgIDwvc3ZnPik7XG59O1xuY29uc3QgdG9LZXlWYWx1ZU1hcCA9IChhY2MsIFtrZXksIHZhbHVlXSkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYWNjKSwgeyBba2V5XToga2V5LCBbdmFsdWVdOiB2YWx1ZSB9KSk7XG5leHBvcnQgY29uc3QgSUNPTl9OQU1FUyA9IE9iamVjdC5mcmVlemUoT2JqZWN0LmVudHJpZXMoaWNvbnMpLnJlZHVjZSh0b0tleVZhbHVlTWFwLCB7fSkpO1xuZXhwb3J0IGNvbnN0IEJVSUxUX0lOX0lDT05fQ09MT1JTID0gT2JqZWN0LmZyZWV6ZShPYmplY3QuZW50cmllcyhkZWZhdWx0VGhlbWUuY29sb3JzKS5yZWR1Y2UodG9LZXlWYWx1ZU1hcCwge30pKTtcbmV4cG9ydCBkZWZhdWx0IEljb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */'),
        ),
        className: className,
        width: width,
        height: height,
        viewBox: svg.viewBox,
        xmlns: 'http://www.w3.org/2000/svg',
      },
      rest,
    ),
    (0, _core.jsx)(
      'g',
      null,
      svg.mask
        ? (0, _core.jsx)(
            'mask',
            {
              id: 'mask',
              fill: '#fff',
            },
            (0, _core.jsx)('path', {
              d: svg.mask,
            }),
          )
        : null,
      svg.pathDefinitions
        ? svg.pathDefinitions.map(function (pathDef, i) {
            return (0, _core.jsx)('path', {
              key: i,
              fill: pathDef.fill || resolveFill(fill) || pathDef.defaultFill || svg.defaultFill,
              stroke: (0, _get['default'])(resolveOutline(outline), 'color', null),
              strokeWidth: (0, _get['default'])(resolveOutline(outline), 'width', null),
              fillRule: pathDef.fillRule || svg.fillRule || 'nonzero',
              d: pathDef.d,
              mask: pathDef.mask || svg.mask ? 'url(#mask)' : '',
            });
          })
        : (0, _core.jsx)('path', {
            fill: resolveFill(fill) || svg.defaultFill,
            stroke: (0, _get['default'])(resolveOutline(outline), 'color', null),
            strokeWidth: (0, _get['default'])(resolveOutline(outline), 'width', null),
            fillRule: svg.fillRule || 'nonzero',
            d: svg.path,
            mask: svg.mask ? 'url(#mask)' : '',
          }),
    ),
  );
};

var toKeyValueMap = function toKeyValueMap(acc, _ref) {
  var _Object$assign;

  var _ref2 = (0, _slicedToArray2['default'])(_ref, 2),
    key = _ref2[0],
    value = _ref2[1];

  return Object.assign(
    Object.assign({}, acc),
    ((_Object$assign = {}),
    (0, _defineProperty2['default'])(_Object$assign, key, key),
    (0, _defineProperty2['default'])(_Object$assign, value, value),
    _Object$assign),
  );
};

var ICON_NAMES = Object.freeze(Object.entries(_icons['default']).reduce(toKeyValueMap, {}));
exports.ICON_NAMES = ICON_NAMES;
var BUILT_IN_ICON_COLORS = Object.freeze(
  Object.entries(_defaultTheme['default'].colors).reduce(toKeyValueMap, {}),
);
exports.BUILT_IN_ICON_COLORS = BUILT_IN_ICON_COLORS;
var _default = Icon;
exports['default'] = _default;
