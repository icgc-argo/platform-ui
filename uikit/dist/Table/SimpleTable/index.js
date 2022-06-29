'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _core = require('@emotion/core');

var _ = _interopRequireDefault(require('./..'));

var __jsx = _react['default'].createElement;

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'idh5f1-Uikit-SimpleTable',
        styles: 'width:100%;;label:Uikit-SimpleTable;',
      }
    : {
        name: 'idh5f1-Uikit-SimpleTable',
        styles: 'width:100%;;label:Uikit-SimpleTable;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQjBCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFRhYmxlIGZyb20gJ3Vpa2l0L1RhYmxlJztcbmNvbnN0IFNpbXBsZVRhYmxlID0gKHsgZGF0YSB9KSA9PiB7XG4gICAgY29uc3QgdGFibGVEYXRhID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKChrKSA9PiAoeyBrZXk6IGssIHZhbDogZGF0YVtrXSB9KSk7XG4gICAgcmV0dXJuICg8ZGl2IGNzcz17Y3NzIGBcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBgfT5cbiAgICAgIDxUYWJsZSBoaWdobGlnaHQ9e2ZhbHNlfSBUaGVhZENvbXBvbmVudD17KHByb3BzKSA9PiBudWxsfSBwYXJlbnRSZWY9e3sgY3VycmVudDogbnVsbCB9fSBzaG93UGFnaW5hdGlvbj17ZmFsc2V9IHdpdGhPdXRzaWRlQm9yZGVyIGRhdGE9e3RhYmxlRGF0YX0gY29sdW1ucz17W1xuICAgICAgICB7IHNvcnRhYmxlOiBmYWxzZSwgYWNjZXNzb3I6ICdrZXknLCBzdHlsZTogeyB3aGl0ZVNwYWNlOiAndW5zZXQnIH0gfSxcbiAgICAgICAgeyBhY2Nlc3NvcjogJ3ZhbCcsIHN0eWxlOiB7IHdoaXRlU3BhY2U6ICd1bnNldCcgfSB9LFxuICAgIF19Lz5cbiAgICA8L2Rpdj4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNpbXBsZVRhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var SimpleTable = function SimpleTable(_ref2) {
  var data = _ref2.data;
  var tableData = Object.keys(data).map(function (k) {
    return {
      key: k,
      val: data[k],
    };
  });
  return (0, _core.jsx)(
    'div',
    {
      css: _ref,
    },
    (0, _core.jsx)(_['default'], {
      highlight: false,
      TheadComponent: function TheadComponent(props) {
        return null;
      },
      parentRef: {
        current: null,
      },
      showPagination: false,
      withOutsideBorder: true,
      data: tableData,
      columns: [
        {
          sortable: false,
          accessor: 'key',
          style: {
            whiteSpace: 'unset',
          },
        },
        {
          accessor: 'val',
          style: {
            whiteSpace: 'unset',
          },
        },
      ],
    }),
  );
};

var _default = SimpleTable;
exports['default'] = _default;
