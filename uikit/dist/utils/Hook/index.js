'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _toArray2 = _interopRequireDefault(require('@babel/runtime/helpers/toArray'));

var _react = _interopRequireDefault(require('react'));

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

/*
 * Please edit me!
 */
var Hook = function Hook(_ref) {
  var initialState = _ref.initialState,
    _ref$render = _ref.render,
    render =
      _ref$render === void 0
        ? function (_ref2) {
            var _ref3 = (0, _toArray2['default'])(_ref2);

            return null;
          }
        : _ref$render,
    _ref$effect = _ref.effect,
    effect =
      _ref$effect === void 0
        ? function () {
            return function () {};
          }
        : _ref$effect,
    _ref$watch = _ref.watch,
    watch =
      _ref$watch === void 0
        ? function (state) {
            return [];
          }
        : _ref$watch;

  var _React$useState = _react['default'].useState(initialState),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    state = _React$useState2[0],
    setState = _React$useState2[1];

  _react['default'].useEffect(effect, watch(state));

  return render([state, setState]);
};

var _default = Hook;
exports['default'] = _default;
