'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.TOAST_VARIANTS = exports.TOAST_INTERACTION = void 0;

var _core = require('@emotion/core');

var _react = _interopRequireDefault(require('react'));

var _omit = _interopRequireDefault(require('lodash/omit'));

var _Notification = _interopRequireWildcard(require('../Notification'));

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

var __jsx = _react['default'].createElement;

function Toast(_ref) {
  var variant = _ref.variant,
    title = _ref.title,
    content = _ref.content,
    onInteraction = _ref.onInteraction,
    interactionType = _ref.interactionType,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? '70px' : _ref$top,
    _ref$right = _ref.right,
    right = _ref$right === void 0 ? '30px' : _ref$right,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '400px' : _ref$width;
  return (0, _core.jsx)(_Notification['default'], {
    variant: variant,
    title: title,
    content: content,
    onInteraction: onInteraction,
    interactionType: interactionType,
  });
}

var TOAST_VARIANTS = _Notification.NOTIFICATION_VARIANTS;
exports.TOAST_VARIANTS = TOAST_VARIANTS;
var TOAST_INTERACTION = _Notification.NOTIFICATION_INTERACTION;
exports.TOAST_INTERACTION = TOAST_INTERACTION;
Toast.propTypes = (0, _omit['default'])(_Notification['default'].propTypes, [
  'icon',
  'size',
  'actionText',
  'dismissText',
  'noShadow',
]);
var _default = Toast;
exports['default'] = _default;
