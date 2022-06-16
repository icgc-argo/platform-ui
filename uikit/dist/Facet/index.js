'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireDefault(require('react'));

var _SubMenu = require('../SubMenu');

var _OptionsList = _interopRequireDefault(require('../OptionsList'));

var __jsx = _react['default'].createElement;

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1h27uo2-Uikit-Facet',
        styles: 'width:100%;;label:Uikit-Facet;',
      }
    : {
        name: '1h27uo2-Uikit-Facet',
        styles: 'width:100%;;label:Uikit-Facet;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QitQIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJy4uL1N1Yk1lbnUnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgT3B0aW9uc0xpc3QgZnJvbSAndWlraXQvT3B0aW9uc0xpc3QnO1xuY29uc3QgRmFjZXQgPSAoeyBzdWJNZW51TmFtZSwgb3B0aW9ucywgaXNFeHBhbmRlZCwgb25DbGljaywgY291bnRVbml0LCBvbk9wdGlvblRvZ2dsZSwgb25TZWxlY3RBbGxPcHRpb25zLCBwYXJzZURpc3BsYXlWYWx1ZSwgfSkgPT4ge1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeVN0YXRlLCBzZXRTZWFyY2hRdWVyeVN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgICByZXR1cm4gKDw+XG4gICAgICA8TWVudUl0ZW0gY2xhc3NOYW1lPVwiRmFjZXRNZW51XCIgb25DbGljaz17b25DbGlja30gc2VsZWN0ZWQ9e2lzRXhwYW5kZWR9IGNvbnRlbnQ9e3N1Yk1lbnVOYW1lfSBjaGV2cm9uT25MZWZ0U2lkZT17dHJ1ZX0gaXNGYWNldFZhcmlhbnQ9e3RydWV9IHNlYXJjaEJhcj17dHJ1ZX0gc2VhcmNoU3RhdGVQYXJhbXM9e3sgcXVlcnk6IHNlYXJjaFF1ZXJ5U3RhdGUsIHF1ZXJ5U2V0dGVyOiBzZXRTZWFyY2hRdWVyeVN0YXRlIH19IGNzcz17Y3NzIGBcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYH0+XG4gICAgICAgIDxPcHRpb25zTGlzdCBvcHRpb25zPXtvcHRpb25zfSBzZWFyY2hRdWVyeT17c2VhcmNoUXVlcnlTdGF0ZX0gY291bnRVbml0PXtjb3VudFVuaXR9IG9uT3B0aW9uVG9nZ2xlPXtvbk9wdGlvblRvZ2dsZX0gb25TZWxlY3RBbGxPcHRpb25zPXtvblNlbGVjdEFsbE9wdGlvbnN9IHBhcnNlRGlzcGxheVZhbHVlPXtwYXJzZURpc3BsYXlWYWx1ZX0vPlxuICAgICAgPC9NZW51SXRlbT5cbiAgICA8Lz4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZhY2V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var Facet = function Facet(_ref2) {
  var subMenuName = _ref2.subMenuName,
    options = _ref2.options,
    isExpanded = _ref2.isExpanded,
    onClick = _ref2.onClick,
    countUnit = _ref2.countUnit,
    onOptionToggle = _ref2.onOptionToggle,
    onSelectAllOptions = _ref2.onSelectAllOptions,
    parseDisplayValue = _ref2.parseDisplayValue;

  var _React$useState = _react['default'].useState(''),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    searchQueryState = _React$useState2[0],
    setSearchQueryState = _React$useState2[1];

  return (0, _core.jsx)(
    _react['default'].Fragment,
    null,
    (0, _core.jsx)(
      _SubMenu.MenuItem,
      {
        className: 'FacetMenu',
        onClick: onClick,
        selected: isExpanded,
        content: subMenuName,
        chevronOnLeftSide: true,
        isFacetVariant: true,
        searchBar: true,
        searchStateParams: {
          query: searchQueryState,
          querySetter: setSearchQueryState,
        },
        css: _ref,
      },
      (0, _core.jsx)(_OptionsList['default'], {
        options: options,
        searchQuery: searchQueryState,
        countUnit: countUnit,
        onOptionToggle: onOptionToggle,
        onSelectAllOptions: onSelectAllOptions,
        parseDisplayValue: parseDisplayValue,
      }),
    ),
  );
};

var _default = Facet;
exports['default'] = _default;
