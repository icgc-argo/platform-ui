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

var _ = _interopRequireDefault(require('./..'));

var _Tooltip = _interopRequireDefault(require('../../Tooltip'));

var _ThemeProvider = require('../../ThemeProvider');

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

// dims corresponding hex code for a 25% dim
var dimColour = function dimColour(hex) {
  return ''.concat(hex, 'BF');
};

var InteractiveIcon = function InteractiveIcon(_a) {
  var disabled = _a.disabled,
    _onClick = _a.onClick,
    name = _a.name,
    className = _a.className,
    title = _a.title,
    width = _a.width,
    height = _a.height,
    fill = _a.fill,
    hoverFill = _a.hoverFill,
    outline = _a.outline,
    props = __rest(_a, [
      'disabled',
      'onClick',
      'name',
      'className',
      'title',
      'width',
      'height',
      'fill',
      'hoverFill',
      'outline',
    ]);

  var _React$useState = _react['default'].useState(false),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    hovered = _React$useState2[0],
    setHovered = _React$useState2[1];

  var theme = (0, _ThemeProvider.useTheme)();
  var fillColour = (fill && theme.colors[fill]) || fill || theme.colors.accent2;
  var hoverColour = hoverFill || dimColour(fillColour);
  return (0, _core.jsx)(
    _Tooltip['default'],
    (0, _extends2['default'])(
      {
        hideOnClick: false,
      },
      props,
      {
        unmountHTMLWhenHide: true,
      },
    ),
    (0, _core.jsx)(_['default'], {
      css: /*#__PURE__*/ (0, _core.css)(
        disabled ? '' : 'cursor: pointer',
        ';;label:Uikit-InteractiveIcon;' +
          (process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQ3FCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBJY29uIGZyb20gJ3Vpa2l0L0ljb24nO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAndWlraXQvVG9vbHRpcCc7XG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ3Vpa2l0L1RoZW1lUHJvdmlkZXInO1xuLy8gZGltcyBjb3JyZXNwb25kaW5nIGhleCBjb2RlIGZvciBhIDI1JSBkaW1cbmNvbnN0IGRpbUNvbG91ciA9IChoZXgpID0+IGAke2hleH1CRmA7XG5jb25zdCBJbnRlcmFjdGl2ZUljb24gPSAoX2EpID0+IHtcbiAgICB2YXIgeyBkaXNhYmxlZCwgb25DbGljaywgbmFtZSwgY2xhc3NOYW1lLCB0aXRsZSwgd2lkdGgsIGhlaWdodCwgZmlsbCwgaG92ZXJGaWxsLCBvdXRsaW5lIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcImRpc2FibGVkXCIsIFwib25DbGlja1wiLCBcIm5hbWVcIiwgXCJjbGFzc05hbWVcIiwgXCJ0aXRsZVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwiZmlsbFwiLCBcImhvdmVyRmlsbFwiLCBcIm91dGxpbmVcIl0pO1xuICAgIGNvbnN0IFtob3ZlcmVkLCBzZXRIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3QgZmlsbENvbG91ciA9IChmaWxsICYmIHRoZW1lLmNvbG9yc1tmaWxsXSkgfHwgZmlsbCB8fCB0aGVtZS5jb2xvcnMuYWNjZW50MjtcbiAgICBjb25zdCBob3ZlckNvbG91ciA9IGhvdmVyRmlsbCB8fCBkaW1Db2xvdXIoZmlsbENvbG91cik7XG4gICAgcmV0dXJuICg8VG9vbHRpcCBoaWRlT25DbGljaz17ZmFsc2V9IHsuLi5wcm9wc30gdW5tb3VudEhUTUxXaGVuSGlkZT5cbiAgICAgIDxJY29uIGNzcz17Y3NzIGBcbiAgICAgICAgICAke2Rpc2FibGVkID8gJycgOiAnY3Vyc29yOiBwb2ludGVyJ307XG4gICAgICAgIGB9IG9uTW91c2VPdmVyPXsoKSA9PiBzZXRIb3ZlcmVkKHRydWUpfSBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfSBvbkNsaWNrPXsoZSkgPT4gKCFkaXNhYmxlZCA/IG9uQ2xpY2soZSkgOiBmYWxzZSl9IGZpbGw9e2Rpc2FibGVkID8gJ2dyZXlfMicgOiBob3ZlcmVkID8gYCR7aG92ZXJDb2xvdXJ9YCA6IGAke2ZpbGxDb2xvdXJ9YH0gbmFtZT17bmFtZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHRpdGxlPXt0aXRsZX0gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gb3V0bGluZT17b3V0bGluZX0vPlxuICAgIDwvVG9vbHRpcD4pO1xufTtcbkludGVyYWN0aXZlSWNvbi5wcm9wVHlwZXMgPSBJY29uLnByb3BUeXBlcztcbmV4cG9ydCBkZWZhdWx0IEludGVyYWN0aXZlSWNvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'),
      ),
      onMouseOver: function onMouseOver() {
        return setHovered(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHovered(false);
      },
      onClick: function onClick(e) {
        return !disabled ? _onClick(e) : false;
      },
      fill: disabled ? 'grey_2' : hovered ? ''.concat(hoverColour) : ''.concat(fillColour),
      name: name,
      className: className,
      title: title,
      width: width,
      height: height,
      outline: outline,
    }),
  );
};

InteractiveIcon.propTypes = _['default'].propTypes;
var _default = InteractiveIcon;
exports['default'] = _default;
