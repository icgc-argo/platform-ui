'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _react = _interopRequireDefault(require('react'));

var _Typography = _interopRequireDefault(require('../../Typography'));

var _RadioCheckContext = _interopRequireDefault(require('./RadioCheckContext'));

var __jsx = _react['default'].createElement;

var RadioCheckboxGroup = function RadioCheckboxGroup(_ref) {
  var id = _ref.id,
    className = _ref.className,
    onChange = _ref.onChange,
    children = _ref.children,
    hasError = _ref.hasError,
    isChecked = _ref.isChecked,
    disabled = _ref.disabled;
  var ERROR_TEXT = 'Please fill out the required field.';
  var context = {
    isChecked: isChecked,
    onChange: onChange,
    disabled: disabled,
  };
  return (0, _core.jsx)(
    'div',
    {
      id: id,
      className: className,
    },
    (0, _core.jsx)(
      _RadioCheckContext['default'].Provider,
      {
        value: context,
      },
      children,
      hasError
        ? (0, _core.jsx)(
            _Typography['default'],
            {
              variant: 'caption',
              color: 'error',
            },
            ERROR_TEXT,
          )
        : null,
    ),
  );
};

var _default = RadioCheckboxGroup;
exports['default'] = _default;
