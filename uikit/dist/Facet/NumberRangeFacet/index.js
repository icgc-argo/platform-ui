'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireDefault(require('react'));

var _SubMenu = require('../../SubMenu');

var _NumberRangeField = _interopRequireDefault(require('../../NumberRangeField'));

var __jsx = _react['default'].createElement;

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '8mw4u1-Uikit-NumberRangeFacet',
        styles: 'width:300px;;label:Uikit-NumberRangeFacet;',
      }
    : {
        name: '8mw4u1-Uikit-NumberRangeFacet',
        styles: 'width:300px;;label:Uikit-NumberRangeFacet;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRGtLIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJy4uLy4uL1N1Yk1lbnUnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgTnVtYmVyUmFuZ2VGaWVsZCBmcm9tICd1aWtpdC9OdW1iZXJSYW5nZUZpZWxkJztcbmNvbnN0IE51bWJlclJhbmdlRmFjZXQgPSAoeyBzdWJNZW51TmFtZSwgaXNFeHBhbmRlZCwgb25DbGljaywgb25TdWJtaXQsIG1pbiwgbWF4LCB9KSA9PiB7XG4gICAgLy8gbXVzdCBiZSBpbml0aWFsaXplZCwgdXNlIHN0cmluZyB0byBoYW5kbGUgJ2JhY2tzcGFjZXMnIGZyb20gaW5wdXQgZmllbGRcbiAgICAvLyBwYXJzZSB0byBudW1iZXIgdXBvbiB1c2VcbiAgICBjb25zdCBbbWluaW11bUlucHV0LCBzZXRNaW5pbXVtSW5wdXRdID0gUmVhY3QudXNlU3RhdGUobWluIHx8ICcnKTtcbiAgICBjb25zdCBbbWF4aW11bUlucHV0LCBzZXRNYXhpbXVtSW5wdXRdID0gUmVhY3QudXNlU3RhdGUobWF4IHx8ICcnKTtcbiAgICBjb25zdCBnZXRSYW5nZVZhbHVlcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogcGFyc2VGbG9hdChtaW5pbXVtSW5wdXQpLFxuICAgICAgICAgICAgbWF4OiBwYXJzZUZsb2F0KG1heGltdW1JbnB1dCksXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBbaW5wdXRzVmFsaWQsIHNldElucHV0c1ZhbGlkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSAoaSkgPT4gaSA+PSAwO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldE1heGltdW1JbnB1dChtYXggfHwgJycpO1xuICAgIH0sIFttYXhdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRNaW5pbXVtSW5wdXQobWluIHx8ICcnKTtcbiAgICB9LCBbbWluXSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCB9ID0gZ2V0UmFuZ2VWYWx1ZXMoKTtcbiAgICAgICAgY29uc3QgYXRMZWFzdE9uZVByb3ZpZGVkID0gIShpc05hTihtaW4pICYmIGlzTmFOKG1heCkpO1xuICAgICAgICBjb25zdCB2YWxpZElmUHJvdmlkZWQgPSBpbnB1dCA9PiAoaW5wdXQgPT09ICcnID8gdHJ1ZSA6IHZhbGlkYXRvcihpbnB1dCkpO1xuICAgICAgICBzZXRJbnB1dHNWYWxpZChhdExlYXN0T25lUHJvdmlkZWQgJiYgKHZhbGlkSWZQcm92aWRlZChtaW5pbXVtSW5wdXQpICYmIHZhbGlkSWZQcm92aWRlZChtYXhpbXVtSW5wdXQpKSk7XG4gICAgfSwgW21pbmltdW1JbnB1dCwgbWF4aW11bUlucHV0XSk7XG4gICAgY29uc3QgZ29CdXR0b25IYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBnZXRSYW5nZVZhbHVlcygpO1xuICAgICAgICBvblN1Ym1pdChtaW4sIG1heCk7XG4gICAgfTtcbiAgICByZXR1cm4gKDxNZW51SXRlbSBvbkNsaWNrPXtvbkNsaWNrfSBzZWxlY3RlZD17aXNFeHBhbmRlZH0gaXNGYWNldFZhcmlhbnQ9e3RydWV9IGNsYXNzTmFtZT1cIkZhY2V0TWVudVwiIGNvbnRlbnQ9e3N1Yk1lbnVOYW1lfSBjaGV2cm9uT25MZWZ0U2lkZT17dHJ1ZX0gY3NzPXtjc3MgYFxuICAgICAgICB3aWR0aDogMzAwcHg7XG4gICAgICBgfT5cbiAgICAgIDxNZW51SXRlbSBjbGFzc05hbWU9XCJGYWNldENvbnRlbnRTbGltXCIgc2VsZWN0ZWQ9e2ZhbHNlfSBsZXZlbD17MX0gY29udGVudD17PE51bWJlclJhbmdlRmllbGQgbWluPXttaW5pbXVtSW5wdXR9IG1heD17bWF4aW11bUlucHV0fSBvbk1pbkNoYW5nZT17c2V0TWluaW11bUlucHV0fSBvbk1heENoYW5nZT17c2V0TWF4aW11bUlucHV0fSBvbkdvQ2xpY2s9e2dvQnV0dG9uSGFuZGxlcn0gZ29CdXR0b25FbmFibGVkPXtpbnB1dHNWYWxpZH0gdmFsaWRhdGlvbj17dmFsaWRhdG9yfS8+fSBjb250ZW50QXM9XCJkaXZcIi8+XG4gICAgPC9NZW51SXRlbT4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IE51bWJlclJhbmdlRmFjZXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qc3gubWFwIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var NumberRangeFacet = function NumberRangeFacet(_ref2) {
  var subMenuName = _ref2.subMenuName,
    isExpanded = _ref2.isExpanded,
    onClick = _ref2.onClick,
    onSubmit = _ref2.onSubmit,
    min = _ref2.min,
    max = _ref2.max;

  // must be initialized, use string to handle 'backspaces' from input field
  // parse to number upon use
  var _React$useState = _react['default'].useState(min || ''),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    minimumInput = _React$useState2[0],
    setMinimumInput = _React$useState2[1];

  var _React$useState3 = _react['default'].useState(max || ''),
    _React$useState4 = (0, _slicedToArray2['default'])(_React$useState3, 2),
    maximumInput = _React$useState4[0],
    setMaximumInput = _React$useState4[1];

  var getRangeValues = function getRangeValues() {
    return {
      min: parseFloat(minimumInput),
      max: parseFloat(maximumInput),
    };
  };

  var _React$useState5 = _react['default'].useState(false),
    _React$useState6 = (0, _slicedToArray2['default'])(_React$useState5, 2),
    inputsValid = _React$useState6[0],
    setInputsValid = _React$useState6[1];

  var validator = function validator(i) {
    return i >= 0;
  };

  _react['default'].useEffect(
    function () {
      setMaximumInput(max || '');
    },
    [max],
  );

  _react['default'].useEffect(
    function () {
      setMinimumInput(min || '');
    },
    [min],
  );

  _react['default'].useEffect(
    function () {
      var _getRangeValues = getRangeValues(),
        min = _getRangeValues.min,
        max = _getRangeValues.max;

      var atLeastOneProvided = !(isNaN(min) && isNaN(max));

      var validIfProvided = function validIfProvided(input) {
        return input === '' ? true : validator(input);
      };

      setInputsValid(
        atLeastOneProvided && validIfProvided(minimumInput) && validIfProvided(maximumInput),
      );
    },
    [minimumInput, maximumInput],
  );

  var goButtonHandler = function goButtonHandler() {
    var _getRangeValues2 = getRangeValues(),
      min = _getRangeValues2.min,
      max = _getRangeValues2.max;

    onSubmit(min, max);
  };

  return (0, _core.jsx)(
    _SubMenu.MenuItem,
    {
      onClick: onClick,
      selected: isExpanded,
      isFacetVariant: true,
      className: 'FacetMenu',
      content: subMenuName,
      chevronOnLeftSide: true,
      css: _ref,
    },
    (0, _core.jsx)(_SubMenu.MenuItem, {
      className: 'FacetContentSlim',
      selected: false,
      level: 1,
      content: (0, _core.jsx)(_NumberRangeField['default'], {
        min: minimumInput,
        max: maximumInput,
        onMinChange: setMinimumInput,
        onMaxChange: setMaximumInput,
        onGoClick: goButtonHandler,
        goButtonEnabled: inputsValid,
        validation: validator,
      }),
      contentAs: 'div',
    }),
  );
};

var _default = NumberRangeFacet;
exports['default'] = _default;
