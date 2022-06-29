'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _css2 = _interopRequireDefault(require('@emotion/css'));

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _react = _interopRequireDefault(require('react'));

var _FormControlContext = _interopRequireDefault(require('../FormControl/FormControlContext'));

var _clsx = _interopRequireDefault(require('clsx'));

var _pick = _interopRequireDefault(require('lodash/pick'));

var __jsx = _react['default'].createElement;

var FormHelperText = /*#__PURE__*/ _react['default'].forwardRef(function FormHelperText(
  props,
  ref,
) {
  var _props$component = props.component,
    Component = _props$component === void 0 ? 'p' : _props$component,
    classNameProp = props.className,
    children = props.children,
    _props$onErrorOnly = props.onErrorOnly,
    onErrorOnly = _props$onErrorOnly === void 0 ? false : _props$onErrorOnly;
  var StyledComponent = /*#__PURE__*/ (0, _styledBase['default'])(Component, {
    target: 'e1vj8mgl0',
    label: 'Uikit-StyledComponent',
  })(
    function (_ref) {
      var theme = _ref.theme;
      return /*#__PURE__*/ (0, _css2['default'])(
        theme.typography.caption,
        ';label:Uikit-StyledComponent;' +
          (process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQnFCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRm9ybUNvbnRyb2xDb250ZXh0IGZyb20gJy4uL0Zvcm1Db250cm9sL0Zvcm1Db250cm9sQ29udGV4dCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcbmNvbnN0IEZvcm1IZWxwZXJUZXh0ID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBGb3JtSGVscGVyVGV4dChwcm9wcywgcmVmKSB7XG4gICAgY29uc3QgeyBjb21wb25lbnQ6IENvbXBvbmVudCA9ICdwJywgY2xhc3NOYW1lOiBjbGFzc05hbWVQcm9wLCBjaGlsZHJlbiwgb25FcnJvck9ubHkgPSBmYWxzZSwgfSA9IHByb3BzO1xuICAgIGNvbnN0IFN0eWxlZENvbXBvbmVudCA9IHN0eWxlZChDb21wb25lbnQpIGBcbiAgICAkeyh7IHRoZW1lIH0pID0+IGNzcyh0aGVtZS50eXBvZ3JhcGh5LmNhcHRpb24pfTtcbiAgICBtYXJnaW46IDNweCA3cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE0cHg7XG5cbiAgICAmLmVycm9yIHtcbiAgICAgIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5lcnJvcn07XG4gICAgfVxuXG4gICAgJi5kaXNhYmxlZCB7XG4gICAgICAkeyFvbkVycm9yT25seSAmJiBgZGlzcGxheTogbm9uZTtgfVxuICAgIH1cbiAgYDtcbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSBSZWFjdC51c2VDb250ZXh0KEZvcm1Db250cm9sQ29udGV4dCk7XG4gICAgcmV0dXJuICFvbkVycm9yT25seSB8fCBjb250ZXh0VmFsdWUuZXJyb3IgPyAoPFN0eWxlZENvbXBvbmVudCByZWY9e3JlZn0gY2xhc3NOYW1lPXtjbHN4KHBpY2soY29udGV4dFZhbHVlLCBbJ2Vycm9yJywgJ2Rpc2FibGVkJ10pLCBjbGFzc05hbWVQcm9wKX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TdHlsZWRDb21wb25lbnQ+KSA6ICg8PjwvPik7XG59KTtcbkZvcm1IZWxwZXJUZXh0LmRpc3BsYXlOYW1lID0gJ0Zvcm1IZWxwZXJUZXh0JztcbmV4cG9ydCBkZWZhdWx0IEZvcm1IZWxwZXJUZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
      );
    },
    ';margin:3px 7px;line-height:14px;&.error{color:',
    function (_ref2) {
      var theme = _ref2.theme;
      return theme.colors.error;
    },
    ';}&.disabled{',
    !onErrorOnly && 'display: none;',
    '}' +
      (process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQjhDIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRm9ybUNvbnRyb2xDb250ZXh0IGZyb20gJy4uL0Zvcm1Db250cm9sL0Zvcm1Db250cm9sQ29udGV4dCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcbmNvbnN0IEZvcm1IZWxwZXJUZXh0ID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBGb3JtSGVscGVyVGV4dChwcm9wcywgcmVmKSB7XG4gICAgY29uc3QgeyBjb21wb25lbnQ6IENvbXBvbmVudCA9ICdwJywgY2xhc3NOYW1lOiBjbGFzc05hbWVQcm9wLCBjaGlsZHJlbiwgb25FcnJvck9ubHkgPSBmYWxzZSwgfSA9IHByb3BzO1xuICAgIGNvbnN0IFN0eWxlZENvbXBvbmVudCA9IHN0eWxlZChDb21wb25lbnQpIGBcbiAgICAkeyh7IHRoZW1lIH0pID0+IGNzcyh0aGVtZS50eXBvZ3JhcGh5LmNhcHRpb24pfTtcbiAgICBtYXJnaW46IDNweCA3cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE0cHg7XG5cbiAgICAmLmVycm9yIHtcbiAgICAgIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5lcnJvcn07XG4gICAgfVxuXG4gICAgJi5kaXNhYmxlZCB7XG4gICAgICAkeyFvbkVycm9yT25seSAmJiBgZGlzcGxheTogbm9uZTtgfVxuICAgIH1cbiAgYDtcbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSBSZWFjdC51c2VDb250ZXh0KEZvcm1Db250cm9sQ29udGV4dCk7XG4gICAgcmV0dXJuICFvbkVycm9yT25seSB8fCBjb250ZXh0VmFsdWUuZXJyb3IgPyAoPFN0eWxlZENvbXBvbmVudCByZWY9e3JlZn0gY2xhc3NOYW1lPXtjbHN4KHBpY2soY29udGV4dFZhbHVlLCBbJ2Vycm9yJywgJ2Rpc2FibGVkJ10pLCBjbGFzc05hbWVQcm9wKX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TdHlsZWRDb21wb25lbnQ+KSA6ICg8PjwvPik7XG59KTtcbkZvcm1IZWxwZXJUZXh0LmRpc3BsYXlOYW1lID0gJ0Zvcm1IZWxwZXJUZXh0JztcbmV4cG9ydCBkZWZhdWx0IEZvcm1IZWxwZXJUZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
  );

  var contextValue = _react['default'].useContext(_FormControlContext['default']);

  return !onErrorOnly || contextValue.error
    ? (0, _core.jsx)(
        StyledComponent,
        {
          ref: ref,
          className: (0, _clsx['default'])(
            (0, _pick['default'])(contextValue, ['error', 'disabled']),
            classNameProp,
          ),
        },
        children,
      )
    : (0, _core.jsx)(_react['default'].Fragment, null);
});

FormHelperText.displayName = 'FormHelperText';
var _default = FormHelperText;
exports['default'] = _default;
