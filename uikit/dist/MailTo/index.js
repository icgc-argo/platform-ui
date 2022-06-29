'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _taggedTemplateLiteral2 = _interopRequireDefault(
  require('@babel/runtime/helpers/taggedTemplateLiteral'),
);

var _react = _interopRequireDefault(require('react'));

var _Typography = _interopRequireDefault(require('../Typography'));

var _ = require('../');

var _templateObject;

var __jsx = _react['default'].createElement;
var Mail = (0, _.styled)('a')(
  _templateObject ||
    (_templateObject = (0, _taggedTemplateLiteral2['default'])([
      '\n  color: ',
      ';\n  text-decoration: none;\n',
    ])),
  function (_ref) {
    var theme = _ref.theme;
    return theme.colors.black;
  },
);

var MailTo = function MailTo(_ref2) {
  var children = _ref2.children,
    link = _ref2.link;
  return (0, _core.jsx)(
    _Typography['default'],
    {
      variant: 'data',
    },
    (0, _core.jsx)(
      Mail,
      {
        href: 'mailto:'.concat(link),
      },
      children,
    ),
  );
};

var _default = MailTo;
exports['default'] = _default;
