'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _react = _interopRequireWildcard(require('react'));

var _Icon = _interopRequireDefault(require('../../Icon'));

var _ThemeProvider = require('../../ThemeProvider');

var _Checkbox = _interopRequireDefault(require('../Checkbox'));

var _common = require('../common');

var _FormControlContext = _interopRequireDefault(require('../FormControl/FormControlContext'));

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

/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __rest =
  (void 0 && (void 0).__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '16kybpw-Uikit-FormCheckbox',
        styles: 'margin-left:8px;;label:Uikit-FormCheckbox;',
      }
    : {
        name: '16kybpw-Uikit-FormCheckbox',
        styles: 'margin-left:8px;;label:Uikit-FormCheckbox;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzRXNCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi8uLi9JY29uJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vLi4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vQ2hlY2tib3gnO1xuaW1wb3J0IHsgUmFkaW9DaGVja2JveFdyYXBwZXIgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuaW1wb3J0IFJhZGlvQ2hlY2tDb250ZXh0IGZyb20gJy4uL1JhZGlvQ2hlY2tib3hHcm91cC9SYWRpb0NoZWNrQ29udGV4dCc7XG5jb25zdCBGb3JtQ2hlY2tib3ggPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjaGVja2VkLCBjaGlsZHJlbiwgdmFsdWUgfSA9IF9hLCBwcm9wcyA9IF9fcmVzdChfYSwgW1wiY2hlY2tlZFwiLCBcImNoaWxkcmVuXCIsIFwidmFsdWVcIl0pO1xuICAgIGNvbnN0IFtpc0ZvY3VzZWQsIHNldElzRm9jdXNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICAgIGNvbnN0IGNoZWNrYm94UmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3QgaGlkZGVuQ2hlY2tib3hSZWYgPSB1c2VSZWYoKTtcbiAgICBjb25zdCB7IG9uQ2hhbmdlID0gcHJvcHMub25DaGFuZ2UsIGlzQ2hlY2tlZCB9ID0gdXNlQ29udGV4dChSYWRpb0NoZWNrQ29udGV4dCk7XG4gICAgY29uc3QgeyBkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkLCBlcnJvciA9IHByb3BzLmVycm9yLCBmb2N1c2VkLCBoYW5kbGVCbHVyLCBoYW5kbGVGb2N1cywgcmVxdWlyZWQgPSBwcm9wcy5yZXF1aXJlZCwgfSA9IFJlYWN0LnVzZUNvbnRleHQoRm9ybUNvbnRyb2xDb250ZXh0KTtcbiAgICBjb25zdCBvbkJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoY2hlY2tib3hSZWYuY3VycmVudCA9PT0gZXZlbnQudGFyZ2V0IHx8IGhpZGRlbkNoZWNrYm94UmVmLmN1cnJlbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgc2V0SXNGb2N1c2VkKGZhbHNlKTtcbiAgICAgICAgICAgIGhhbmRsZUJsdXIgPT09IG51bGwgfHwgaGFuZGxlQmx1ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZGxlQmx1cigpO1xuICAgICAgICAgICAgKF9hID0gcHJvcHMub25CbHVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbkNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghKGNoZWNrYm94UmVmLmN1cnJlbnQgPT09IGV2ZW50LnRhcmdldCB8fCBoaWRkZW5DaGVja2JveFJlZi5jdXJyZW50ID09PSBldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBjaGVja2JveFJlZi5jdXJyZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9uRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoY2hlY2tib3hSZWYuY3VycmVudCA9PT0gZXZlbnQudGFyZ2V0IHx8IGhpZGRlbkNoZWNrYm94UmVmLmN1cnJlbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgc2V0SXNGb2N1c2VkKHRydWUpO1xuICAgICAgICAgICAgaGFuZGxlRm9jdXMgPT09IG51bGwgfHwgaGFuZGxlRm9jdXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUZvY3VzKCk7XG4gICAgICAgICAgICAoX2EgPSBwcm9wcy5vbkZvY3VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjYWxjQ2hlY2tlZCA9IHR5cGVvZiBpc0NoZWNrZWQgPT09ICdmdW5jdGlvbicgPyBpc0NoZWNrZWQodmFsdWUpIDogaXNDaGVja2VkIHx8IGNoZWNrZWQ7XG4gICAgcmV0dXJuICg8UmFkaW9DaGVja2JveFdyYXBwZXIgY2hlY2tlZD17Y2FsY0NoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gZXJyb3I9e2Vycm9yfSBmb2N1c2VkPXtmb2N1c2VkIHx8IGlzRm9jdXNlZH0gb25DbGljaz17b25DbGlja30+XG4gICAgICA8Q2hlY2tib3ggdmFsdWU9e3ZhbHVlfSBjaGVja2VkPXtjYWxjQ2hlY2tlZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBmb3J3YXJkZWRSZWZzPXtbY2hlY2tib3hSZWYsIGhpZGRlbkNoZWNrYm94UmVmXX0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25Gb2N1cz17b25Gb2N1c30gYXJpYS1sYWJlbD17cHJvcHNbJ2FyaWEtbGFiZWwnXX0vPlxuXG4gICAgICA8bGFiZWwgY3NzPXtjc3MgYFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiA4cHg7XG4gICAgICAgIGB9PlxuICAgICAgICB7Y2hpbGRyZW59XG5cbiAgICAgICAge3JlcXVpcmVkICYmICg8c3Bhbj5cbiAgICAgICAgICAgIDxJY29uIGNzcz17Y3NzIGBcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgICAgICAgICAgYH0gd2lkdGg9XCI2cHhcIiBoZWlnaHQ9XCI2cHhcIiBuYW1lPVwiYXN0ZXJpc2tcIiBmaWxsPXt0aGVtZS5jb2xvcnMuZXJyb3J9Lz5cbiAgICAgICAgICA8L3NwYW4+KX1cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9SYWRpb0NoZWNrYm94V3JhcHBlcj4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZvcm1DaGVja2JveDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var _ref2 =
  process.env.NODE_ENV === 'production'
    ? {
        name: '17ybwg-Uikit-FormCheckbox',
        styles: 'margin-bottom:5px;margin-left:5px;;label:Uikit-FormCheckbox;',
      }
    : {
        name: '17ybwg-Uikit-FormCheckbox',
        styles: 'margin-bottom:5px;margin-left:5px;;label:Uikit-FormCheckbox;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0RTJCIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi8uLi9JY29uJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vLi4vVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vQ2hlY2tib3gnO1xuaW1wb3J0IHsgUmFkaW9DaGVja2JveFdyYXBwZXIgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuaW1wb3J0IFJhZGlvQ2hlY2tDb250ZXh0IGZyb20gJy4uL1JhZGlvQ2hlY2tib3hHcm91cC9SYWRpb0NoZWNrQ29udGV4dCc7XG5jb25zdCBGb3JtQ2hlY2tib3ggPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjaGVja2VkLCBjaGlsZHJlbiwgdmFsdWUgfSA9IF9hLCBwcm9wcyA9IF9fcmVzdChfYSwgW1wiY2hlY2tlZFwiLCBcImNoaWxkcmVuXCIsIFwidmFsdWVcIl0pO1xuICAgIGNvbnN0IFtpc0ZvY3VzZWQsIHNldElzRm9jdXNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICAgIGNvbnN0IGNoZWNrYm94UmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3QgaGlkZGVuQ2hlY2tib3hSZWYgPSB1c2VSZWYoKTtcbiAgICBjb25zdCB7IG9uQ2hhbmdlID0gcHJvcHMub25DaGFuZ2UsIGlzQ2hlY2tlZCB9ID0gdXNlQ29udGV4dChSYWRpb0NoZWNrQ29udGV4dCk7XG4gICAgY29uc3QgeyBkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkLCBlcnJvciA9IHByb3BzLmVycm9yLCBmb2N1c2VkLCBoYW5kbGVCbHVyLCBoYW5kbGVGb2N1cywgcmVxdWlyZWQgPSBwcm9wcy5yZXF1aXJlZCwgfSA9IFJlYWN0LnVzZUNvbnRleHQoRm9ybUNvbnRyb2xDb250ZXh0KTtcbiAgICBjb25zdCBvbkJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoY2hlY2tib3hSZWYuY3VycmVudCA9PT0gZXZlbnQudGFyZ2V0IHx8IGhpZGRlbkNoZWNrYm94UmVmLmN1cnJlbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgc2V0SXNGb2N1c2VkKGZhbHNlKTtcbiAgICAgICAgICAgIGhhbmRsZUJsdXIgPT09IG51bGwgfHwgaGFuZGxlQmx1ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZGxlQmx1cigpO1xuICAgICAgICAgICAgKF9hID0gcHJvcHMub25CbHVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbkNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghKGNoZWNrYm94UmVmLmN1cnJlbnQgPT09IGV2ZW50LnRhcmdldCB8fCBoaWRkZW5DaGVja2JveFJlZi5jdXJyZW50ID09PSBldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBjaGVja2JveFJlZi5jdXJyZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9uRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoY2hlY2tib3hSZWYuY3VycmVudCA9PT0gZXZlbnQudGFyZ2V0IHx8IGhpZGRlbkNoZWNrYm94UmVmLmN1cnJlbnQgPT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgc2V0SXNGb2N1c2VkKHRydWUpO1xuICAgICAgICAgICAgaGFuZGxlRm9jdXMgPT09IG51bGwgfHwgaGFuZGxlRm9jdXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUZvY3VzKCk7XG4gICAgICAgICAgICAoX2EgPSBwcm9wcy5vbkZvY3VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjYWxjQ2hlY2tlZCA9IHR5cGVvZiBpc0NoZWNrZWQgPT09ICdmdW5jdGlvbicgPyBpc0NoZWNrZWQodmFsdWUpIDogaXNDaGVja2VkIHx8IGNoZWNrZWQ7XG4gICAgcmV0dXJuICg8UmFkaW9DaGVja2JveFdyYXBwZXIgY2hlY2tlZD17Y2FsY0NoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gZXJyb3I9e2Vycm9yfSBmb2N1c2VkPXtmb2N1c2VkIHx8IGlzRm9jdXNlZH0gb25DbGljaz17b25DbGlja30+XG4gICAgICA8Q2hlY2tib3ggdmFsdWU9e3ZhbHVlfSBjaGVja2VkPXtjYWxjQ2hlY2tlZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBmb3J3YXJkZWRSZWZzPXtbY2hlY2tib3hSZWYsIGhpZGRlbkNoZWNrYm94UmVmXX0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25Gb2N1cz17b25Gb2N1c30gYXJpYS1sYWJlbD17cHJvcHNbJ2FyaWEtbGFiZWwnXX0vPlxuXG4gICAgICA8bGFiZWwgY3NzPXtjc3MgYFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiA4cHg7XG4gICAgICAgIGB9PlxuICAgICAgICB7Y2hpbGRyZW59XG5cbiAgICAgICAge3JlcXVpcmVkICYmICg8c3Bhbj5cbiAgICAgICAgICAgIDxJY29uIGNzcz17Y3NzIGBcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgICAgICAgICAgYH0gd2lkdGg9XCI2cHhcIiBoZWlnaHQ9XCI2cHhcIiBuYW1lPVwiYXN0ZXJpc2tcIiBmaWxsPXt0aGVtZS5jb2xvcnMuZXJyb3J9Lz5cbiAgICAgICAgICA8L3NwYW4+KX1cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9SYWRpb0NoZWNrYm94V3JhcHBlcj4pO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZvcm1DaGVja2JveDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var FormCheckbox = function FormCheckbox(_a) {
  var checked = _a.checked,
    children = _a.children,
    value = _a.value,
    props = __rest(_a, ['checked', 'children', 'value']);

  var _useState = (0, _react.useState)(false),
    isFocused = _useState[0],
    setIsFocused = _useState[1];

  var theme = (0, _ThemeProvider.useTheme)();
  var checkboxRef = (0, _react.useRef)();
  var hiddenCheckboxRef = (0, _react.useRef)();

  var _useContext = (0, _react.useContext)(_RadioCheckContext['default']),
    _useContext$onChange = _useContext.onChange,
    onChange = _useContext$onChange === void 0 ? props.onChange : _useContext$onChange,
    isChecked = _useContext.isChecked;

  var _React$useContext = _react['default'].useContext(_FormControlContext['default']),
    _React$useContext$dis = _React$useContext.disabled,
    disabled = _React$useContext$dis === void 0 ? props.disabled : _React$useContext$dis,
    _React$useContext$err = _React$useContext.error,
    error = _React$useContext$err === void 0 ? props.error : _React$useContext$err,
    focused = _React$useContext.focused,
    handleBlur = _React$useContext.handleBlur,
    handleFocus = _React$useContext.handleFocus,
    _React$useContext$req = _React$useContext.required,
    required = _React$useContext$req === void 0 ? props.required : _React$useContext$req;

  var onBlur = function onBlur(event) {
    var _a;

    if (checkboxRef.current === event.target || hiddenCheckboxRef.current === event.target) {
      setIsFocused(false);
      handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
      (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
    }
  };

  var onClick = function onClick(event) {
    if (!(checkboxRef.current === event.target || hiddenCheckboxRef.current === event.target)) {
      checkboxRef.current.click();
    }
  };

  var onFocus = function onFocus(event) {
    var _a;

    if (checkboxRef.current === event.target || hiddenCheckboxRef.current === event.target) {
      setIsFocused(true);
      handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
      (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
    }
  };

  var calcChecked = typeof isChecked === 'function' ? isChecked(value) : isChecked || checked;
  return (0, _core.jsx)(
    _common.RadioCheckboxWrapper,
    {
      checked: calcChecked,
      disabled: disabled,
      error: error,
      focused: focused || isFocused,
      onClick: onClick,
    },
    (0, _core.jsx)(_Checkbox['default'], {
      value: value,
      checked: calcChecked,
      disabled: disabled,
      forwardedRefs: [checkboxRef, hiddenCheckboxRef],
      onBlur: onBlur,
      onChange: onChange,
      onFocus: onFocus,
      'aria-label': props['aria-label'],
    }),
    (0, _core.jsx)(
      'label',
      {
        css: _ref,
      },
      children,
      required &&
        (0, _core.jsx)(
          'span',
          null,
          (0, _core.jsx)(_Icon['default'], {
            css: _ref2,
            width: '6px',
            height: '6px',
            name: 'asterisk',
            fill: theme.colors.error,
          }),
        ),
    ),
  );
};

var _default = FormCheckbox;
exports['default'] = _default;
