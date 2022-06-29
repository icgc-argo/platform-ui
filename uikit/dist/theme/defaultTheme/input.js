'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.INPUT_STATES = void 0;

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _colors2 = _interopRequireDefault(require('./colors'));

var _textColors, _borderColors, _colors;

var INPUT_STATES = {
  default: 'default',
  active: 'active',
  focus: 'focus',
  disabled: 'disabled',
  error: 'error',
  hover: 'hover',
};
exports.INPUT_STATES = INPUT_STATES;
var _default = {
  fontSizes: {
    sm: '12px',
    lg: '14px',
  },
  paddings: {
    sm: '8px 10px',
    lg: '7px 10px',
  },
  textColors:
    ((_textColors = {}),
    (0, _defineProperty2['default'])(
      _textColors,
      INPUT_STATES['default'],
      _colors2['default'].black,
    ),
    (0, _defineProperty2['default'])(_textColors, INPUT_STATES.active, _colors2['default'].black),
    (0, _defineProperty2['default'])(_textColors, INPUT_STATES.focus, _colors2['default'].black),
    (0, _defineProperty2['default'])(_textColors, INPUT_STATES.disabled, _colors2['default'].grey),
    (0, _defineProperty2['default'])(_textColors, INPUT_STATES.error, _colors2['default'].grey),
    _textColors),
  borderColors:
    ((_borderColors = {}),
    (0, _defineProperty2['default'])(
      _borderColors,
      INPUT_STATES['default'],
      _colors2['default'].grey_1,
    ),
    (0, _defineProperty2['default'])(_borderColors, INPUT_STATES.active, _colors2['default'].grey),
    (0, _defineProperty2['default'])(_borderColors, INPUT_STATES.focus, _colors2['default'].grey),
    (0, _defineProperty2['default'])(
      _borderColors,
      INPUT_STATES.disabled,
      _colors2['default'].grey_2,
    ),
    (0, _defineProperty2['default'])(_borderColors, INPUT_STATES.error, _colors2['default'].error),
    (0, _defineProperty2['default'])(
      _borderColors,
      INPUT_STATES.hover,
      _colors2['default'].secondary_1,
    ),
    _borderColors),
  colors:
    ((_colors = {}),
    (0, _defineProperty2['default'])(_colors, INPUT_STATES['default'], _colors2['default'].white),
    (0, _defineProperty2['default'])(_colors, INPUT_STATES.disabled, '#f6f6f7'),
    _colors),
};
exports['default'] = _default;
