'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireDefault(require('react'));

var _debounce = _interopRequireDefault(require('lodash/debounce'));

var _getElementResizeListener = _interopRequireDefault(require('../getElementResizeListener'));

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
var useElementDimension = function useElementDimension(parentRef) {
  var _config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = Object.assign(
    {
      resizeDebounce: 200,
    },
    _config,
  );

  var _React$useState = _react['default'].useState(null),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    width = _React$useState2[0],
    setWidthState = _React$useState2[1];

  var _React$useState3 = _react['default'].useState(null),
    _React$useState4 = (0, _slicedToArray2['default'])(_React$useState3, 2),
    height = _React$useState4[0],
    setHeightState = _React$useState4[1];

  var _React$useState5 = _react['default'].useState(false),
    _React$useState6 = (0, _slicedToArray2['default'])(_React$useState5, 2),
    resizing = _React$useState6[0],
    setResizing = _React$useState6[1];

  _react['default'].useEffect(
    function () {
      if (!!parentRef.current) setWidthState(parentRef.current.clientWidth);
      if (!!parentRef.current) setHeightState(parentRef.current.clientHeight);
    },
    [
      !!parentRef.current ? parentRef.current.clientWidth : 0,
      !!parentRef.current ? parentRef.current.clientHeight : 0,
    ],
  );

  _react['default'].useEffect(
    function () {
      var currentParent = parentRef.current;

      if (currentParent) {
        var setWidth = (0, _debounce['default'])(function (width) {
          setWidthState(width);
          setResizing(false);
        }, config.resizeDebounce);
        var setHeight = (0, _debounce['default'])(function (height) {
          setHeightState(height);
          setResizing(false);
        }, config.resizeDebounce);

        var onResize = function onResize() {
          if (currentParent.clientWidth !== width) {
            setResizing(true);
            setWidth(currentParent.clientWidth);
          }

          if (currentParent.clientHeight !== height) {
            setResizing(true);
            setHeight(currentParent.clientHeight);
          }
        };

        var resizeListener = (0, _getElementResizeListener['default'])();
        if (currentParent) resizeListener.listenTo(currentParent, onResize);
        return function () {
          if (currentParent) resizeListener.removeListener(currentParent, onResize);
        };
      }
    },
    [parentRef.current],
  );

  return {
    width: width,
    height: height,
    resizing: resizing,
  };
};

var _default = useElementDimension;
exports['default'] = _default;
