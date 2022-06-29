'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = Fade;

var _core = require('@emotion/core');

var _react = _interopRequireDefault(require('react'));

var _reactTransitionGroup = require('react-transition-group');

var __jsx = _react['default'].createElement;

function Fade(_ref) {
  var inProp = _ref['in'],
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 400 : _ref$duration,
    children = _ref.children;
  var defaultStyle = {
    transition: 'opacity '.concat(duration, 'ms ease-in-out'),
    opacity: 0,
  };
  var transitionStyles = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
    },
    exited: {
      opacity: 0,
    },
  };
  return (0, _core.jsx)(
    _reactTransitionGroup.Transition,
    {
      in: inProp,
      timeout: duration,
    },
    function (state) {
      return (0, _core.jsx)(
        'div',
        {
          style: Object.assign(Object.assign({}, defaultStyle), transitionStyles[state]),
        },
        children,
      );
    },
  );
}
