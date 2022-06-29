'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = useClickAway;

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
function useClickAway(_ref) {
  var domElementRef = _ref.domElementRef,
    _ref$onClickAway = _ref.onClickAway,
    onClickAway = _ref$onClickAway === void 0 ? function (event) {} : _ref$onClickAway,
    _ref$onElementClick = _ref.onElementClick,
    onElementClick = _ref$onElementClick === void 0 ? function (event) {} : _ref$onElementClick;

  _react['default'].useEffect(function () {
    var onGlobalClick = function onGlobalClick(event) {
      if (!domElementRef.current) {
        return;
      }

      var isClickaway = !domElementRef.current.contains(event.target);

      if (isClickaway) {
        onClickAway(event);
      } else {
        onElementClick(event);
      }
    };

    document.addEventListener('click', onGlobalClick);
    return function () {
      document.removeEventListener('click', onGlobalClick);
    };
  });
}
