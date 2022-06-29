'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _react = _interopRequireDefault(require('react'));

var _isPropValid = _interopRequireDefault(require('@emotion/is-prop-valid'));

var _color = _interopRequireDefault(require('color'));

var _useTheme = _interopRequireDefault(require('../utils/useTheme'));

var _DnaLoader = _interopRequireDefault(require('../DnaLoader'));

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

var ContainerBackground = /*#__PURE__*/ (0, _styledBase['default'])('div', {
  shouldForwardProp: function shouldForwardProp(prop) {
    return (0, _isPropValid['default'])(prop) && prop !== 'loading';
  },
  target: 'e1wazmrb0',
  label: 'Uikit-ContainerBackground',
})(
  'border-radius:8px;position:relative;overflow:',
  function (props) {
    return props.loading ? 'hidden' : 'visible';
  },
  ';box-shadow:0 1px 6px 0 rgba(0,0,0,0.1),0 1px 5px 0 rgba(0,0,0,0.08);background-color:',
  function (_ref) {
    var theme = _ref.theme;
    return theme.colors.white;
  },
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQ0ciLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMCBUaGUgT250YXJpbyBJbnN0aXR1dGUgZm9yIENhbmNlciBSZXNlYXJjaC4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICpcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZlxuICogdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wLiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZXG4gKiBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVNcbiAqIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UXG4gKiBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCxcbiAqIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRFxuICogVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTO1xuICogT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU5cbiAqIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IGlzUHJvcFZhbGlkIGZyb20gJ0BlbW90aW9uL2lzLXByb3AtdmFsaWQnO1xuaW1wb3J0IGNvbG9yIGZyb20gJ2NvbG9yJztcbmltcG9ydCB1c2VUaGVtZSBmcm9tICcuLi91dGlscy91c2VUaGVtZSc7XG5pbXBvcnQgRG5hTG9hZGVyIGZyb20gJy4uL0RuYUxvYWRlcic7XG5jb25zdCBDb250YWluZXJCYWNrZ3JvdW5kID0gc3R5bGVkKCdkaXYnLCB7XG4gICAgc2hvdWxkRm9yd2FyZFByb3A6IChwcm9wKSA9PiBpc1Byb3BWYWxpZChwcm9wKSAmJiBwcm9wICE9PSAnbG9hZGluZycsXG59KSBgXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogJHsocHJvcHMpID0+IChwcm9wcy5sb2FkaW5nID8gJ2hpZGRlbicgOiAndmlzaWJsZScpfTtcbiAgYm94LXNoYWRvdzogMCAxcHggNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy53aGl0ZX07XG5gO1xuY29uc3QgTG9hZGluZ092ZXJsYXkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICAgIHJldHVybiAoPGRpdiBjc3M9e2NzcyBgXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICByaWdodDogMHB4O1xuICAgICAgICB0b3A6IDBweDtcbiAgICAgICAgYm90dG9tOiAwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7Y29sb3IodGhlbWUuY29sb3JzLndoaXRlKS5hbHBoYSgwLjcpLmhzbCgpLnN0cmluZygpfTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBgfT5cbiAgICAgIDxEbmFMb2FkZXIgLz5cbiAgICA8L2Rpdj4pO1xufTtcbmNvbnN0IENvbnRhaW5lciA9IChfYSkgPT4ge1xuICAgIHZhciB7IGNoaWxkcmVuLCBsb2FkaW5nID0gZmFsc2UgfSA9IF9hLCBwcm9wcyA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJsb2FkaW5nXCJdKTtcbiAgICByZXR1cm4gKDxDb250YWluZXJCYWNrZ3JvdW5kIGxvYWRpbmc9e2xvYWRpbmd9IHsuLi5wcm9wc30+XG4gICAge2NoaWxkcmVufVxuICAgIHtsb2FkaW5nICYmIDxMb2FkaW5nT3ZlcmxheSAvPn1cbiAgPC9Db250YWluZXJCYWNrZ3JvdW5kPik7XG59O1xuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
);

var LoadingOverlay = function LoadingOverlay() {
  var theme = (0, _useTheme['default'])();
  return (0, _core.jsx)(
    'div',
    {
      css: /*#__PURE__*/ (0, _core.css)(
        'position:absolute;left:0px;right:0px;top:0px;bottom:0px;background:',
        (0, _color['default'])(theme.colors.white).alpha(0.7).hsl().string(),
        ';display:flex;justify-content:center;align-items:center;;label:Uikit-LoadingOverlay;' +
          (process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQzBCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBpc1Byb3BWYWxpZCBmcm9tICdAZW1vdGlvbi9pcy1wcm9wLXZhbGlkJztcbmltcG9ydCBjb2xvciBmcm9tICdjb2xvcic7XG5pbXBvcnQgdXNlVGhlbWUgZnJvbSAnLi4vdXRpbHMvdXNlVGhlbWUnO1xuaW1wb3J0IERuYUxvYWRlciBmcm9tICcuLi9EbmFMb2FkZXInO1xuY29uc3QgQ29udGFpbmVyQmFja2dyb3VuZCA9IHN0eWxlZCgnZGl2Jywge1xuICAgIHNob3VsZEZvcndhcmRQcm9wOiAocHJvcCkgPT4gaXNQcm9wVmFsaWQocHJvcCkgJiYgcHJvcCAhPT0gJ2xvYWRpbmcnLFxufSkgYFxuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6ICR7KHByb3BzKSA9PiAocHJvcHMubG9hZGluZyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnKX07XG4gIGJveC1zaGFkb3c6IDAgMXB4IDZweCAwIHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMud2hpdGV9O1xuYDtcbmNvbnN0IExvYWRpbmdPdmVybGF5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICByZXR1cm4gKDxkaXYgY3NzPXtjc3MgYFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGJvdHRvbTogMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAke2NvbG9yKHRoZW1lLmNvbG9ycy53aGl0ZSkuYWxwaGEoMC43KS5oc2woKS5zdHJpbmcoKX07XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgYH0+XG4gICAgICA8RG5hTG9hZGVyIC8+XG4gICAgPC9kaXY+KTtcbn07XG5jb25zdCBDb250YWluZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjaGlsZHJlbiwgbG9hZGluZyA9IGZhbHNlIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcImNoaWxkcmVuXCIsIFwibG9hZGluZ1wiXSk7XG4gICAgcmV0dXJuICg8Q29udGFpbmVyQmFja2dyb3VuZCBsb2FkaW5nPXtsb2FkaW5nfSB7Li4ucHJvcHN9PlxuICAgIHtjaGlsZHJlbn1cbiAgICB7bG9hZGluZyAmJiA8TG9hZGluZ092ZXJsYXkgLz59XG4gIDwvQ29udGFpbmVyQmFja2dyb3VuZD4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'),
      ),
    },
    (0, _core.jsx)(_DnaLoader['default'], null),
  );
};

var Container = function Container(_a) {
  var children = _a.children,
    _a$loading = _a.loading,
    loading = _a$loading === void 0 ? false : _a$loading,
    props = __rest(_a, ['children', 'loading']);

  return (0, _core.jsx)(
    ContainerBackground,
    (0, _extends2['default'])(
      {
        loading: loading,
      },
      props,
    ),
    children,
    loading && (0, _core.jsx)(LoadingOverlay, null),
  );
};

var _default = Container;
exports['default'] = _default;
