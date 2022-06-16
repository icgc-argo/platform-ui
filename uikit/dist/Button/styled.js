'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _styledBase = _interopRequireDefault(require('@emotion/styled-base'));

var _core = require('@emotion/core');

var _FocusWrapper = _interopRequireDefault(require('../FocusWrapper'));

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
var StyledButton = /*#__PURE__*/ (0, _styledBase['default'])(_FocusWrapper['default'], {
  target: 'erq005b0',
  label: 'Uikit-StyledButton',
})(
  function (_ref) {
    var theme = _ref.theme;
    return /*#__PURE__*/ (0, _core.css)(
      theme.typography['default'],
      ';label:Uikit-StyledButton;' +
        (process.env.NODE_ENV === 'production'
          ? ''
          : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlZC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JtQiIsImZpbGUiOiJzdHlsZWQuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMCBUaGUgT250YXJpbyBJbnN0aXR1dGUgZm9yIENhbmNlciBSZXNlYXJjaC4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICpcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZlxuICogdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wLiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZXG4gKiBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVNcbiAqIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UXG4gKiBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCxcbiAqIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRFxuICogVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTO1xuICogT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU5cbiAqIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgRm9jdXNXcmFwcGVyIGZyb20gJ3Vpa2l0L0ZvY3VzV3JhcHBlcic7XG5jb25zdCBTdHlsZWRCdXR0b24gPSBzdHlsZWQoRm9jdXNXcmFwcGVyKSBgXG4gICR7KHsgdGhlbWUgfSkgPT4gY3NzKHRoZW1lLnR5cG9ncmFwaHkuZGVmYXVsdCl9O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4yNXM7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBvdXRsaW5lOiBub25lO1xuICBib3gtc2hhZG93OiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuXG4gIGNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi50ZXh0Q29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5jb2xvcnNbdmFyaWFudF0uZGVmYXVsdH07XG4gIGJvcmRlci1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uYm9yZGVyQ29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9O1xuICBib3JkZXItd2lkdGg6ICR7KHsgdGhlbWUsIHNpemUgfSkgPT4gdGhlbWUuYnV0dG9uLmJvcmRlcldlaWdodHNbc2l6ZV19O1xuICBwYWRkaW5nOiAkeyh7IHRoZW1lLCBzaXplIH0pID0+IHRoZW1lLmJ1dHRvbi5wYWRkaW5nc1tzaXplXX07XG4gIGN1cnNvcjogJHsoeyBkaXNhYmxlZCB9KSA9PiAoZGlzYWJsZWQgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInKX07XG4gIGZvbnQtc2l6ZTogJHsoeyB0aGVtZSwgc2l6ZSB9KSA9PiB0aGVtZS5idXR0b24uZm9udFNpemVzW3NpemVdfTtcblxuICAmOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5jb2xvcnNbdmFyaWFudF0uZm9jdXN9O1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uY29sb3JzW3ZhcmlhbnRdLmhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7KHsgdGhlbWUsIHZhcmlhbnQgfSkgPT4gdGhlbWUuYnV0dG9uLmJvcmRlckNvbG9yc1t2YXJpYW50XS5ob3Zlcn07XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uY29sb3JzW3ZhcmlhbnRdLmFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5ib3JkZXJDb2xvcnNbdmFyaWFudF0uYWN0aXZlfTtcbiAgfVxuICAmOmRpc2FibGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5jb2xvcnNbdmFyaWFudF0uZGlzYWJsZWR9O1xuICAgIGJvcmRlci1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uYm9yZGVyQ29sb3JzW3ZhcmlhbnRdLmRpc2FibGVkfTtcbiAgICBjb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24udGV4dENvbG9yc1t2YXJpYW50XS5kaXNhYmxlZH07XG4gIH1cbmA7XG5leHBvcnQgZGVmYXVsdCBTdHlsZWRCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHlsZWQuanN4Lm1hcCJdfQ== */'),
    );
  },
  ';transition:all 0.25s;display:flex;align-items:center;justify-content:center;outline:none;box-shadow:none;border:none;border-radius:100px;font-weight:600;text-transform:uppercase;border-style:solid;color:',
  function (_ref2) {
    var theme = _ref2.theme,
      variant = _ref2.variant;
    return theme.button.textColors[variant]['default'];
  },
  ';background-color:',
  function (_ref3) {
    var theme = _ref3.theme,
      variant = _ref3.variant;
    return theme.button.colors[variant]['default'];
  },
  ';border-color:',
  function (_ref4) {
    var theme = _ref4.theme,
      variant = _ref4.variant;
    return theme.button.borderColors[variant]['default'];
  },
  ';border-width:',
  function (_ref5) {
    var theme = _ref5.theme,
      size = _ref5.size;
    return theme.button.borderWeights[size];
  },
  ';padding:',
  function (_ref6) {
    var theme = _ref6.theme,
      size = _ref6.size;
    return theme.button.paddings[size];
  },
  ';cursor:',
  function (_ref7) {
    var disabled = _ref7.disabled;
    return disabled ? 'not-allowed' : 'pointer';
  },
  ';font-size:',
  function (_ref8) {
    var theme = _ref8.theme,
      size = _ref8.size;
    return theme.button.fontSizes[size];
  },
  ';&:focus{background-color:',
  function (_ref9) {
    var theme = _ref9.theme,
      variant = _ref9.variant;
    return theme.button.colors[variant].focus;
  },
  ';}&:hover{background-color:',
  function (_ref10) {
    var theme = _ref10.theme,
      variant = _ref10.variant;
    return theme.button.colors[variant].hover;
  },
  ';border-color:',
  function (_ref11) {
    var theme = _ref11.theme,
      variant = _ref11.variant;
    return theme.button.borderColors[variant].hover;
  },
  ';}&:active{background-color:',
  function (_ref12) {
    var theme = _ref12.theme,
      variant = _ref12.variant;
    return theme.button.colors[variant].active;
  },
  ';border-color:',
  function (_ref13) {
    var theme = _ref13.theme,
      variant = _ref13.variant;
    return theme.button.borderColors[variant].active;
  },
  ';}&:disabled{background-color:',
  function (_ref14) {
    var theme = _ref14.theme,
      variant = _ref14.variant;
    return theme.button.colors[variant].disabled;
  },
  ';border-color:',
  function (_ref15) {
    var theme = _ref15.theme,
      variant = _ref15.variant;
    return theme.button.borderColors[variant].disabled;
  },
  ';color:',
  function (_ref16) {
    var theme = _ref16.theme,
      variant = _ref16.variant;
    return theme.button.textColors[variant].disabled;
  },
  ';}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlZC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUIwQyIsImZpbGUiOiJzdHlsZWQuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMCBUaGUgT250YXJpbyBJbnN0aXR1dGUgZm9yIENhbmNlciBSZXNlYXJjaC4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICpcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZlxuICogdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSB2My4wLiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZXG4gKiBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVNcbiAqIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UXG4gKiBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCxcbiAqIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRFxuICogVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTO1xuICogT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVJcbiAqIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU5cbiAqIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgRm9jdXNXcmFwcGVyIGZyb20gJ3Vpa2l0L0ZvY3VzV3JhcHBlcic7XG5jb25zdCBTdHlsZWRCdXR0b24gPSBzdHlsZWQoRm9jdXNXcmFwcGVyKSBgXG4gICR7KHsgdGhlbWUgfSkgPT4gY3NzKHRoZW1lLnR5cG9ncmFwaHkuZGVmYXVsdCl9O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4yNXM7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBvdXRsaW5lOiBub25lO1xuICBib3gtc2hhZG93OiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuXG4gIGNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi50ZXh0Q29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5jb2xvcnNbdmFyaWFudF0uZGVmYXVsdH07XG4gIGJvcmRlci1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uYm9yZGVyQ29sb3JzW3ZhcmlhbnRdLmRlZmF1bHR9O1xuICBib3JkZXItd2lkdGg6ICR7KHsgdGhlbWUsIHNpemUgfSkgPT4gdGhlbWUuYnV0dG9uLmJvcmRlcldlaWdodHNbc2l6ZV19O1xuICBwYWRkaW5nOiAkeyh7IHRoZW1lLCBzaXplIH0pID0+IHRoZW1lLmJ1dHRvbi5wYWRkaW5nc1tzaXplXX07XG4gIGN1cnNvcjogJHsoeyBkaXNhYmxlZCB9KSA9PiAoZGlzYWJsZWQgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInKX07XG4gIGZvbnQtc2l6ZTogJHsoeyB0aGVtZSwgc2l6ZSB9KSA9PiB0aGVtZS5idXR0b24uZm9udFNpemVzW3NpemVdfTtcblxuICAmOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5jb2xvcnNbdmFyaWFudF0uZm9jdXN9O1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uY29sb3JzW3ZhcmlhbnRdLmhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7KHsgdGhlbWUsIHZhcmlhbnQgfSkgPT4gdGhlbWUuYnV0dG9uLmJvcmRlckNvbG9yc1t2YXJpYW50XS5ob3Zlcn07XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uY29sb3JzW3ZhcmlhbnRdLmFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5ib3JkZXJDb2xvcnNbdmFyaWFudF0uYWN0aXZlfTtcbiAgfVxuICAmOmRpc2FibGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lLCB2YXJpYW50IH0pID0+IHRoZW1lLmJ1dHRvbi5jb2xvcnNbdmFyaWFudF0uZGlzYWJsZWR9O1xuICAgIGJvcmRlci1jb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24uYm9yZGVyQ29sb3JzW3ZhcmlhbnRdLmRpc2FibGVkfTtcbiAgICBjb2xvcjogJHsoeyB0aGVtZSwgdmFyaWFudCB9KSA9PiB0aGVtZS5idXR0b24udGV4dENvbG9yc1t2YXJpYW50XS5kaXNhYmxlZH07XG4gIH1cbmA7XG5leHBvcnQgZGVmYXVsdCBTdHlsZWRCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHlsZWQuanN4Lm1hcCJdfQ== */'),
);
var _default = StyledButton;
exports['default'] = _default;
