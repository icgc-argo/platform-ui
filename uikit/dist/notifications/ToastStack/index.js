'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _taggedTemplateLiteral2 = _interopRequireDefault(
  require('@babel/runtime/helpers/taggedTemplateLiteral'),
);

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _differenceBy3 = _interopRequireDefault(require('lodash/differenceBy'));

var _ = require('../..');

var _Toast = _interopRequireDefault(require('../Toast'));

var _templateObject, _templateObject2;

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

var usePrevious = function usePrevious(value) {
  var ref = _react['default'].useRef();

  _react['default'].useEffect(
    function () {
      ref.current = value;
    },
    [value],
  );

  return ref.current;
};

var ANIMATION_DURATION = 500;
var StackContainer = (0, _.styled)('div')(
  _templateObject ||
    (_templateObject = (0, _taggedTemplateLiteral2['default'])(['\n  max-width: 400px;\n'])),
);
var AnimatedContainer = (0, _.styled)('div')(
  _templateObject2 ||
    (_templateObject2 = (0, _taggedTemplateLiteral2['default'])([
      '\n  margin-top: 10px;\n  @keyframes enter {\n    from {\n      opacity: 0;\n      transform: translateX(100px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0px);\n    }\n  }\n  @keyframes exit {\n    from {\n      opacity: 1;\n      transform: translateX(0px);\n    }\n    to {\n      opacity: 0;\n      transform: translateX(100px);\n    }\n  }\n  animation: ',
      ' ',
      's\n    ease-in-out;\n',
    ])),
  function (_ref) {
    var unMounting = _ref.unMounting;
    return unMounting ? 'exit' : 'enter';
  },
  ANIMATION_DURATION / 1000,
);

var ToastStack = function ToastStack(_ref2) {
  var _ref2$toastConfigs = _ref2.toastConfigs,
    toastConfigs = _ref2$toastConfigs === void 0 ? [] : _ref2$toastConfigs,
    _ref2$onInteraction = _ref2.onInteraction,
    _onInteraction =
      _ref2$onInteraction === void 0
        ? function (_ref3) {
            var id = _ref3.id,
              toastIndex = _ref3.toastIndex,
              payload = _ref3.payload;
          }
        : _ref2$onInteraction;

  // holds on to a local copy of toastConfigs for timing with animation
  var convertToLocalStack = function convertToLocalStack(toastConfigs) {
    return toastConfigs.map(function (i) {
      return Object.assign(Object.assign({}, i), {
        unMounting: false,
      });
    });
  };

  var _React$useState = _react['default'].useState(convertToLocalStack(toastConfigs)),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    stack = _React$useState2[0],
    setStack = _React$useState2[1];

  var previousToastConfigs = usePrevious(toastConfigs); // this ensures previously registered timeouts are canceled on new render

  var _React$useState3 = _react['default'].useState(null),
    _React$useState4 = (0, _slicedToArray2['default'])(_React$useState3, 2),
    currentTimeout = _React$useState4[0],
    setCurrentTimeout = _React$useState4[1];

  var lastTimeOut = usePrevious(currentTimeout);

  if (lastTimeOut) {
    clearTimeout(lastTimeOut);
  } // observes toastConfigs from props to sync up with local state, with some delay for animation

  _react['default'].useEffect(
    function () {
      var _differenceBy = (0, _differenceBy3['default'])(previousToastConfigs, toastConfigs),
        _differenceBy2 = (0, _slicedToArray2['default'])(_differenceBy, 1),
        itemToRemove = _differenceBy2[0];

      if (itemToRemove) {
        setStack(
          convertToLocalStack(previousToastConfigs).map(function (item) {
            return Object.assign(Object.assign({}, item), {
              unMounting: item.id === itemToRemove.id,
            });
          }),
        );
        setCurrentTimeout(
          setTimeout(function () {
            setStack(convertToLocalStack(toastConfigs));
          }, ANIMATION_DURATION),
        );
      } else {
        setStack(convertToLocalStack(toastConfigs));
      }
    },
    [toastConfigs],
  );

  return (0, _core.jsx)(
    StackContainer,
    null,
    stack.map(function (_a, i) {
      var id = _a.id,
        unMounting = _a.unMounting,
        rest = __rest(_a, ['id', 'unMounting']);

      return (0, _core.jsx)(
        AnimatedContainer,
        {
          key: id,
          unMounting: unMounting,
        },
        (0, _core.jsx)(
          _Toast['default'],
          (0, _extends2['default'])({}, rest, {
            onInteraction: function onInteraction(payload) {
              _onInteraction({
                toastIndex: i,
                id: id,
                payload: payload,
              });

              if (rest.onInteraction) {
                rest.onInteraction(payload);
              }
            },
          }),
        ),
      );
    }),
  );
};

ToastStack.propTypes = {
  /**
   * This is directly the props that goes to `Toast` component, with addition of a unique `id` field.
   * Check out https://argo-ui-storybook.netlify.com/?path=/story/uikit-toast--basic
   */
  toastConfigs: _propTypes['default'].arrayOf(
    _propTypes['default'].shape(
      Object.assign(
        {
          id: _propTypes['default'].string.isRequired,
        },
        _Toast['default'].propTypes,
      ),
    ),
  ),
  onInteraction: _propTypes['default'].func,
};
var _default = ToastStack;
exports['default'] = _default;
