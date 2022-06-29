'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.DefaultTrComponent = exports.DefaultLoadingComponent = void 0;
exports.SelectTable = SelectTable;
Object.defineProperty(exports, 'TableActionBar', {
  enumerable: true,
  get: function get() {
    return _TablePagination.TableActionBar;
  },
});
Object.defineProperty(exports, 'TablePagination', {
  enumerable: true,
  get: function get() {
    return _TablePagination['default'];
  },
});
exports['default'] = void 0;
exports.useSelectTableSelectionState = useSelectTableSelectionState;

var _core = require('@emotion/core');

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray'),
);

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _get = _interopRequireDefault(require('lodash/get'));

var _isEmpty = _interopRequireDefault(require('lodash/isEmpty'));

var React = _interopRequireWildcard(require('react'));

var _selectTable = _interopRequireDefault(require('react-table/lib/hoc/selectTable'));

var _DnaLoader = _interopRequireDefault(require('../DnaLoader'));

var _Checkbox = _interopRequireDefault(require('../form/Checkbox'));

var _styledComponent = require('./styledComponent');

var _TablePagination = _interopRequireWildcard(require('./TablePagination'));

var _NoDataComponent = _interopRequireDefault(require('./NoDataComponent'));

var _useElementDimension2 = _interopRequireDefault(require('../utils/Hook/useElementDimension'));

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

var __jsx = React.createElement;

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

var DefaultTrComponent = function DefaultTrComponent(_a) {
  var rowInfo = _a.rowInfo,
    primaryKey = _a.primaryKey,
    selectedIds = _a.selectedIds,
    props = __rest(_a, ['rowInfo', 'primaryKey', 'selectedIds']);

  var thisRowId = (0, _get['default'])(rowInfo, 'original.'.concat(primaryKey));
  var selected = selectedIds.some(function (id) {
    return id === thisRowId;
  });
  return (0, _core.jsx)(
    'div',
    (0, _extends2['default'])({}, props, {
      role: 'row',
      className: 'rt-tr '.concat(props.className, ' ').concat(selected ? 'selected' : ''),
    }),
  );
};

exports.DefaultTrComponent = DefaultTrComponent;

var DefaultLoadingComponent = function DefaultLoadingComponent(_ref) {
  var loading = _ref.loading,
    loadingText = _ref.loadingText;
  return (0, _core.jsx)(
    'div',
    {
      role: 'alert',
      'aria-busy': 'true',
      className: '-loading '.concat(loading ? '-active' : ''),
      style: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    (0, _core.jsx)(
      'div',
      {
        className: '-loading-inner',
        style: {
          display: 'flex',
          justifyContent: 'center',
          transform: 'none',
          top: 'initial',
        },
      },
      (0, _core.jsx)(_DnaLoader['default'], null),
    ),
  );
};

exports.DefaultLoadingComponent = DefaultLoadingComponent;

function Table(_a) {
  var _a$variant = _a.variant,
    variant = _a$variant === void 0 ? 'DEFAULT' : _a$variant,
    _a$withRowBorder = _a.withRowBorder,
    withRowBorder = _a$withRowBorder === void 0 ? variant === 'STATIC' : _a$withRowBorder,
    withOutsideBorder = _a.withOutsideBorder,
    cellAlignment = _a.cellAlignment,
    _a$stripped = _a.stripped,
    stripped = _a$stripped === void 0 ? variant === 'DEFAULT' : _a$stripped,
    _a$highlight = _a.highlight,
    highlight = _a$highlight === void 0 ? variant === 'DEFAULT' : _a$highlight,
    _a$showPagination = _a.showPagination,
    showPagination = _a$showPagination === void 0 ? variant === 'DEFAULT' : _a$showPagination,
    _a$sortable = _a.sortable,
    sortable = _a$sortable === void 0 ? variant === 'DEFAULT' : _a$sortable,
    _a$resizable = _a.resizable,
    resizable = _a$resizable === void 0 ? variant === 'DEFAULT' : _a$resizable,
    _a$className = _a.className,
    className = _a$className === void 0 ? '' : _a$className,
    _a$PaginationComponen = _a.PaginationComponent,
    PaginationComponent =
      _a$PaginationComponen === void 0 ? _TablePagination['default'] : _a$PaginationComponen,
    _a$LoadingComponent = _a.LoadingComponent,
    LoadingComponent =
      _a$LoadingComponent === void 0 ? DefaultLoadingComponent : _a$LoadingComponent,
    _a$NoDataComponent = _a.NoDataComponent,
    NoDataComponent =
      _a$NoDataComponent === void 0 ? _NoDataComponent['default'] : _a$NoDataComponent,
    columns = _a.columns,
    data = _a.data,
    _a$getTableProps = _a.getTableProps,
    getTableProps =
      _a$getTableProps === void 0
        ? function (_ref2) {
            var data = _ref2.data;

            if ((0, _isEmpty['default'])(data)) {
              return {
                style: {
                  opacity: 0.3,
                },
              };
            } else {
              return {};
            }
          }
        : _a$getTableProps,
    parentRef = _a.parentRef,
    _a$withResizeBlur = _a.withResizeBlur,
    withResizeBlur = _a$withResizeBlur === void 0 ? false : _a$withResizeBlur,
    rest = __rest(_a, [
      'variant',
      'withRowBorder',
      'withOutsideBorder',
      'cellAlignment',
      'stripped',
      'highlight',
      'showPagination',
      'sortable',
      'resizable',
      'className',
      'PaginationComponent',
      'LoadingComponent',
      'NoDataComponent',
      'columns',
      'data',
      'getTableProps',
      'parentRef',
      'withResizeBlur',
    ]);

  var _TrComponent = rest.TrComponent || DefaultTrComponent;

  var _getTrProps =
    rest.getTrProps ||
    function () {
      return {};
    }; // these are props passed by SelectTable. Defaults are not exposed in props for encapsulation

  var selectedIds = rest.selectedIds || [];
  var isSelectTable = rest.isSelectTable || false;
  var primaryKey = rest.primaryKey || 'id'; // react-table needs an explicit pixel width to handle horizontal scroll properly.
  // This syncs up the component's width to its container.

  var _useElementDimension = (0, _useElementDimension2['default'])(parentRef),
    width = _useElementDimension.width,
    resizing = _useElementDimension.resizing;

  return (0, _core.jsx)(
    _styledComponent.StyledTable,
    (0, _extends2['default'])(
      {
        style: {
          // this is written with style object because css prop somehow only applies to the header
          transition: 'all 0.25s',
          filter: resizing && withResizeBlur ? 'blur(8px)' : 'blur(0px)',
          width: width,
        },
        withRowBorder: withRowBorder,
        withOutsideBorder: withOutsideBorder,
        cellAlignment: cellAlignment,
        getTableProps: getTableProps,
        columns: columns,
        data: data,
        isSelectTable: isSelectTable,
        className: ''
          .concat(className, ' ')
          .concat(stripped ? '-striped' : '', ' ')
          .concat(highlight ? '-highlight' : ''),
        TrComponent: function TrComponent(props) {
          return (0, _core.jsx)(
            _TrComponent,
            (0, _extends2['default'])({}, props, {
              primaryKey: primaryKey,
              selectedIds: selectedIds,
            }),
          );
        },
        LoadingComponent: LoadingComponent,
        getTrProps: function getTrProps(state, rowInfo, column) {
          return Object.assign(
            {
              rowInfo: rowInfo,
            },
            _getTrProps(state, rowInfo, column),
          );
        },
        minRows: 0,
        PaginationComponent: PaginationComponent,
        NoDataComponent: NoDataComponent,
        showPagination: (0, _isEmpty['default'])(data) ? false : showPagination,
        getNoDataProps: function getNoDataProps(x) {
          return x;
        },
        sortable: sortable,
        resizable: resizable,
      },
      rest,
    ),
  );
}

var _default = Table;
/**
 * SelectTable provides the row selection capability with the
 * selectTable HOC.
 */

exports['default'] = _default;

var SelectTableCheckbox = function SelectTableCheckbox(_ref3) {
  var checked = _ref3.checked,
    onClick = _ref3.onClick,
    id = _ref3.id;
  return (
    // @ts-ignore aria-label not supported by ts
    (0, _core.jsx)(_Checkbox['default'], {
      value: id,
      checked: checked,
      onChange: function onChange() {
        return onClick(id);
      },
      'aria-label': 'table-select',
    })
  );
};

var TableWithSelect = (0, _selectTable['default'])(Table);

function useSelectTableSelectionState(_ref4) {
  var selectionKeyField = _ref4.selectionKeyField,
    totalEntriesCount = _ref4.totalEntriesCount;

  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    allRowsSelected = _React$useState2[0],
    setAllRowsSelected = _React$useState2[1];

  var _React$useState3 = React.useState([]),
    _React$useState4 = (0, _slicedToArray2['default'])(_React$useState3, 2),
    selectedRows = _React$useState4[0],
    setSelectedRows = _React$useState4[1];

  var _React$useState5 = React.useState([]),
    _React$useState6 = (0, _slicedToArray2['default'])(_React$useState5, 2),
    unselectedRows = _React$useState6[0],
    setUnselectedRows = _React$useState6[1];

  var selectionStringToRowId = function selectionStringToRowId(selectionString) {
    return (
      // react table prepends the word `select-` to the selected objectIds
      selectionString.replace('select-', '')
    );
  };

  var setSelectedRowIds = function setSelectedRowIds(selectionString) {
    return setSelectedRows(selectionString.map(selectionStringToRowId));
  };

  var setUnselectedRowIds = function setUnselectedRowIds(selectionString) {
    return setUnselectedRows(selectionString.map(selectionStringToRowId));
  };

  var toggleHandler = function toggleHandler(selectionString) {
    var rowId = selectionStringToRowId(selectionString);

    var notMatchesSelectionString = function notMatchesSelectionString(id) {
      return id !== rowId;
    };

    if (allRowsSelected) {
      setUnselectedRowIds(
        unselectedRows.includes(rowId)
          ? unselectedRows.filter(notMatchesSelectionString)
          : [].concat((0, _toConsumableArray2['default'])(unselectedRows), [rowId]),
      );
    } else {
      setSelectedRowIds(
        selectedRows.includes(rowId)
          ? selectedRows.filter(notMatchesSelectionString)
          : [].concat((0, _toConsumableArray2['default'])(selectedRows), [rowId]),
      );
    }
  };

  var toggleAllHandler = function toggleAllHandler() {
    setSelectedRowIds([]);
    setUnselectedRowIds([]);
    setAllRowsSelected(!allRowsSelected);
  };

  var isSelected = function isSelected(objectId) {
    return allRowsSelected ? !unselectedRows.includes(objectId) : selectedRows.includes(objectId);
  };

  var selectedRowsCount = allRowsSelected
    ? totalEntriesCount - unselectedRows.length
    : selectedRows.length;
  return {
    selectionKeyField: selectionKeyField,
    selectedRows: selectedRows,
    unselectedRows: unselectedRows,
    allRowsSelected: allRowsSelected,
    toggleHandler: toggleHandler,
    toggleAllHandler: toggleAllHandler,
    isSelected: isSelected,
    selectedRowsCount: selectedRowsCount,
  };
}

function SelectTable(props) {
  var isSelected = props.isSelected,
    data = props.data,
    keyField = props.keyField;
  var selectedIds = (data || [])
    .map(function (data) {
      return data[keyField];
    })
    .filter(isSelected);
  return (0, _core.jsx)(
    TableWithSelect,
    (0, _extends2['default'])({}, props, {
      isSelectTable: true,
      primaryKey: keyField,
      selectedIds: selectedIds,
      SelectInputComponent: SelectTableCheckbox,
      SelectAllInputComponent: SelectTableCheckbox,
    }),
  );
}
