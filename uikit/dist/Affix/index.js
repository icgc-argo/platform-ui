'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = Affix;

var _core = require('@emotion/core');

var _react = _interopRequireDefault(require('react'));

var __jsx = _react['default'].createElement;

function Affix(props) {
  var element = /*#__PURE__*/ _react['default'].createRef();

  var oldStyles = {
    position: '',
    top: '',
    width: '',
  }; // Offset could make the element fixed ealier or later

  var _props$offset = props.offset,
    offset = _props$offset === void 0 ? 0 : _props$offset;

  var checkPosition = function checkPosition(distanceToBody, width) {
    var scrollTop = window.scrollY;

    if (distanceToBody - scrollTop < props.top + offset) {
      if (element.current.style.position != 'fixed') {
        for (var key in oldStyles) {
          oldStyles[key] = element.current.style[key];
        }

        element.current.style.position = 'fixed';
        element.current.style.width = width + 'px';
        element.current.style.top = props.top + 'px';
      }
    } else {
      // reset to default
      for (var _key in oldStyles) {
        element.current.style[_key] = oldStyles[_key];
      }
    }
  };

  _react['default'].useEffect(function () {
    if (typeof window.scrollY === 'undefined') {
      // don't work in IE
      return;
    }

    var distanceToBody = window.scrollY + element.current.getBoundingClientRect().top;

    var handleScroll = function handleScroll() {
      requestAnimationFrame(function () {
        checkPosition(distanceToBody, element.current.clientWidth);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (0, _core.jsx)(
    'div',
    {
      ref: element,
      style: {
        zIndex: 1,
      },
      className: props.className,
    },
    props.children,
  );
}
