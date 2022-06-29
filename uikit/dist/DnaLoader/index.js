'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _taggedTemplateLiteral2 = _interopRequireDefault(
  require('@babel/runtime/helpers/taggedTemplateLiteral'),
);

var _css2 = _interopRequireDefault(require('@emotion/css'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _range = _interopRequireDefault(require('lodash/range'));

var _templateObject;

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

var LoaderContainer = (0, _styledBase['default'])('div')(
  _templateObject ||
    (_templateObject = (0, _taggedTemplateLiteral2['default'])([
      '\n  padding-top: 15px;\n  padding-bottom: 15px;\n  width: ',
      'px;\n\n  div:nth-of-type(odd) {\n    position: absolute;\n  }\n  div:nth-of-type(even) {\n    width: ',
      'px;\n  }\n  span {\n    display: inline-block;\n    position: relative;\n    width: 10px;\n    height: 10px;\n    background-color: white;\n    border-radius: 50%;\n    transform: scale(0, 0);\n  }\n\n  ',
      '\n\n  @keyframes animateFirstDots {\n    0% {\n      transform: translateY(200%) scale(0.7, 0.7);\n      background-color: ',
      ';\n    }\n    100% {\n      transform: translateY(-200%) scale(1, 1);\n      background-color: ',
      ';\n    }\n  }\n  @keyframes animateSecondDots {\n    0% {\n      transform: translateY(200%) scale(0.7, 0.7);\n      background-color: ',
      ';\n    }\n    100% {\n      transform: translateY(-200%) scale(1, 1);\n      background-color: ',
      ';\n    }\n  }\n',
    ])),
  function (_ref) {
    var dotsCount = _ref.dotsCount;
    return dotsCount * 10;
  },
  function (_ref2) {
    var dotsCount = _ref2.dotsCount;
    return dotsCount * 10;
  },
  function (_ref3) {
    var dotsCount = _ref3.dotsCount;
    return (0, _range['default'])(1, dotsCount + 1).map(function (i) {
      return /*#__PURE__*/ (0,
      _css2[
        'default'
      ])('div:nth-of-type(odd) span:nth-of-type(', i, '){animation:animateFirstDots 0.8s ease-in-out infinite;animation-direction:alternate;animation-delay:', i * 0.2, 's;}div:nth-of-type(even) span:nth-of-type(', i, '){animation:animateSecondDots 0.8s ease-in-out infinite;animation-direction:alternate-reverse;animation-delay:', i * 0.2, 's;};label:Uikit-LoaderContainer;' + (process.env.NODE_ENV === 'production' ? '' : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1RDREIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQtYmFzZSc7XG5pbXBvcnQgY3NzIGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgcmFuZ2UgZnJvbSAnbG9kYXNoL3JhbmdlJztcbmNvbnN0IExvYWRlckNvbnRhaW5lciA9IHN0eWxlZCgnZGl2JykgYFxuICBwYWRkaW5nLXRvcDogMTVweDtcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7XG4gIHdpZHRoOiAkeyh7IGRvdHNDb3VudCB9KSA9PiBkb3RzQ291bnQgKiAxMH1weDtcblxuICBkaXY6bnRoLW9mLXR5cGUob2RkKSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICB9XG4gIGRpdjpudGgtb2YtdHlwZShldmVuKSB7XG4gICAgd2lkdGg6ICR7KHsgZG90c0NvdW50IH0pID0+IGRvdHNDb3VudCAqIDEwfXB4O1xuICB9XG4gIHNwYW4ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwcHg7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAsIDApO1xuICB9XG5cbiAgJHsoeyBkb3RzQ291bnQgfSkgPT4gcmFuZ2UoMSwgZG90c0NvdW50ICsgMSkubWFwKGkgPT4gY3NzIGBcbiAgICAgICAgZGl2Om50aC1vZi10eXBlKG9kZCkgc3BhbjpudGgtb2YtdHlwZSgke2l9KSB7XG4gICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRlRmlyc3REb3RzIDAuOHMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG4gICAgICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogJHtpICogMC4yfXM7XG4gICAgICAgIH1cbiAgICAgICAgZGl2Om50aC1vZi10eXBlKGV2ZW4pIHNwYW46bnRoLW9mLXR5cGUoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0ZVNlY29uZERvdHMgMC44cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICAgICAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGUtcmV2ZXJzZTtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6ICR7aSAqIDAuMn1zO1xuICAgICAgICB9XG4gICAgICBgKX1cblxuICBAa2V5ZnJhbWVzIGFuaW1hdGVGaXJzdERvdHMge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMDAlKSBzY2FsZSgwLjcsIDAuNyk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5hY2NlbnQxfTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwMCUpIHNjYWxlKDEsIDEpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMuc2Vjb25kYXJ5fTtcbiAgICB9XG4gIH1cbiAgQGtleWZyYW1lcyBhbmltYXRlU2Vjb25kRG90cyB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwMCUpIHNjYWxlKDAuNywgMC43KTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzLmFjY2VudDR9O1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAwJSkgc2NhbGUoMSwgMSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy53YXJuaW5nfTtcbiAgICB9XG4gIH1cbmA7XG5jb25zdCBEbmFMb2FkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBkb3RzQ291bnQgPSA1IH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiZG90c0NvdW50XCJdKTtcbiAgICByZXR1cm4gKDxMb2FkZXJDb250YWluZXIgY2xhc3NOYW1lPVwiZG5hLWxvYWRlclwiIGRvdHNDb3VudD17ZG90c0NvdW50fSB7Li4ucmVzdH0+XG4gICAgPGRpdj5cbiAgICAgIHtyYW5nZSgwLCBkb3RzQ291bnQpLm1hcChpID0+ICg8c3BhbiBrZXk9e2l9Lz4pKX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAge3JhbmdlKDAsIGRvdHNDb3VudCkubWFwKGkgPT4gKDxzcGFuIGtleT17aX0vPikpfVxuICAgIDwvZGl2PlxuICA8L0xvYWRlckNvbnRhaW5lcj4pO1xufTtcbkRuYUxvYWRlci5wcm9wVHlwZXMgPSB7XG4gICAgZG90c0NvdW50OiBQcm9wVHlwZXMubnVtYmVyLFxufTtcbmV4cG9ydCBkZWZhdWx0IERuYUxvYWRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'));
    });
  },
  function (_ref4) {
    var theme = _ref4.theme;
    return theme.colors.accent1;
  },
  function (_ref5) {
    var theme = _ref5.theme;
    return theme.colors.secondary;
  },
  function (_ref6) {
    var theme = _ref6.theme;
    return theme.colors.accent4;
  },
  function (_ref7) {
    var theme = _ref7.theme;
    return theme.colors.warning;
  },
);

var DnaLoader = function DnaLoader(_a) {
  var _a$dotsCount = _a.dotsCount,
    dotsCount = _a$dotsCount === void 0 ? 5 : _a$dotsCount,
    rest = __rest(_a, ['dotsCount']);

  return (0, _core.jsx)(
    LoaderContainer,
    (0, _extends2['default'])(
      {
        className: 'dna-loader',
        dotsCount: dotsCount,
      },
      rest,
    ),
    (0, _core.jsx)(
      'div',
      null,
      (0, _range['default'])(0, dotsCount).map(function (i) {
        return (0, _core.jsx)('span', {
          key: i,
        });
      }),
    ),
    (0, _core.jsx)(
      'div',
      null,
      (0, _range['default'])(0, dotsCount).map(function (i) {
        return (0, _core.jsx)('span', {
          key: i,
        });
      }),
    ),
  );
};

DnaLoader.propTypes = {
  dotsCount: _propTypes['default'].number,
};
var _default = DnaLoader;
exports['default'] = _default;
