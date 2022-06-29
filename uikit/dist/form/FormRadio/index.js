'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _css2 = _interopRequireDefault(require('@emotion/css'));

var _react = _interopRequireWildcard(require('react'));

var _common = require('../common');

var _Radio = _interopRequireDefault(require('../Radio'));

var _RadioCheckContext = _interopRequireDefault(require('../RadioCheckboxGroup/RadioCheckContext'));

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

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'w1hdrq-Uikit-FormRadio',
        styles: 'margin-left:8px;;label:Uikit-FormRadio;',
      }
    : {
        name: 'w1hdrq-Uikit-FormRadio',
        styles: 'margin-left:8px;;label:Uikit-FormRadio;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ3NCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmFkaW9DaGVja2JveFdyYXBwZXIgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IFJhZGlvIGZyb20gJy4uL1JhZGlvJztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBSYWRpb0NoZWNrQ29udGV4dCBmcm9tICcuLi9SYWRpb0NoZWNrYm94R3JvdXAvUmFkaW9DaGVja0NvbnRleHQnO1xuLyoqXG4gKiBGb3JtUmFkaW8gdG8gYmUgdXNlZCB3aXRoIFJhZGlvQ2hlY2tib3hHcm91cFxuICovXG5jb25zdCBGb3JtUmFkaW8gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IFsnYXJpYS1sYWJlbCddOiBhcmlhTGFiZWwsIHZhbHVlLCBjaGlsZHJlbiwgY2hlY2tlZCA9IGZhbHNlIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBpc0NoZWNrZWQsIGRpc2FibGVkIH0gPSB1c2VDb250ZXh0KFJhZGlvQ2hlY2tDb250ZXh0KSB8fCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgeyBpc0NoZWNrZWQ6IHByb3BzLmNoZWNrZWQgfSk7XG4gICAgY29uc3Qgb25DbGljayA9ICgpID0+ICFkaXNhYmxlZCAmJiBvbkNoYW5nZSh2YWx1ZSk7XG4gICAgY29uc3QgY2FsY0NoZWNrZWQgPSBpc0NoZWNrZWRcbiAgICAgICAgPyBpc0NoZWNrZWQgaW5zdGFuY2VvZiBGdW5jdGlvblxuICAgICAgICAgICAgPyBpc0NoZWNrZWQodmFsdWUpXG4gICAgICAgICAgICA6IGlzQ2hlY2tlZFxuICAgICAgICA6IGNoZWNrZWQ7XG4gICAgcmV0dXJuICg8UmFkaW9DaGVja2JveFdyYXBwZXIgZGlzYWJsZWQ9e2Rpc2FibGVkfSBjaGVja2VkPXtjYWxjQ2hlY2tlZH0gb25DbGljaz17b25DbGlja30+XG4gICAgICA8UmFkaW8gYXJpYS1sYWJlbD17YXJpYUxhYmVsfSBjaGVja2VkPXtjYWxjQ2hlY2tlZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBvbkNoYW5nZT17b25DaGFuZ2V9Lz5cbiAgICAgIDxsYWJlbCBjc3M9e2NzcyBgXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICAgICAgYH0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9SYWRpb0NoZWNrYm94V3JhcHBlcj4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZvcm1SYWRpbztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

/**
 * FormRadio to be used with RadioCheckboxGroup
 */
var FormRadio = function FormRadio(props) {
  var ariaLabel = props['aria-label'],
    value = props.value,
    children = props.children,
    _props$checked = props.checked,
    checked = _props$checked === void 0 ? false : _props$checked;

  var _ref2 =
      (0, _react.useContext)(_RadioCheckContext['default']) ||
      Object.assign(Object.assign({}, props), {
        isChecked: props.checked,
      }),
    onChange = _ref2.onChange,
    isChecked = _ref2.isChecked,
    disabled = _ref2.disabled;

  var onClick = function onClick() {
    return !disabled && onChange(value);
  };

  var calcChecked = isChecked
    ? isChecked instanceof Function
      ? isChecked(value)
      : isChecked
    : checked;
  return (0, _core.jsx)(
    _common.RadioCheckboxWrapper,
    {
      disabled: disabled,
      checked: calcChecked,
      onClick: onClick,
    },
    (0, _core.jsx)(_Radio['default'], {
      'aria-label': ariaLabel,
      checked: calcChecked,
      disabled: disabled,
      onChange: onChange,
    }),
    (0, _core.jsx)(
      'label',
      {
        css: _ref,
      },
      children,
    ),
  );
};

var _default = FormRadio;
exports['default'] = _default;
