'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn'),
);

var _getPrototypeOf2 = _interopRequireDefault(require('@babel/runtime/helpers/getPrototypeOf'));

var _react = _interopRequireDefault(require('react'));

var _reactDom = _interopRequireDefault(require('react-dom'));

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2['default'])(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2['default'])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2['default'])(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

// Portal that support server rendering
var Portal = /*#__PURE__*/ (function (_React$Component) {
  (0, _inherits2['default'])(Portal, _React$Component);

  var _super = _createSuper(Portal);

  function Portal() {
    (0, _classCallCheck2['default'])(this, Portal);
    return _super.apply(this, arguments);
  }

  (0, _createClass2['default'])(Portal, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.element = document.querySelector(this.props.selector);
        this.forceUpdate();
      },
    },
    {
      key: 'render',
      value: function render() {
        if (this.element === undefined) {
          return null;
        }

        return /*#__PURE__*/ _reactDom['default'].createPortal(this.props.children, this.element);
      },
    },
  ]);
  return Portal;
})(_react['default'].Component);

exports['default'] = Portal;
