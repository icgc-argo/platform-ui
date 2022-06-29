'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.FieldInputWrapper = exports.FieldDescriptionLabel = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(
  require('@babel/runtime/helpers/taggedTemplateLiteral'),
);

var _ = require('./..');

var _templateObject, _templateObject2;

var FieldInputWrapper = (0, _.styled)('div')(
  _templateObject ||
    (_templateObject = (0, _taggedTemplateLiteral2['default'])([
      '\n  width: 35%;\n  &:first-of-type:not(:last-of-type) {\n    border-radius: 10px 0 0 10px;\n  }\n',
    ])),
);
exports.FieldInputWrapper = FieldInputWrapper;
var FieldDescriptionLabel = (0, _.styled)('div')(
  _templateObject2 ||
    (_templateObject2 = (0, _taggedTemplateLiteral2['default'])([
      '\n  display: flex;\n  width: 15%;\n  height: 30px;\n  background-color: ',
      ';\n  color: ',
      ';\n  border: solid 1px ',
      ';\n\n  font-size: 12px;\n  line-height: 1.33;\n  font-weight: normal;\n  align-items: center;\n  justify-content: center;\n  &:first-of-type:not(:last-of-type) {\n    border-radius: 10px 0 0 10px;\n    border-right: 0px;\n  }\n  &:nth-last-of-type(2) {\n    margin: 0px;\n    border-radius: 0px;\n    border-left: 0px;\n    border-right: 0px;\n  }\n',
    ])),
  function (_ref) {
    var theme = _ref.theme;
    return theme.colors.grey_2;
  },
  function (_ref2) {
    var theme = _ref2.theme;
    return theme.colors.black;
  },
  function (_ref3) {
    var theme = _ref3.theme;
    return theme.colors.grey_1;
  },
);
exports.FieldDescriptionLabel = FieldDescriptionLabel;
