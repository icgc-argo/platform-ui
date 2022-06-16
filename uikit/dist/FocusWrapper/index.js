'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(
  require('@babel/runtime/helpers/taggedTemplateLiteral'),
);

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _templateObject;

var FocusWrapper = (0, _styledBase['default'])('button')(
  _templateObject ||
    (_templateObject = (0, _taggedTemplateLiteral2['default'])([
      '\n  border: none;\n  background: none;\n  padding: 0px;\n  cursor: pointer;\n  box-shadow: none;\n  outline: none;\n  transition: box-shadow 0.1s ease-in;\n  &:focus {\n    box-shadow: 0px 0px 4px 0px ',
      ';\n  }\n',
    ])),
  function (_ref) {
    var theme = _ref.theme;
    return theme.colors.secondary_1;
  },
);
var _default = FocusWrapper;
exports['default'] = _default;
