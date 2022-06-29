'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireDefault(require('react'));

var _Icon = _interopRequireDefault(require('../Icon'));

var _useTheme = _interopRequireDefault(require('../utils/useTheme'));

var _constants = require('./constants');

var _styled = _interopRequireDefault(require('./styled'));

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
var __awaiter =
  (void 0 && (void 0).__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

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
        name: '1gqi2cv-Uikit-Button',
        styles: 'margin-right:5px;;label:Uikit-Button;',
      }
    : {
        name: '1gqi2cv-Uikit-Button',
        styles: 'margin-right:5px;;label:Uikit-Button;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0RHVHIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vSWNvbic7XG5pbXBvcnQgdXNlVGhlbWUgZnJvbSAnLi4vdXRpbHMvdXNlVGhlbWUnO1xuaW1wb3J0IHsgQlVUVE9OX1ZBUklBTlRTLCBCVVRUT05fU0laRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3R5bGVkQnV0dG9uIGZyb20gJy4vc3R5bGVkJztcbmNvbnN0IEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIG9uQ2xpY2sgPSAoZSkgPT4geyB9LCBvbkJsdXIgPSAoZSkgPT4geyB9LCBkaXNhYmxlZCA9IGZhbHNlLCB2YXJpYW50ID0gQlVUVE9OX1ZBUklBTlRTLlBSSU1BUlksIHNpemUgPSB2YXJpYW50ID09PSBCVVRUT05fVkFSSUFOVFMuU0VDT05EQVJZID8gQlVUVE9OX1NJWkVTLlNNIDogQlVUVE9OX1NJWkVTLk1ELCBpc0FzeW5jID0gZmFsc2UsIGNsYXNzTmFtZSwgaWQsIGlzTG9hZGluZzogY29udHJvbGxlZExvYWRpbmdTdGF0ZSwgTG9hZGVyLCB0eXBlLCBzaG93TG9hZGVyV2l0aENoaWxkcmVuLCB9LCByZWYgPSBSZWFjdC5jcmVhdGVSZWYoKSkgPT4ge1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICAvKipcbiAgICAgKiBjb250cm9sbGVkTG9hZGluZ1N0YXRlIHdpbGwgYWxsb3dzIGNvbnN1bWVyIHRvIGNvbnRyb2wgdGhlIGxvYWRpbmcgc3RhdGUuXG4gICAgICogRWxzZSwgdGhhdCBpcyBzZXQgYnkgdGhlIGNvbXBvbmVudCBpbnRlcm5hbGx5XG4gICAgICovXG4gICAgY29uc3Qgc2hvdWxkU2hvd0xvYWRpbmcgPSBjb250cm9sbGVkTG9hZGluZ1N0YXRlID09PSB0cnVlIHx8IChpc0xvYWRpbmcgJiYgaXNBc3luYyk7XG4gICAgY29uc3Qgb25DbGlja0ZuID0gKGV2ZW50KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgeWllbGQgb25DbGljayhldmVudCk7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICAgIGNvbnN0IExvYWRlckNvbXAgPSAocHJvcHMpID0+IChMb2FkZXIgPyA8TG9hZGVyIHsuLi5wcm9wc30vPiA6IDxEZWZhdWx0TG9hZGVyIHsuLi5wcm9wc30vPik7XG4gICAgcmV0dXJuICg8U3R5bGVkQnV0dG9uIHJlZj17cmVmfSBvbkNsaWNrPXtpc0FzeW5jID8gb25DbGlja0ZuIDogb25DbGlja30gb25CbHVyPXtvbkJsdXJ9IGRpc2FibGVkPXtkaXNhYmxlZCB8fCBzaG91bGRTaG93TG9hZGluZ30gc2l6ZT17c2l6ZX0gdmFyaWFudD17dmFyaWFudH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGlkPXtpZH0gdHlwZT17dHlwZX0+XG4gICAgICAgIHtzaG93TG9hZGVyV2l0aENoaWxkcmVuID8gKDw+XG4gICAgICAgICAgICB7c2hvdWxkU2hvd0xvYWRpbmcgJiYgKDxEZWZhdWx0TG9hZGVyIHZhcmlhbnQ9e3ZhcmlhbnR9IHRoZW1lPXt0aGVtZX0gc2l6ZT17c2l6ZX0gY3NzPXtjc3MgYFxuICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgYH0vPil9XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC8+KSA6ICg8PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2NzcyBgXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJHtzaG91bGRTaG93TG9hZGluZyA/ICdibG9jaycgOiAnbm9uZSd9O1xuICAgICAgICAgICAgICBgfT5cbiAgICAgICAgICAgICAgPExvYWRlckNvbXAgdmFyaWFudD17dmFyaWFudH0gdGhlbWU9e3RoZW1lfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtjc3MgYFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICR7c2hvdWxkU2hvd0xvYWRpbmcgPyAnbm9uZScgOiAnYmxvY2snfTtcbiAgICAgICAgICAgICAgYH0+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPil9XG4gICAgICA8L1N0eWxlZEJ1dHRvbj4pO1xufSk7XG5jb25zdCBMb2FkZXJTaXplcyA9IHtcbiAgICBzbTogJzEycHgnLFxuICAgIG1kOiAnMTNweCcsXG4gICAgZGVmYXVsdDogJzIwcHgnLFxufTtcbmNvbnN0IERlZmF1bHRMb2FkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyB2YXJpYW50LCB0aGVtZSwgc2l6ZSA9ICdkZWZhdWx0JyB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInZhcmlhbnRcIiwgXCJ0aGVtZVwiLCBcInNpemVcIl0pO1xuICAgIHJldHVybiAoPEljb24gbmFtZT1cInNwaW5uZXJcIiB3aWR0aD17TG9hZGVyU2l6ZXNbc2l6ZV19IGhlaWdodD17TG9hZGVyU2l6ZXNbc2l6ZV19IGZpbGw9e3RoZW1lLmJ1dHRvbi50ZXh0Q29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9IHsuLi5yZXN0fS8+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var Button = /*#__PURE__*/ _react['default'].forwardRef(function (_ref2) {
  var children = _ref2.children,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? function (e) {} : _ref2$onClick,
    _ref2$onBlur = _ref2.onBlur,
    onBlur = _ref2$onBlur === void 0 ? function (e) {} : _ref2$onBlur,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$variant = _ref2.variant,
    variant = _ref2$variant === void 0 ? _constants.BUTTON_VARIANTS.PRIMARY : _ref2$variant,
    _ref2$size = _ref2.size,
    size =
      _ref2$size === void 0
        ? variant === _constants.BUTTON_VARIANTS.SECONDARY
          ? _constants.BUTTON_SIZES.SM
          : _constants.BUTTON_SIZES.MD
        : _ref2$size,
    _ref2$isAsync = _ref2.isAsync,
    isAsync = _ref2$isAsync === void 0 ? false : _ref2$isAsync,
    className = _ref2.className,
    id = _ref2.id,
    controlledLoadingState = _ref2.isLoading,
    Loader = _ref2.Loader,
    type = _ref2.type,
    showLoaderWithChildren = _ref2.showLoaderWithChildren;
  var ref =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : /*#__PURE__*/ _react['default'].createRef();

  var _React$useState = _react['default'].useState(false),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    isLoading = _React$useState2[0],
    setLoading = _React$useState2[1];

  var theme = (0, _useTheme['default'])();
  /**
   * controlledLoadingState will allows consumer to control the loading state.
   * Else, that is set by the component internally
   */

  var shouldShowLoading = controlledLoadingState === true || (isLoading && isAsync);

  var onClickFn = function onClickFn(event) {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                setLoading(true);
                _context.next = 3;
                return onClick(event);

              case 3:
                setLoading(false);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );
  };

  var LoaderComp = function LoaderComp(props) {
    return Loader ? (0, _core.jsx)(Loader, props) : (0, _core.jsx)(DefaultLoader, props);
  };

  return (0, _core.jsx)(
    _styled['default'],
    {
      ref: ref,
      onClick: isAsync ? onClickFn : onClick,
      onBlur: onBlur,
      disabled: disabled || shouldShowLoading,
      size: size,
      variant: variant,
      className: className,
      id: id,
      type: type,
    },
    showLoaderWithChildren
      ? (0, _core.jsx)(
          _react['default'].Fragment,
          null,
          shouldShowLoading &&
            (0, _core.jsx)(DefaultLoader, {
              variant: variant,
              theme: theme,
              size: size,
              css: _ref,
            }),
          children,
        )
      : (0, _core.jsx)(
          _react['default'].Fragment,
          null,
          (0, _core.jsx)(
            'div',
            {
              css: /*#__PURE__*/ (0, _core.css)(
                'display:',
                shouldShowLoading ? 'block' : 'none',
                ';;label:Uikit-Button;' +
                  (process.env.NODE_ENV === 'production'
                    ? ''
                    : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRTBCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vSWNvbic7XG5pbXBvcnQgdXNlVGhlbWUgZnJvbSAnLi4vdXRpbHMvdXNlVGhlbWUnO1xuaW1wb3J0IHsgQlVUVE9OX1ZBUklBTlRTLCBCVVRUT05fU0laRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3R5bGVkQnV0dG9uIGZyb20gJy4vc3R5bGVkJztcbmNvbnN0IEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIG9uQ2xpY2sgPSAoZSkgPT4geyB9LCBvbkJsdXIgPSAoZSkgPT4geyB9LCBkaXNhYmxlZCA9IGZhbHNlLCB2YXJpYW50ID0gQlVUVE9OX1ZBUklBTlRTLlBSSU1BUlksIHNpemUgPSB2YXJpYW50ID09PSBCVVRUT05fVkFSSUFOVFMuU0VDT05EQVJZID8gQlVUVE9OX1NJWkVTLlNNIDogQlVUVE9OX1NJWkVTLk1ELCBpc0FzeW5jID0gZmFsc2UsIGNsYXNzTmFtZSwgaWQsIGlzTG9hZGluZzogY29udHJvbGxlZExvYWRpbmdTdGF0ZSwgTG9hZGVyLCB0eXBlLCBzaG93TG9hZGVyV2l0aENoaWxkcmVuLCB9LCByZWYgPSBSZWFjdC5jcmVhdGVSZWYoKSkgPT4ge1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICAvKipcbiAgICAgKiBjb250cm9sbGVkTG9hZGluZ1N0YXRlIHdpbGwgYWxsb3dzIGNvbnN1bWVyIHRvIGNvbnRyb2wgdGhlIGxvYWRpbmcgc3RhdGUuXG4gICAgICogRWxzZSwgdGhhdCBpcyBzZXQgYnkgdGhlIGNvbXBvbmVudCBpbnRlcm5hbGx5XG4gICAgICovXG4gICAgY29uc3Qgc2hvdWxkU2hvd0xvYWRpbmcgPSBjb250cm9sbGVkTG9hZGluZ1N0YXRlID09PSB0cnVlIHx8IChpc0xvYWRpbmcgJiYgaXNBc3luYyk7XG4gICAgY29uc3Qgb25DbGlja0ZuID0gKGV2ZW50KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgeWllbGQgb25DbGljayhldmVudCk7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICAgIGNvbnN0IExvYWRlckNvbXAgPSAocHJvcHMpID0+IChMb2FkZXIgPyA8TG9hZGVyIHsuLi5wcm9wc30vPiA6IDxEZWZhdWx0TG9hZGVyIHsuLi5wcm9wc30vPik7XG4gICAgcmV0dXJuICg8U3R5bGVkQnV0dG9uIHJlZj17cmVmfSBvbkNsaWNrPXtpc0FzeW5jID8gb25DbGlja0ZuIDogb25DbGlja30gb25CbHVyPXtvbkJsdXJ9IGRpc2FibGVkPXtkaXNhYmxlZCB8fCBzaG91bGRTaG93TG9hZGluZ30gc2l6ZT17c2l6ZX0gdmFyaWFudD17dmFyaWFudH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGlkPXtpZH0gdHlwZT17dHlwZX0+XG4gICAgICAgIHtzaG93TG9hZGVyV2l0aENoaWxkcmVuID8gKDw+XG4gICAgICAgICAgICB7c2hvdWxkU2hvd0xvYWRpbmcgJiYgKDxEZWZhdWx0TG9hZGVyIHZhcmlhbnQ9e3ZhcmlhbnR9IHRoZW1lPXt0aGVtZX0gc2l6ZT17c2l6ZX0gY3NzPXtjc3MgYFxuICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgYH0vPil9XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC8+KSA6ICg8PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2NzcyBgXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJHtzaG91bGRTaG93TG9hZGluZyA/ICdibG9jaycgOiAnbm9uZSd9O1xuICAgICAgICAgICAgICBgfT5cbiAgICAgICAgICAgICAgPExvYWRlckNvbXAgdmFyaWFudD17dmFyaWFudH0gdGhlbWU9e3RoZW1lfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtjc3MgYFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICR7c2hvdWxkU2hvd0xvYWRpbmcgPyAnbm9uZScgOiAnYmxvY2snfTtcbiAgICAgICAgICAgICAgYH0+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPil9XG4gICAgICA8L1N0eWxlZEJ1dHRvbj4pO1xufSk7XG5jb25zdCBMb2FkZXJTaXplcyA9IHtcbiAgICBzbTogJzEycHgnLFxuICAgIG1kOiAnMTNweCcsXG4gICAgZGVmYXVsdDogJzIwcHgnLFxufTtcbmNvbnN0IERlZmF1bHRMb2FkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyB2YXJpYW50LCB0aGVtZSwgc2l6ZSA9ICdkZWZhdWx0JyB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInZhcmlhbnRcIiwgXCJ0aGVtZVwiLCBcInNpemVcIl0pO1xuICAgIHJldHVybiAoPEljb24gbmFtZT1cInNwaW5uZXJcIiB3aWR0aD17TG9hZGVyU2l6ZXNbc2l6ZV19IGhlaWdodD17TG9hZGVyU2l6ZXNbc2l6ZV19IGZpbGw9e3RoZW1lLmJ1dHRvbi50ZXh0Q29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9IHsuLi5yZXN0fS8+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */'),
              ),
            },
            (0, _core.jsx)(LoaderComp, {
              variant: variant,
              theme: theme,
            }),
          ),
          (0, _core.jsx)(
            'div',
            {
              css: /*#__PURE__*/ (0, _core.css)(
                'display:',
                shouldShowLoading ? 'none' : 'block',
                ';;label:Uikit-Button;' +
                  (process.env.NODE_ENV === 'production'
                    ? ''
                    : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzRTBCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vSWNvbic7XG5pbXBvcnQgdXNlVGhlbWUgZnJvbSAnLi4vdXRpbHMvdXNlVGhlbWUnO1xuaW1wb3J0IHsgQlVUVE9OX1ZBUklBTlRTLCBCVVRUT05fU0laRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3R5bGVkQnV0dG9uIGZyb20gJy4vc3R5bGVkJztcbmNvbnN0IEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIG9uQ2xpY2sgPSAoZSkgPT4geyB9LCBvbkJsdXIgPSAoZSkgPT4geyB9LCBkaXNhYmxlZCA9IGZhbHNlLCB2YXJpYW50ID0gQlVUVE9OX1ZBUklBTlRTLlBSSU1BUlksIHNpemUgPSB2YXJpYW50ID09PSBCVVRUT05fVkFSSUFOVFMuU0VDT05EQVJZID8gQlVUVE9OX1NJWkVTLlNNIDogQlVUVE9OX1NJWkVTLk1ELCBpc0FzeW5jID0gZmFsc2UsIGNsYXNzTmFtZSwgaWQsIGlzTG9hZGluZzogY29udHJvbGxlZExvYWRpbmdTdGF0ZSwgTG9hZGVyLCB0eXBlLCBzaG93TG9hZGVyV2l0aENoaWxkcmVuLCB9LCByZWYgPSBSZWFjdC5jcmVhdGVSZWYoKSkgPT4ge1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICAvKipcbiAgICAgKiBjb250cm9sbGVkTG9hZGluZ1N0YXRlIHdpbGwgYWxsb3dzIGNvbnN1bWVyIHRvIGNvbnRyb2wgdGhlIGxvYWRpbmcgc3RhdGUuXG4gICAgICogRWxzZSwgdGhhdCBpcyBzZXQgYnkgdGhlIGNvbXBvbmVudCBpbnRlcm5hbGx5XG4gICAgICovXG4gICAgY29uc3Qgc2hvdWxkU2hvd0xvYWRpbmcgPSBjb250cm9sbGVkTG9hZGluZ1N0YXRlID09PSB0cnVlIHx8IChpc0xvYWRpbmcgJiYgaXNBc3luYyk7XG4gICAgY29uc3Qgb25DbGlja0ZuID0gKGV2ZW50KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgeWllbGQgb25DbGljayhldmVudCk7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICAgIGNvbnN0IExvYWRlckNvbXAgPSAocHJvcHMpID0+IChMb2FkZXIgPyA8TG9hZGVyIHsuLi5wcm9wc30vPiA6IDxEZWZhdWx0TG9hZGVyIHsuLi5wcm9wc30vPik7XG4gICAgcmV0dXJuICg8U3R5bGVkQnV0dG9uIHJlZj17cmVmfSBvbkNsaWNrPXtpc0FzeW5jID8gb25DbGlja0ZuIDogb25DbGlja30gb25CbHVyPXtvbkJsdXJ9IGRpc2FibGVkPXtkaXNhYmxlZCB8fCBzaG91bGRTaG93TG9hZGluZ30gc2l6ZT17c2l6ZX0gdmFyaWFudD17dmFyaWFudH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGlkPXtpZH0gdHlwZT17dHlwZX0+XG4gICAgICAgIHtzaG93TG9hZGVyV2l0aENoaWxkcmVuID8gKDw+XG4gICAgICAgICAgICB7c2hvdWxkU2hvd0xvYWRpbmcgJiYgKDxEZWZhdWx0TG9hZGVyIHZhcmlhbnQ9e3ZhcmlhbnR9IHRoZW1lPXt0aGVtZX0gc2l6ZT17c2l6ZX0gY3NzPXtjc3MgYFxuICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgYH0vPil9XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC8+KSA6ICg8PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2NzcyBgXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJHtzaG91bGRTaG93TG9hZGluZyA/ICdibG9jaycgOiAnbm9uZSd9O1xuICAgICAgICAgICAgICBgfT5cbiAgICAgICAgICAgICAgPExvYWRlckNvbXAgdmFyaWFudD17dmFyaWFudH0gdGhlbWU9e3RoZW1lfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtjc3MgYFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICR7c2hvdWxkU2hvd0xvYWRpbmcgPyAnbm9uZScgOiAnYmxvY2snfTtcbiAgICAgICAgICAgICAgYH0+XG4gICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPil9XG4gICAgICA8L1N0eWxlZEJ1dHRvbj4pO1xufSk7XG5jb25zdCBMb2FkZXJTaXplcyA9IHtcbiAgICBzbTogJzEycHgnLFxuICAgIG1kOiAnMTNweCcsXG4gICAgZGVmYXVsdDogJzIwcHgnLFxufTtcbmNvbnN0IERlZmF1bHRMb2FkZXIgPSAoX2EpID0+IHtcbiAgICB2YXIgeyB2YXJpYW50LCB0aGVtZSwgc2l6ZSA9ICdkZWZhdWx0JyB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInZhcmlhbnRcIiwgXCJ0aGVtZVwiLCBcInNpemVcIl0pO1xuICAgIHJldHVybiAoPEljb24gbmFtZT1cInNwaW5uZXJcIiB3aWR0aD17TG9hZGVyU2l6ZXNbc2l6ZV19IGhlaWdodD17TG9hZGVyU2l6ZXNbc2l6ZV19IGZpbGw9e3RoZW1lLmJ1dHRvbi50ZXh0Q29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9IHsuLi5yZXN0fS8+KTtcbn07XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */'),
              ),
            },
            children,
          ),
        ),
  );
});

var LoaderSizes = {
  sm: '12px',
  md: '13px',
  default: '20px',
};

var DefaultLoader = function DefaultLoader(_a) {
  var variant = _a.variant,
    theme = _a.theme,
    _a$size = _a.size,
    size = _a$size === void 0 ? 'default' : _a$size,
    rest = __rest(_a, ['variant', 'theme', 'size']);

  return (0, _core.jsx)(
    _Icon['default'],
    (0, _extends2['default'])(
      {
        name: 'spinner',
        width: LoaderSizes[size],
        height: LoaderSizes[size],
        fill: theme.button.textColors[variant]['default'],
      },
      rest,
    ),
  );
};

var _default = Button;
exports['default'] = _default;
