'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _core = require('@emotion/core');

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _css2 = _interopRequireDefault(require('@emotion/css'));

var _react = _interopRequireWildcard(require('react'));

var _clsx = _interopRequireDefault(require('clsx'));

var _ThemeProvider = require('../../ThemeProvider');

var _Typography = _interopRequireDefault(require('../../Typography'));

var _FormControlContext = _interopRequireDefault(require('../FormControl/FormControlContext'));

var _types = require('./types');

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

var LINE_JUMP_PLACEHOLDER = ' øö ';

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'crad7d-Uikit-Textarea',
        styles: 'position:relative;;label:Uikit-Textarea;',
      }
    : {
        name: 'crad7d-Uikit-Textarea',
        styles: 'position:relative;;label:Uikit-Textarea;',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4R3NEIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICd1aWtpdC9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ3Vpa2l0L1R5cG9ncmFwaHknO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuaW1wb3J0IHsgQ291bnRMYWJlbHMgfSBmcm9tICcuL3R5cGVzJztcbmNvbnN0IExJTkVfSlVNUF9QTEFDRUhPTERFUiA9ICcgw7jDtiAnO1xuY29uc3QgVGV4dGFyZWEgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGNvdW50RGlyZWN0aW9uID0gJ2FzYycsIGNvdW50TGltaXQgPSAwLCBjb3VudFBvc2l0aW9uID0gJ3JpZ2h0JywgY291bnRUeXBlID0gJ2NoYXJzJywgZm9jdXNlZDogcHJvcHNGb2N1c2VkLCAvLyBzbyBpdCdzIG5vdCBwYXNzZWQgdG8gdGhlIGh0bWwgZWxlbWVudFxuICAgIG9uQ2hhbmdlOiBwcm9wc09uQ2hhbmdlLCB0cnVuY2F0ZSwgdmFsdWUgPSAnJyB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJjbGFzc05hbWVcIiwgXCJjb3VudERpcmVjdGlvblwiLCBcImNvdW50TGltaXRcIiwgXCJjb3VudFBvc2l0aW9uXCIsIFwiY291bnRUeXBlXCIsIFwiZm9jdXNlZFwiLCBcIm9uQ2hhbmdlXCIsIFwidHJ1bmNhdGVcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgY29uc3QgW2N1cnJlbnRDb3VudCwgc2V0Q3VycmVudENvdW50XSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IFtpbnRlcm5hbFZhbHVlLCBzZXRJbnRlcm5hbFZhbHVlXSA9IHVzZVN0YXRlKHZhbHVlKTtcbiAgICBjb25zdCB7IGRpc2FibGVkLCBlcnJvciwgZm9jdXNlZCwgaGFuZGxlQmx1ciwgaGFuZGxlRm9jdXMgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRyb2xDb250ZXh0KSB8fCB7fTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3QgaGFzT3ZlcmZsb3dlZCA9IGNvdW50TGltaXQgJiYgY291bnRMaW1pdCAtIGN1cnJlbnRDb3VudCA8IDA7XG4gICAgY29uc3QgaGFzRXJyb3IgPSBlcnJvciB8fCAhIXByb3BzLmVycm9yIHx8IGhhc092ZXJmbG93ZWQ7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGRpc2FibGVkIHx8IHByb3BzLmRpc2FibGVkO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZvY3VzZWQgfHwgcHJvcHNGb2N1c2VkO1xuICAgIGNvbnN0IGNvdW50QWxpZ25tZW50ID0gY291bnRQb3NpdGlvbi5yZXBsYWNlKCdhYnNvbHV0ZScsICcnKS50cmltKCkgfHwgJ3JpZ2h0JztcbiAgICBjb25zdCBpc0FzY2VuZGluZyA9IGNvdW50RGlyZWN0aW9uID09PSAnYXNjJztcbiAgICBjb25zdCBvbkJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBoYW5kbGVCbHVyID09PSBudWxsIHx8IGhhbmRsZUJsdXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUJsdXIoKTtcbiAgICAgICAgKF9hID0gcHJvcHMub25CbHVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgIH07XG4gICAgY29uc3Qgb25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGhhbmRsZUZvY3VzID09PSBudWxsIHx8IGhhbmRsZUZvY3VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kbGVGb2N1cygpO1xuICAgICAgICAoX2EgPSBwcm9wcy5vbkZvY3VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgIH07XG4gICAgY29uc3QgZ2V0Q291bnQgPSB1c2VDYWxsYmFjaygobmV3Q291bnQpID0+IChpc0FzY2VuZGluZyA/IG5ld0NvdW50IDogY291bnRMaW1pdCAtIG5ld0NvdW50KSwgW1xuICAgICAgICBjb3VudExpbWl0LFxuICAgICAgICBpc0FzY2VuZGluZyxcbiAgICBdKTtcbiAgICBjb25zdCBhcHBseUNoYW5nZXMgPSB1c2VDYWxsYmFjaygodGFyZ2V0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGNvdW50TGltaXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHdpdGhvdXQgY291bnQgbGltaXQsIHdlIGRvbid0IGNhcmU6IGp1c3QgdXBkYXRlIHRoZSB2YWx1ZSBhcyBpc1xuICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZSh0YXJnZXRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNvdW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dvcmRzJzoge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgYSBwbGFjZWhvbGRlciBmb3IgbGluZSBicmVha3MsIHNvIHdlIGNhbiByZXNwZWN0IHdoaXRlIHNwYWNlIG9uIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZEFycmF5ID0gdGFyZ2V0VmFsdWUucmVwbGFjZSgvXFxuL2csIExJTkVfSlVNUF9QTEFDRUhPTERFUikuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzY291bnQgdGhlIGZvbGxvd2luZyBleGNlcHRpb25zIGFzIG5vbi13b3JkczpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1wdGllcyA9IHdvcmRBcnJheS5maWx0ZXIoKHgpID0+ICF4IHx8IC8vIGVtcHR5IHNwYWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9PT0gTElORV9KVU1QX1BMQUNFSE9MREVSLnRyaW0oKSB8fCAvLyBsaW5lIGJyZWFrcyAocGxhY2Vob2xkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAheC5tYXRjaCgvW2EtekEtWjAtOV0rL2cpKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1dvcmRBcnJheSA9IHRydW5jYXRlID8gd29yZEFycmF5LnNsaWNlKDAsIGNvdW50TGltaXQgKyBlbXB0aWVzKSA6IHdvcmRBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZENvdW50ID0gZ2V0Q291bnQobmV3V29yZEFycmF5Lmxlbmd0aCAtIGVtcHRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IG5ld1dvcmRBcnJheS5qb2luKCcgJykucmVwbGFjZUFsbChMSU5FX0pVTVBfUExBQ0VIT0xERVIsICdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jYXRlICYmIHdvcmRDb3VudCA9PT0gY291bnRMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudENvdW50KGNvdW50TGltaXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQod29yZENvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGFyYWN0ZXJzIGFzIGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0cnVuY2F0ZSA/IHRhcmdldFZhbHVlLnNsaWNlKDAsIGNvdW50TGltaXQpIDogdGFyZ2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHNldEludGVybmFsVmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQoZ2V0Q291bnQobmV3VmFsdWUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtjb3VudExpbWl0LCBwcm9wc09uQ2hhbmdlLCB0cnVuY2F0ZV0pO1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBub3JtYWxpc2UgbGluZSBicmVha3NcbiAgICAgICAgbGV0IHRhcmdldFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZywgJ1xcbicpO1xuICAgICAgICBhcHBseUNoYW5nZXModGFyZ2V0VmFsdWUpO1xuICAgICAgICBwcm9wc09uQ2hhbmdlID09PSBudWxsIHx8IHByb3BzT25DaGFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzT25DaGFuZ2UoZXZlbnQpO1xuICAgIH07XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdmFsdWUgJiYgYXBwbHlDaGFuZ2VzKHZhbHVlKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIlRleHRhcmVhV3JhcHBlclwiIGNzcz17Y3NzIGBcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYH0+XG4gICAgICA8dGV4dGFyZWEgey4uLnByb3BzfSBjbGFzc05hbWU9e2Nsc3goeyBlcnJvcjogaGFzRXJyb3IsIGRpc2FibGVkOiBpc0Rpc2FibGVkLCBmb2N1c2VkOiBpc0ZvY3VzZWQgfSwgY2xhc3NOYW1lKX0gY3NzPXtjc3MgYFxuICAgICAgICAgICR7Y3NzKHRoZW1lLnR5cG9ncmFwaHkucGFyYWdyYXBoKX07XG4gICAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmRlZmF1bHR9O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhlbWUuaW5wdXQuY29sb3JzLmRlZmF1bHR9O1xuXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmhvdmVyfSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICYuZm9jdXNlZCxcbiAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmZvY3VzfTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggNHB4IDBweCAke3RoZW1lLmNvbG9ycy5zZWNvbmRhcnlfMX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5lcnJvciB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmVycm9yfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmLmRpc2FibGVkIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuZGlzYWJsZWR9O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGVtZS5pbnB1dC5jb2xvcnMuZGlzYWJsZWR9O1xuICAgICAgICAgICAgY29sb3I6ICR7dGhlbWUuaW5wdXQuY29sb3JzLmdyZXl9O1xuICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogI2QwZDFkOCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYH0gZGlzYWJsZWQ9e2lzRGlzYWJsZWR9IGlkPXtwcm9wcy5pZH0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9IG9uRm9jdXM9e29uRm9jdXN9IHZhbHVlPXtpbnRlcm5hbFZhbHVlfS8+XG5cbiAgICAgIHtjb3VudExpbWl0ID4gMCAmJiBPYmplY3Qua2V5cyhDb3VudExhYmVscykuaW5jbHVkZXMoY291bnRUeXBlKSAmJiAoPFR5cG9ncmFwaHkgY29sb3I9e2hhc092ZXJmbG93ZWQgPyAnZXJyb3InIDogJ2dyZXknfSBjc3M9e2NzcyBgXG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAke2NvdW50UG9zaXRpb24uaW5jbHVkZXMoJ2Fic29sdXRlJylcbiAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICR7Y291bnRBbGlnbm1lbnR9OiA2cHg7XG4gICAgICAgICAgICAgIGBcbiAgICAgICAgOiBgdGV4dC1hbGlnbjogJHtjb3VudEFsaWdubWVudH07YH1cblxuICAgICAgICAgICAgLmN1cnJlbnRDb3VudCB7XG4gICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvdW50TGltaXQge1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN1cnJlbnRDb3VudFwiPntjdXJyZW50Q291bnR9PC9zcGFuPi9cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudExpbWl0XCI+e2NvdW50TGltaXR9PC9zcGFuPnsnICd9XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY291bnRMYWJlbFwiPntDb3VudExhYmVsc1tjb3VudFR5cGVdfTwvc3Bhbj5cbiAgICAgICAgPC9UeXBvZ3JhcGh5Pil9XG4gICAgPC9kaXY+KTtcbn07XG5UZXh0YXJlYS5kaXNwbGF5TmFtZSA9ICdUZXh0YXJlYSc7XG5leHBvcnQgZGVmYXVsdCBUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      };

var Textarea = function Textarea(_a) {
  var className = _a.className,
    _a$countDirection = _a.countDirection,
    countDirection = _a$countDirection === void 0 ? 'asc' : _a$countDirection,
    _a$countLimit = _a.countLimit,
    countLimit = _a$countLimit === void 0 ? 0 : _a$countLimit,
    _a$countPosition = _a.countPosition,
    countPosition = _a$countPosition === void 0 ? 'right' : _a$countPosition,
    _a$countType = _a.countType,
    countType = _a$countType === void 0 ? 'chars' : _a$countType,
    propsFocused = _a.focused,
    propsOnChange = _a.onChange,
    truncate = _a.truncate,
    _a$value = _a.value,
    value = _a$value === void 0 ? '' : _a$value,
    props = __rest(_a, [
      'className',
      'countDirection',
      'countLimit',
      'countPosition',
      'countType',
      'focused',
      'onChange',
      'truncate',
      'value',
    ]);

  var _useState = (0, _react.useState)(0),
    currentCount = _useState[0],
    setCurrentCount = _useState[1];

  var _useState2 = (0, _react.useState)(value),
    internalValue = _useState2[0],
    setInternalValue = _useState2[1];

  var _ref2 = (0, _react.useContext)(_FormControlContext['default']) || {},
    disabled = _ref2.disabled,
    error = _ref2.error,
    focused = _ref2.focused,
    handleBlur = _ref2.handleBlur,
    handleFocus = _ref2.handleFocus;

  var theme = (0, _ThemeProvider.useTheme)();
  var hasOverflowed = countLimit && countLimit - currentCount < 0;
  var hasError = error || !!props.error || hasOverflowed;
  var isDisabled = disabled || props.disabled;
  var isFocused = focused || propsFocused;
  var countAlignment = countPosition.replace('absolute', '').trim() || 'right';
  var isAscending = countDirection === 'asc';

  var onBlur = function onBlur(event) {
    var _a;

    handleBlur === null || handleBlur === void 0 ? void 0 : handleBlur();
    (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };

  var onFocus = function onFocus(event) {
    var _a;

    handleFocus === null || handleFocus === void 0 ? void 0 : handleFocus();
    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, event);
  };

  var getCount = (0, _react.useCallback)(
    function (newCount) {
      return isAscending ? newCount : countLimit - newCount;
    },
    [countLimit, isAscending],
  );
  var applyChanges = (0, _react.useCallback)(
    function (targetValue) {
      if (countLimit === 0) {
        // without count limit, we don't care: just update the value as is
        setInternalValue(targetValue);
      } else {
        switch (countType) {
          case 'words': {
            // use a placeholder for line breaks, so we can respect white space on display
            var wordArray = targetValue.replace(/\n/g, LINE_JUMP_PLACEHOLDER).split(/\s/g); // discount the following exceptions as non-words:

            var empties = wordArray.filter(function (x) {
              return (
                !x || // empty spaces
                x === LINE_JUMP_PLACEHOLDER.trim() || // line breaks (placeholder)
                !x.match(/[a-zA-Z0-9]+/g)
              );
            }).length;
            var newWordArray = truncate ? wordArray.slice(0, countLimit + empties) : wordArray;
            var wordCount = getCount(newWordArray.length - empties);
            var newValue = newWordArray.join(' ').replaceAll(LINE_JUMP_PLACEHOLDER, '\n');

            if (truncate && wordCount === countLimit) {
              setInternalValue(newValue.trim());
              setCurrentCount(countLimit);
            } else {
              setInternalValue(newValue);
              setCurrentCount(wordCount);
            }

            break;
          }

          default: {
            // Characters as default
            var _newValue = truncate ? targetValue.slice(0, countLimit) : targetValue;

            setInternalValue(_newValue);
            setCurrentCount(getCount(_newValue.length));
            break;
          }
        }
      }
    },
    [countLimit, propsOnChange, truncate],
  );

  var handleChange = function handleChange(event) {
    // normalise line breaks
    var targetValue = event.target.value.replace(/(\r\n|\r|\n)/g, '\n');
    applyChanges(targetValue);
    propsOnChange === null || propsOnChange === void 0 ? void 0 : propsOnChange(event);
  };

  (0, _react.useEffect)(function () {
    value && applyChanges(value);
  }, []);
  return (0, _core.jsx)(
    'div',
    {
      className: 'TextareaWrapper',
      css: _ref,
    },
    (0, _core.jsx)(
      'textarea',
      (0, _extends2['default'])({}, props, {
        className: (0, _clsx['default'])(
          {
            error: hasError,
            disabled: isDisabled,
            focused: isFocused,
          },
          className,
        ),
        css: /*#__PURE__*/ (0, _css2['default'])(
          /*#__PURE__*/ (0, _css2['default'])(
            theme.typography.paragraph,
            ';label:Uikit-Textarea;' +
              (process.env.NODE_ENV === 'production'
                ? ''
                : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrSFkiLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMCBUaGUgT250YXJpbyBJbnN0aXR1dGUgZm9yIENhbmNlciBSZXNlYXJjaC4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICpcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZlxuICogdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wLiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZXG4gKiBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVNcbiAqIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UXG4gKiBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCxcbiAqIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRFxuICogVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTO1xuICogT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU5cbiAqIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDb250ZXh0LCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNzcyBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCc7XG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ3Vpa2l0L1RoZW1lUHJvdmlkZXInO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAndWlraXQvVHlwb2dyYXBoeSc7XG5pbXBvcnQgRm9ybUNvbnRyb2xDb250ZXh0IGZyb20gJy4uL0Zvcm1Db250cm9sL0Zvcm1Db250cm9sQ29udGV4dCc7XG5pbXBvcnQgeyBDb3VudExhYmVscyB9IGZyb20gJy4vdHlwZXMnO1xuY29uc3QgTElORV9KVU1QX1BMQUNFSE9MREVSID0gJyDDuMO2ICc7XG5jb25zdCBUZXh0YXJlYSA9IChfYSkgPT4ge1xuICAgIHZhciB7IGNsYXNzTmFtZSwgY291bnREaXJlY3Rpb24gPSAnYXNjJywgY291bnRMaW1pdCA9IDAsIGNvdW50UG9zaXRpb24gPSAncmlnaHQnLCBjb3VudFR5cGUgPSAnY2hhcnMnLCBmb2N1c2VkOiBwcm9wc0ZvY3VzZWQsIC8vIHNvIGl0J3Mgbm90IHBhc3NlZCB0byB0aGUgaHRtbCBlbGVtZW50XG4gICAgb25DaGFuZ2U6IHByb3BzT25DaGFuZ2UsIHRydW5jYXRlLCB2YWx1ZSA9ICcnIH0gPSBfYSwgcHJvcHMgPSBfX3Jlc3QoX2EsIFtcImNsYXNzTmFtZVwiLCBcImNvdW50RGlyZWN0aW9uXCIsIFwiY291bnRMaW1pdFwiLCBcImNvdW50UG9zaXRpb25cIiwgXCJjb3VudFR5cGVcIiwgXCJmb2N1c2VkXCIsIFwib25DaGFuZ2VcIiwgXCJ0cnVuY2F0ZVwiLCBcInZhbHVlXCJdKTtcbiAgICBjb25zdCBbY3VycmVudENvdW50LCBzZXRDdXJyZW50Q291bnRdID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgW2ludGVybmFsVmFsdWUsIHNldEludGVybmFsVmFsdWVdID0gdXNlU3RhdGUodmFsdWUpO1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIGVycm9yLCBmb2N1c2VkLCBoYW5kbGVCbHVyLCBoYW5kbGVGb2N1cyB9ID0gdXNlQ29udGV4dChGb3JtQ29udHJvbENvbnRleHQpIHx8IHt9O1xuICAgIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcbiAgICBjb25zdCBoYXNPdmVyZmxvd2VkID0gY291bnRMaW1pdCAmJiBjb3VudExpbWl0IC0gY3VycmVudENvdW50IDwgMDtcbiAgICBjb25zdCBoYXNFcnJvciA9IGVycm9yIHx8ICEhcHJvcHMuZXJyb3IgfHwgaGFzT3ZlcmZsb3dlZDtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gZGlzYWJsZWQgfHwgcHJvcHMuZGlzYWJsZWQ7XG4gICAgY29uc3QgaXNGb2N1c2VkID0gZm9jdXNlZCB8fCBwcm9wc0ZvY3VzZWQ7XG4gICAgY29uc3QgY291bnRBbGlnbm1lbnQgPSBjb3VudFBvc2l0aW9uLnJlcGxhY2UoJ2Fic29sdXRlJywgJycpLnRyaW0oKSB8fCAncmlnaHQnO1xuICAgIGNvbnN0IGlzQXNjZW5kaW5nID0gY291bnREaXJlY3Rpb24gPT09ICdhc2MnO1xuICAgIGNvbnN0IG9uQmx1ciA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGhhbmRsZUJsdXIgPT09IG51bGwgfHwgaGFuZGxlQmx1ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZGxlQmx1cigpO1xuICAgICAgICAoX2EgPSBwcm9wcy5vbkJsdXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHByb3BzLCBldmVudCk7XG4gICAgfTtcbiAgICBjb25zdCBvbkZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaGFuZGxlRm9jdXMgPT09IG51bGwgfHwgaGFuZGxlRm9jdXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUZvY3VzKCk7XG4gICAgICAgIChfYSA9IHByb3BzLm9uRm9jdXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHByb3BzLCBldmVudCk7XG4gICAgfTtcbiAgICBjb25zdCBnZXRDb3VudCA9IHVzZUNhbGxiYWNrKChuZXdDb3VudCkgPT4gKGlzQXNjZW5kaW5nID8gbmV3Q291bnQgOiBjb3VudExpbWl0IC0gbmV3Q291bnQpLCBbXG4gICAgICAgIGNvdW50TGltaXQsXG4gICAgICAgIGlzQXNjZW5kaW5nLFxuICAgIF0pO1xuICAgIGNvbnN0IGFwcGx5Q2hhbmdlcyA9IHVzZUNhbGxiYWNrKCh0YXJnZXRWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoY291bnRMaW1pdCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gd2l0aG91dCBjb3VudCBsaW1pdCwgd2UgZG9uJ3QgY2FyZToganVzdCB1cGRhdGUgdGhlIHZhbHVlIGFzIGlzXG4gICAgICAgICAgICBzZXRJbnRlcm5hbFZhbHVlKHRhcmdldFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoY291bnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnd29yZHMnOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBhIHBsYWNlaG9sZGVyIGZvciBsaW5lIGJyZWFrcywgc28gd2UgY2FuIHJlc3BlY3Qgd2hpdGUgc3BhY2Ugb24gZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkQXJyYXkgPSB0YXJnZXRWYWx1ZS5yZXBsYWNlKC9cXG4vZywgTElORV9KVU1QX1BMQUNFSE9MREVSKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkaXNjb3VudCB0aGUgZm9sbG93aW5nIGV4Y2VwdGlvbnMgYXMgbm9uLXdvcmRzOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbXB0aWVzID0gd29yZEFycmF5LmZpbHRlcigoeCkgPT4gIXggfHwgLy8gZW1wdHkgc3BhY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID09PSBMSU5FX0pVTVBfUExBQ0VIT0xERVIudHJpbSgpIHx8IC8vIGxpbmUgYnJlYWtzIChwbGFjZWhvbGRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICF4Lm1hdGNoKC9bYS16QS1aMC05XSsvZykpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3V29yZEFycmF5ID0gdHJ1bmNhdGUgPyB3b3JkQXJyYXkuc2xpY2UoMCwgY291bnRMaW1pdCArIGVtcHRpZXMpIDogd29yZEFycmF5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkQ291bnQgPSBnZXRDb3VudChuZXdXb3JkQXJyYXkubGVuZ3RoIC0gZW1wdGllcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV3V29yZEFycmF5LmpvaW4oJyAnKS5yZXBsYWNlQWxsKExJTkVfSlVNUF9QTEFDRUhPTERFUiwgJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJ1bmNhdGUgJiYgd29yZENvdW50ID09PSBjb3VudExpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcm5hbFZhbHVlKG5ld1ZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQoY291bnRMaW1pdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcm5hbFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRDb3VudCh3b3JkQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoYXJhY3RlcnMgYXMgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRydW5jYXRlID8gdGFyZ2V0VmFsdWUuc2xpY2UoMCwgY291bnRMaW1pdCkgOiB0YXJnZXRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRDb3VudChnZXRDb3VudChuZXdWYWx1ZS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2NvdW50TGltaXQsIHByb3BzT25DaGFuZ2UsIHRydW5jYXRlXSk7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIG5vcm1hbGlzZSBsaW5lIGJyZWFrc1xuICAgICAgICBsZXQgdGFyZ2V0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUucmVwbGFjZSgvKFxcclxcbnxcXHJ8XFxuKS9nLCAnXFxuJyk7XG4gICAgICAgIGFwcGx5Q2hhbmdlcyh0YXJnZXRWYWx1ZSk7XG4gICAgICAgIHByb3BzT25DaGFuZ2UgPT09IG51bGwgfHwgcHJvcHNPbkNoYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHNPbkNoYW5nZShldmVudCk7XG4gICAgfTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICB2YWx1ZSAmJiBhcHBseUNoYW5nZXModmFsdWUpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiVGV4dGFyZWFXcmFwcGVyXCIgY3NzPXtjc3MgYFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBgfT5cbiAgICAgIDx0ZXh0YXJlYSB7Li4ucHJvcHN9IGNsYXNzTmFtZT17Y2xzeCh7IGVycm9yOiBoYXNFcnJvciwgZGlzYWJsZWQ6IGlzRGlzYWJsZWQsIGZvY3VzZWQ6IGlzRm9jdXNlZCB9LCBjbGFzc05hbWUpfSBjc3M9e2NzcyBgXG4gICAgICAgICAgJHtjc3ModGhlbWUudHlwb2dyYXBoeS5wYXJhZ3JhcGgpfTtcbiAgICAgICAgICByZXNpemU6IHZlcnRpY2FsO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgcGFkZGluZzogOHB4IDEwcHg7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuZGVmYXVsdH07XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGVtZS5pbnB1dC5jb2xvcnMuZGVmYXVsdH07XG5cbiAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuaG92ZXJ9ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5mb2N1c2VkLFxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuZm9jdXN9O1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDBweCA0cHggMHB4ICR7dGhlbWUuY29sb3JzLnNlY29uZGFyeV8xfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmLmVycm9yIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuZXJyb3J9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICYuZGlzYWJsZWQge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAke3RoZW1lLmlucHV0LmJvcmRlckNvbG9ycy5kaXNhYmxlZH07XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoZW1lLmlucHV0LmNvbG9ycy5kaXNhYmxlZH07XG4gICAgICAgICAgICBjb2xvcjogJHt0aGVtZS5pbnB1dC5jb2xvcnMuZ3JleX07XG4gICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZDBkMWQ4ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgfSBkaXNhYmxlZD17aXNEaXNhYmxlZH0gaWQ9e3Byb3BzLmlkfSBvbkJsdXI9e29uQmx1cn0gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX0gb25Gb2N1cz17b25Gb2N1c30gdmFsdWU9e2ludGVybmFsVmFsdWV9Lz5cblxuICAgICAge2NvdW50TGltaXQgPiAwICYmIE9iamVjdC5rZXlzKENvdW50TGFiZWxzKS5pbmNsdWRlcyhjb3VudFR5cGUpICYmICg8VHlwb2dyYXBoeSBjb2xvcj17aGFzT3ZlcmZsb3dlZCA/ICdlcnJvcicgOiAnZ3JleSd9IGNzcz17Y3NzIGBcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICR7Y291bnRQb3NpdGlvbi5pbmNsdWRlcygnYWJzb2x1dGUnKVxuICAgICAgICA/IGBcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgJHtjb3VudEFsaWdubWVudH06IDZweDtcbiAgICAgICAgICAgICAgYFxuICAgICAgICA6IGB0ZXh0LWFsaWduOiAke2NvdW50QWxpZ25tZW50fTtgfVxuXG4gICAgICAgICAgICAuY3VycmVudENvdW50IHtcbiAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY291bnRMaW1pdCB7XG4gICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3VycmVudENvdW50XCI+e2N1cnJlbnRDb3VudH08L3NwYW4+L1xuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNvdW50TGltaXRcIj57Y291bnRMaW1pdH08L3NwYW4+eycgJ31cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudExhYmVsXCI+e0NvdW50TGFiZWxzW2NvdW50VHlwZV19PC9zcGFuPlxuICAgICAgICA8L1R5cG9ncmFwaHk+KX1cbiAgICA8L2Rpdj4pO1xufTtcblRleHRhcmVhLmRpc3BsYXlOYW1lID0gJ1RleHRhcmVhJztcbmV4cG9ydCBkZWZhdWx0IFRleHRhcmVhO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanN4Lm1hcCJdfQ== */'),
          ),
          ';resize:vertical;width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid;border-radius:8px;border-color:',
          theme.input.borderColors['default'],
          ';background-color:',
          theme.input.colors['default'],
          ';&:hover{border-color:',
          theme.input.borderColors.hover,
          ' !important;}&.focused,&:focus{outline:0;border-color:',
          theme.input.borderColors.focus,
          ';box-shadow:0px 0px 4px 0px ',
          theme.colors.secondary_1,
          ';}&.error{border-color:',
          theme.input.borderColors.error,
          ';}&.disabled{border-color:',
          theme.input.borderColors.disabled,
          ';background-color:',
          theme.input.colors.disabled,
          ';color:',
          theme.input.colors.grey,
          ';&:hover{border-color:#d0d1d8 !important;}};label:Uikit-Textarea;' +
            (process.env.NODE_ENV === 'production'
              ? ''
              : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpSCtIIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICd1aWtpdC9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ3Vpa2l0L1R5cG9ncmFwaHknO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuaW1wb3J0IHsgQ291bnRMYWJlbHMgfSBmcm9tICcuL3R5cGVzJztcbmNvbnN0IExJTkVfSlVNUF9QTEFDRUhPTERFUiA9ICcgw7jDtiAnO1xuY29uc3QgVGV4dGFyZWEgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGNvdW50RGlyZWN0aW9uID0gJ2FzYycsIGNvdW50TGltaXQgPSAwLCBjb3VudFBvc2l0aW9uID0gJ3JpZ2h0JywgY291bnRUeXBlID0gJ2NoYXJzJywgZm9jdXNlZDogcHJvcHNGb2N1c2VkLCAvLyBzbyBpdCdzIG5vdCBwYXNzZWQgdG8gdGhlIGh0bWwgZWxlbWVudFxuICAgIG9uQ2hhbmdlOiBwcm9wc09uQ2hhbmdlLCB0cnVuY2F0ZSwgdmFsdWUgPSAnJyB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJjbGFzc05hbWVcIiwgXCJjb3VudERpcmVjdGlvblwiLCBcImNvdW50TGltaXRcIiwgXCJjb3VudFBvc2l0aW9uXCIsIFwiY291bnRUeXBlXCIsIFwiZm9jdXNlZFwiLCBcIm9uQ2hhbmdlXCIsIFwidHJ1bmNhdGVcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgY29uc3QgW2N1cnJlbnRDb3VudCwgc2V0Q3VycmVudENvdW50XSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IFtpbnRlcm5hbFZhbHVlLCBzZXRJbnRlcm5hbFZhbHVlXSA9IHVzZVN0YXRlKHZhbHVlKTtcbiAgICBjb25zdCB7IGRpc2FibGVkLCBlcnJvciwgZm9jdXNlZCwgaGFuZGxlQmx1ciwgaGFuZGxlRm9jdXMgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRyb2xDb250ZXh0KSB8fCB7fTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3QgaGFzT3ZlcmZsb3dlZCA9IGNvdW50TGltaXQgJiYgY291bnRMaW1pdCAtIGN1cnJlbnRDb3VudCA8IDA7XG4gICAgY29uc3QgaGFzRXJyb3IgPSBlcnJvciB8fCAhIXByb3BzLmVycm9yIHx8IGhhc092ZXJmbG93ZWQ7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGRpc2FibGVkIHx8IHByb3BzLmRpc2FibGVkO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZvY3VzZWQgfHwgcHJvcHNGb2N1c2VkO1xuICAgIGNvbnN0IGNvdW50QWxpZ25tZW50ID0gY291bnRQb3NpdGlvbi5yZXBsYWNlKCdhYnNvbHV0ZScsICcnKS50cmltKCkgfHwgJ3JpZ2h0JztcbiAgICBjb25zdCBpc0FzY2VuZGluZyA9IGNvdW50RGlyZWN0aW9uID09PSAnYXNjJztcbiAgICBjb25zdCBvbkJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBoYW5kbGVCbHVyID09PSBudWxsIHx8IGhhbmRsZUJsdXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUJsdXIoKTtcbiAgICAgICAgKF9hID0gcHJvcHMub25CbHVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgIH07XG4gICAgY29uc3Qgb25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGhhbmRsZUZvY3VzID09PSBudWxsIHx8IGhhbmRsZUZvY3VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kbGVGb2N1cygpO1xuICAgICAgICAoX2EgPSBwcm9wcy5vbkZvY3VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgIH07XG4gICAgY29uc3QgZ2V0Q291bnQgPSB1c2VDYWxsYmFjaygobmV3Q291bnQpID0+IChpc0FzY2VuZGluZyA/IG5ld0NvdW50IDogY291bnRMaW1pdCAtIG5ld0NvdW50KSwgW1xuICAgICAgICBjb3VudExpbWl0LFxuICAgICAgICBpc0FzY2VuZGluZyxcbiAgICBdKTtcbiAgICBjb25zdCBhcHBseUNoYW5nZXMgPSB1c2VDYWxsYmFjaygodGFyZ2V0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGNvdW50TGltaXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHdpdGhvdXQgY291bnQgbGltaXQsIHdlIGRvbid0IGNhcmU6IGp1c3QgdXBkYXRlIHRoZSB2YWx1ZSBhcyBpc1xuICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZSh0YXJnZXRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNvdW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dvcmRzJzoge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgYSBwbGFjZWhvbGRlciBmb3IgbGluZSBicmVha3MsIHNvIHdlIGNhbiByZXNwZWN0IHdoaXRlIHNwYWNlIG9uIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZEFycmF5ID0gdGFyZ2V0VmFsdWUucmVwbGFjZSgvXFxuL2csIExJTkVfSlVNUF9QTEFDRUhPTERFUikuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzY291bnQgdGhlIGZvbGxvd2luZyBleGNlcHRpb25zIGFzIG5vbi13b3JkczpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1wdGllcyA9IHdvcmRBcnJheS5maWx0ZXIoKHgpID0+ICF4IHx8IC8vIGVtcHR5IHNwYWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9PT0gTElORV9KVU1QX1BMQUNFSE9MREVSLnRyaW0oKSB8fCAvLyBsaW5lIGJyZWFrcyAocGxhY2Vob2xkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAheC5tYXRjaCgvW2EtekEtWjAtOV0rL2cpKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1dvcmRBcnJheSA9IHRydW5jYXRlID8gd29yZEFycmF5LnNsaWNlKDAsIGNvdW50TGltaXQgKyBlbXB0aWVzKSA6IHdvcmRBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZENvdW50ID0gZ2V0Q291bnQobmV3V29yZEFycmF5Lmxlbmd0aCAtIGVtcHRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IG5ld1dvcmRBcnJheS5qb2luKCcgJykucmVwbGFjZUFsbChMSU5FX0pVTVBfUExBQ0VIT0xERVIsICdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jYXRlICYmIHdvcmRDb3VudCA9PT0gY291bnRMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudENvdW50KGNvdW50TGltaXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQod29yZENvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGFyYWN0ZXJzIGFzIGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0cnVuY2F0ZSA/IHRhcmdldFZhbHVlLnNsaWNlKDAsIGNvdW50TGltaXQpIDogdGFyZ2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHNldEludGVybmFsVmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQoZ2V0Q291bnQobmV3VmFsdWUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtjb3VudExpbWl0LCBwcm9wc09uQ2hhbmdlLCB0cnVuY2F0ZV0pO1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBub3JtYWxpc2UgbGluZSBicmVha3NcbiAgICAgICAgbGV0IHRhcmdldFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZywgJ1xcbicpO1xuICAgICAgICBhcHBseUNoYW5nZXModGFyZ2V0VmFsdWUpO1xuICAgICAgICBwcm9wc09uQ2hhbmdlID09PSBudWxsIHx8IHByb3BzT25DaGFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzT25DaGFuZ2UoZXZlbnQpO1xuICAgIH07XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdmFsdWUgJiYgYXBwbHlDaGFuZ2VzKHZhbHVlKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIlRleHRhcmVhV3JhcHBlclwiIGNzcz17Y3NzIGBcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYH0+XG4gICAgICA8dGV4dGFyZWEgey4uLnByb3BzfSBjbGFzc05hbWU9e2Nsc3goeyBlcnJvcjogaGFzRXJyb3IsIGRpc2FibGVkOiBpc0Rpc2FibGVkLCBmb2N1c2VkOiBpc0ZvY3VzZWQgfSwgY2xhc3NOYW1lKX0gY3NzPXtjc3MgYFxuICAgICAgICAgICR7Y3NzKHRoZW1lLnR5cG9ncmFwaHkucGFyYWdyYXBoKX07XG4gICAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmRlZmF1bHR9O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhlbWUuaW5wdXQuY29sb3JzLmRlZmF1bHR9O1xuXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmhvdmVyfSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICYuZm9jdXNlZCxcbiAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmZvY3VzfTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggNHB4IDBweCAke3RoZW1lLmNvbG9ycy5zZWNvbmRhcnlfMX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5lcnJvciB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmVycm9yfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmLmRpc2FibGVkIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuZGlzYWJsZWR9O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGVtZS5pbnB1dC5jb2xvcnMuZGlzYWJsZWR9O1xuICAgICAgICAgICAgY29sb3I6ICR7dGhlbWUuaW5wdXQuY29sb3JzLmdyZXl9O1xuICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogI2QwZDFkOCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYH0gZGlzYWJsZWQ9e2lzRGlzYWJsZWR9IGlkPXtwcm9wcy5pZH0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9IG9uRm9jdXM9e29uRm9jdXN9IHZhbHVlPXtpbnRlcm5hbFZhbHVlfS8+XG5cbiAgICAgIHtjb3VudExpbWl0ID4gMCAmJiBPYmplY3Qua2V5cyhDb3VudExhYmVscykuaW5jbHVkZXMoY291bnRUeXBlKSAmJiAoPFR5cG9ncmFwaHkgY29sb3I9e2hhc092ZXJmbG93ZWQgPyAnZXJyb3InIDogJ2dyZXknfSBjc3M9e2NzcyBgXG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAke2NvdW50UG9zaXRpb24uaW5jbHVkZXMoJ2Fic29sdXRlJylcbiAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICR7Y291bnRBbGlnbm1lbnR9OiA2cHg7XG4gICAgICAgICAgICAgIGBcbiAgICAgICAgOiBgdGV4dC1hbGlnbjogJHtjb3VudEFsaWdubWVudH07YH1cblxuICAgICAgICAgICAgLmN1cnJlbnRDb3VudCB7XG4gICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvdW50TGltaXQge1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN1cnJlbnRDb3VudFwiPntjdXJyZW50Q291bnR9PC9zcGFuPi9cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudExpbWl0XCI+e2NvdW50TGltaXR9PC9zcGFuPnsnICd9XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY291bnRMYWJlbFwiPntDb3VudExhYmVsc1tjb3VudFR5cGVdfTwvc3Bhbj5cbiAgICAgICAgPC9UeXBvZ3JhcGh5Pil9XG4gICAgPC9kaXY+KTtcbn07XG5UZXh0YXJlYS5kaXNwbGF5TmFtZSA9ICdUZXh0YXJlYSc7XG5leHBvcnQgZGVmYXVsdCBUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'),
        ),
        disabled: isDisabled,
        id: props.id,
        onBlur: onBlur,
        onChange: handleChange,
        onFocus: onFocus,
        value: internalValue,
      }),
    ),
    countLimit > 0 &&
      Object.keys(_types.CountLabels).includes(countType) &&
      (0, _core.jsx)(
        _Typography['default'],
        {
          color: hasOverflowed ? 'error' : 'grey',
          css: /*#__PURE__*/ (0, _css2['default'])(
            'margin:0;',
            countPosition.includes('absolute')
              ? '\n                position: absolute;\n                '.concat(
                  countAlignment,
                  ': 6px;\n              ',
                )
              : 'text-align: '.concat(countAlignment, ';'),
            ' .currentCount{margin-right:2px;}.countLimit{margin-left:2px;};label:Uikit-Textarea;' +
              (process.env.NODE_ENV === 'production'
                ? ''
                : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxSndJIiwiZmlsZSI6ImluZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgVGhlIE9udGFyaW8gSW5zdGl0dXRlIGZvciBDYW5jZXIgUmVzZWFyY2guIEFsbCByaWdodHMgcmVzZXJ2ZWRcbiAqXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2ZcbiAqIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgdjMuMC4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWVxuICogRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVFxuICogU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsXG4gKiBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURURcbiAqIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUztcbiAqIE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSXG4gKiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOXG4gKiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjc3MgZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICd1aWtpdC9UaGVtZVByb3ZpZGVyJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ3Vpa2l0L1R5cG9ncmFwaHknO1xuaW1wb3J0IEZvcm1Db250cm9sQ29udGV4dCBmcm9tICcuLi9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbENvbnRleHQnO1xuaW1wb3J0IHsgQ291bnRMYWJlbHMgfSBmcm9tICcuL3R5cGVzJztcbmNvbnN0IExJTkVfSlVNUF9QTEFDRUhPTERFUiA9ICcgw7jDtiAnO1xuY29uc3QgVGV4dGFyZWEgPSAoX2EpID0+IHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGNvdW50RGlyZWN0aW9uID0gJ2FzYycsIGNvdW50TGltaXQgPSAwLCBjb3VudFBvc2l0aW9uID0gJ3JpZ2h0JywgY291bnRUeXBlID0gJ2NoYXJzJywgZm9jdXNlZDogcHJvcHNGb2N1c2VkLCAvLyBzbyBpdCdzIG5vdCBwYXNzZWQgdG8gdGhlIGh0bWwgZWxlbWVudFxuICAgIG9uQ2hhbmdlOiBwcm9wc09uQ2hhbmdlLCB0cnVuY2F0ZSwgdmFsdWUgPSAnJyB9ID0gX2EsIHByb3BzID0gX19yZXN0KF9hLCBbXCJjbGFzc05hbWVcIiwgXCJjb3VudERpcmVjdGlvblwiLCBcImNvdW50TGltaXRcIiwgXCJjb3VudFBvc2l0aW9uXCIsIFwiY291bnRUeXBlXCIsIFwiZm9jdXNlZFwiLCBcIm9uQ2hhbmdlXCIsIFwidHJ1bmNhdGVcIiwgXCJ2YWx1ZVwiXSk7XG4gICAgY29uc3QgW2N1cnJlbnRDb3VudCwgc2V0Q3VycmVudENvdW50XSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IFtpbnRlcm5hbFZhbHVlLCBzZXRJbnRlcm5hbFZhbHVlXSA9IHVzZVN0YXRlKHZhbHVlKTtcbiAgICBjb25zdCB7IGRpc2FibGVkLCBlcnJvciwgZm9jdXNlZCwgaGFuZGxlQmx1ciwgaGFuZGxlRm9jdXMgfSA9IHVzZUNvbnRleHQoRm9ybUNvbnRyb2xDb250ZXh0KSB8fCB7fTtcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gICAgY29uc3QgaGFzT3ZlcmZsb3dlZCA9IGNvdW50TGltaXQgJiYgY291bnRMaW1pdCAtIGN1cnJlbnRDb3VudCA8IDA7XG4gICAgY29uc3QgaGFzRXJyb3IgPSBlcnJvciB8fCAhIXByb3BzLmVycm9yIHx8IGhhc092ZXJmbG93ZWQ7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGRpc2FibGVkIHx8IHByb3BzLmRpc2FibGVkO1xuICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZvY3VzZWQgfHwgcHJvcHNGb2N1c2VkO1xuICAgIGNvbnN0IGNvdW50QWxpZ25tZW50ID0gY291bnRQb3NpdGlvbi5yZXBsYWNlKCdhYnNvbHV0ZScsICcnKS50cmltKCkgfHwgJ3JpZ2h0JztcbiAgICBjb25zdCBpc0FzY2VuZGluZyA9IGNvdW50RGlyZWN0aW9uID09PSAnYXNjJztcbiAgICBjb25zdCBvbkJsdXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBoYW5kbGVCbHVyID09PSBudWxsIHx8IGhhbmRsZUJsdXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZUJsdXIoKTtcbiAgICAgICAgKF9hID0gcHJvcHMub25CbHVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgIH07XG4gICAgY29uc3Qgb25Gb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGhhbmRsZUZvY3VzID09PSBudWxsIHx8IGhhbmRsZUZvY3VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kbGVGb2N1cygpO1xuICAgICAgICAoX2EgPSBwcm9wcy5vbkZvY3VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwcm9wcywgZXZlbnQpO1xuICAgIH07XG4gICAgY29uc3QgZ2V0Q291bnQgPSB1c2VDYWxsYmFjaygobmV3Q291bnQpID0+IChpc0FzY2VuZGluZyA/IG5ld0NvdW50IDogY291bnRMaW1pdCAtIG5ld0NvdW50KSwgW1xuICAgICAgICBjb3VudExpbWl0LFxuICAgICAgICBpc0FzY2VuZGluZyxcbiAgICBdKTtcbiAgICBjb25zdCBhcHBseUNoYW5nZXMgPSB1c2VDYWxsYmFjaygodGFyZ2V0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGNvdW50TGltaXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHdpdGhvdXQgY291bnQgbGltaXQsIHdlIGRvbid0IGNhcmU6IGp1c3QgdXBkYXRlIHRoZSB2YWx1ZSBhcyBpc1xuICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZSh0YXJnZXRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNvdW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dvcmRzJzoge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgYSBwbGFjZWhvbGRlciBmb3IgbGluZSBicmVha3MsIHNvIHdlIGNhbiByZXNwZWN0IHdoaXRlIHNwYWNlIG9uIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZEFycmF5ID0gdGFyZ2V0VmFsdWUucmVwbGFjZSgvXFxuL2csIExJTkVfSlVNUF9QTEFDRUhPTERFUikuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzY291bnQgdGhlIGZvbGxvd2luZyBleGNlcHRpb25zIGFzIG5vbi13b3JkczpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1wdGllcyA9IHdvcmRBcnJheS5maWx0ZXIoKHgpID0+ICF4IHx8IC8vIGVtcHR5IHNwYWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9PT0gTElORV9KVU1QX1BMQUNFSE9MREVSLnRyaW0oKSB8fCAvLyBsaW5lIGJyZWFrcyAocGxhY2Vob2xkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAheC5tYXRjaCgvW2EtekEtWjAtOV0rL2cpKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1dvcmRBcnJheSA9IHRydW5jYXRlID8gd29yZEFycmF5LnNsaWNlKDAsIGNvdW50TGltaXQgKyBlbXB0aWVzKSA6IHdvcmRBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZENvdW50ID0gZ2V0Q291bnQobmV3V29yZEFycmF5Lmxlbmd0aCAtIGVtcHRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IG5ld1dvcmRBcnJheS5qb2luKCcgJykucmVwbGFjZUFsbChMSU5FX0pVTVBfUExBQ0VIT0xERVIsICdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jYXRlICYmIHdvcmRDb3VudCA9PT0gY291bnRMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudENvdW50KGNvdW50TGltaXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJuYWxWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQod29yZENvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGFyYWN0ZXJzIGFzIGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0cnVuY2F0ZSA/IHRhcmdldFZhbHVlLnNsaWNlKDAsIGNvdW50TGltaXQpIDogdGFyZ2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHNldEludGVybmFsVmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Q291bnQoZ2V0Q291bnQobmV3VmFsdWUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtjb3VudExpbWl0LCBwcm9wc09uQ2hhbmdlLCB0cnVuY2F0ZV0pO1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBub3JtYWxpc2UgbGluZSBicmVha3NcbiAgICAgICAgbGV0IHRhcmdldFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZywgJ1xcbicpO1xuICAgICAgICBhcHBseUNoYW5nZXModGFyZ2V0VmFsdWUpO1xuICAgICAgICBwcm9wc09uQ2hhbmdlID09PSBudWxsIHx8IHByb3BzT25DaGFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzT25DaGFuZ2UoZXZlbnQpO1xuICAgIH07XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdmFsdWUgJiYgYXBwbHlDaGFuZ2VzKHZhbHVlKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cIlRleHRhcmVhV3JhcHBlclwiIGNzcz17Y3NzIGBcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYH0+XG4gICAgICA8dGV4dGFyZWEgey4uLnByb3BzfSBjbGFzc05hbWU9e2Nsc3goeyBlcnJvcjogaGFzRXJyb3IsIGRpc2FibGVkOiBpc0Rpc2FibGVkLCBmb2N1c2VkOiBpc0ZvY3VzZWQgfSwgY2xhc3NOYW1lKX0gY3NzPXtjc3MgYFxuICAgICAgICAgICR7Y3NzKHRoZW1lLnR5cG9ncmFwaHkucGFyYWdyYXBoKX07XG4gICAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmRlZmF1bHR9O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhlbWUuaW5wdXQuY29sb3JzLmRlZmF1bHR9O1xuXG4gICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmhvdmVyfSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgICYuZm9jdXNlZCxcbiAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmZvY3VzfTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggNHB4IDBweCAke3RoZW1lLmNvbG9ycy5zZWNvbmRhcnlfMX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5lcnJvciB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICR7dGhlbWUuaW5wdXQuYm9yZGVyQ29sb3JzLmVycm9yfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmLmRpc2FibGVkIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJHt0aGVtZS5pbnB1dC5ib3JkZXJDb2xvcnMuZGlzYWJsZWR9O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGVtZS5pbnB1dC5jb2xvcnMuZGlzYWJsZWR9O1xuICAgICAgICAgICAgY29sb3I6ICR7dGhlbWUuaW5wdXQuY29sb3JzLmdyZXl9O1xuICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogI2QwZDFkOCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYH0gZGlzYWJsZWQ9e2lzRGlzYWJsZWR9IGlkPXtwcm9wcy5pZH0gb25CbHVyPXtvbkJsdXJ9IG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9IG9uRm9jdXM9e29uRm9jdXN9IHZhbHVlPXtpbnRlcm5hbFZhbHVlfS8+XG5cbiAgICAgIHtjb3VudExpbWl0ID4gMCAmJiBPYmplY3Qua2V5cyhDb3VudExhYmVscykuaW5jbHVkZXMoY291bnRUeXBlKSAmJiAoPFR5cG9ncmFwaHkgY29sb3I9e2hhc092ZXJmbG93ZWQgPyAnZXJyb3InIDogJ2dyZXknfSBjc3M9e2NzcyBgXG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAke2NvdW50UG9zaXRpb24uaW5jbHVkZXMoJ2Fic29sdXRlJylcbiAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICR7Y291bnRBbGlnbm1lbnR9OiA2cHg7XG4gICAgICAgICAgICAgIGBcbiAgICAgICAgOiBgdGV4dC1hbGlnbjogJHtjb3VudEFsaWdubWVudH07YH1cblxuICAgICAgICAgICAgLmN1cnJlbnRDb3VudCB7XG4gICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvdW50TGltaXQge1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN1cnJlbnRDb3VudFwiPntjdXJyZW50Q291bnR9PC9zcGFuPi9cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3VudExpbWl0XCI+e2NvdW50TGltaXR9PC9zcGFuPnsnICd9XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY291bnRMYWJlbFwiPntDb3VudExhYmVsc1tjb3VudFR5cGVdfTwvc3Bhbj5cbiAgICAgICAgPC9UeXBvZ3JhcGh5Pil9XG4gICAgPC9kaXY+KTtcbn07XG5UZXh0YXJlYS5kaXNwbGF5TmFtZSA9ICdUZXh0YXJlYSc7XG5leHBvcnQgZGVmYXVsdCBUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzeC5tYXAiXX0= */'),
          ),
        },
        (0, _core.jsx)(
          'span',
          {
            className: 'currentCount',
          },
          currentCount,
        ),
        '/',
        (0, _core.jsx)(
          'span',
          {
            className: 'countLimit',
          },
          countLimit,
        ),
        ' ',
        (0, _core.jsx)(
          'span',
          {
            className: 'countLabel',
          },
          _types.CountLabels[countType],
        ),
      ),
  );
};

Textarea.displayName = 'Textarea';
var _default = Textarea;
exports['default'] = _default;
