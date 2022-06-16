'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = ContentPlaceholderComponent;

var _core = require('@emotion/core');

var _css2 = _interopRequireDefault(require('@emotion/css'));

var _react = _interopRequireDefault(require('react'));

var _ContentPlaceholder = _interopRequireDefault(require('../ContentPlaceholder'));

var __jsx = _react['default'].createElement;

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1fr1xg4-Uikit-ContentPlaceholderComponent',
        styles:
          'display:flex;justify-content:center;align-items:center;flex-direction:column;padding:32px 0;;label:Uikit-ContentPlaceholderComponent;',
      }
    : {
        name: '1fr1xg4-Uikit-ContentPlaceholderComponent',
        styles:
          'display:flex;justify-content:center;align-items:center;flex-direction:column;padding:32px 0;;label:Uikit-ContentPlaceholderComponent;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5vRGF0YUNvbXBvbmVudC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0IwQiIsImZpbGUiOiJOb0RhdGFDb21wb25lbnQuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMCBUaGUgT250YXJpbyBJbnN0aXR1dGUgZm9yIENhbmNlciBSZXNlYXJjaC4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICpcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZlxuICogdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wLiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZXG4gKiBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVNcbiAqIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UXG4gKiBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCxcbiAqIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRFxuICogVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTO1xuICogT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU5cbiAqIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBDb250ZW50UGxhY2Vob2xkZXIgZnJvbSAndWlraXQvQ29udGVudFBsYWNlaG9sZGVyJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbnRlbnRQbGFjZWhvbGRlckNvbXBvbmVudChwcm9wcykge1xuICAgIHJldHVybiAoPGRpdiBjc3M9e2NzcyBgXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBwYWRkaW5nOiAzMnB4IDA7XG4gICAgICBgfT5cbiAgICAgIHtwcm9wcy5sb2FkaW5nID8gbnVsbCA6ICg8Q29udGVudFBsYWNlaG9sZGVyIC8+KX1cbiAgICA8L2Rpdj4pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm9EYXRhQ29tcG9uZW50LmpzeC5tYXAiXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

function ContentPlaceholderComponent(props) {
  return (0, _core.jsx)(
    'div',
    {
      css: _ref,
    },
    props.loading ? null : (0, _core.jsx)(_ContentPlaceholder['default'], null),
  );
}
