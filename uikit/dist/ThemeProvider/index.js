'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useTheme = exports['default'] = void 0;

var _core = require('@emotion/core');

var React = _interopRequireWildcard(require('react'));

var _emotionTheming = require('emotion-theming');

var _defaultTheme = _interopRequireDefault(require('../theme/defaultTheme'));

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
var themes = {
  default: _defaultTheme['default'],
};

var ThemeProvider = function ThemeProvider(_ref) {
  var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'default' : _ref$theme,
    children = _ref.children;
  return (0, _core.jsx)(
    _emotionTheming.ThemeProvider,
    {
      theme: themes[theme],
    },
    (0, _core.jsx)('link', {
      href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600&display=swap',
      rel: 'stylesheet',
    }),
    children,
  );
};

var _default = ThemeProvider;
exports['default'] = _default;

var useTheme = function useTheme() {
  return React.useContext(_core.ThemeContext);
};

exports.useTheme = useTheme;
