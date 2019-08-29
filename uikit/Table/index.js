// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import selectTable from 'react-table/lib/hoc/selectTable';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';

import TablePagination from './TablePagination';
import { StyledTable } from './styledComponent';
import DnaLoader from '../DnaLoader';

export { TableActionBar } from './TablePagination';

import Checkbox from '../form/Checkbox';

export const DefaultTrComponent = ({ rowInfo, primaryKey, selectedIds, ...props }: any) => {
  const thisRowId = get(rowInfo, `original.${primaryKey}`);
  const selected = selectedIds.some(id => id === thisRowId);
  return (
    <div
      {...props}
      role="row"
      className={`rt-tr ${props.className} ${selected ? 'selected' : ''}`}
    />
  );
};

export const DefaultLoadingComponent = ({
  loading,
  loadingText,
}: {
  loading?: boolean,
  loadingText?: string,
}) => (
  <div
    role="alert"
    aria-busy="true"
    className={`-loading ${loading ? '-active' : ''}`}
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <div
      className="-loading-inner"
      style={{
        display: 'flex',
        justifyContent: 'center',
        transform: 'none',
        top: 'initial',
      }}
    >
      <DnaLoader />
    </div>
  </div>
);

export type TableColumnConfig<Data: { [k: string]: any }> = {
  Header?: React.Node,
  id?: string,
  accessor?: $Keys<Data>,
  sortable?: boolean,
  Cell?: ({ original: Data }) => any,
  sortable?: boolean,
  width?: number,
  headerStyle?: {},
};
export type TableProps<Data: { [k: string]: any }> = {
  className?: string,
  stripped?: boolean,
  highlight?: boolean,
  columns: Array<TableColumnConfig<Data>>,
  data?: Array<Data>,
  PaginationComponent?: typeof TablePagination,
  LoadingComponent?: typeof DefaultLoadingComponent,
} & { [k: string]: any };
const Table = <Data: { [k: string]: any }>({
  className = '',
  stripped = true,
  highlight = true,
  PaginationComponent = TablePagination,
  LoadingComponent = DefaultLoadingComponent,
  columns,
  data,
  showPagination,
  ...rest
}: TableProps<Data>) => {
  // these are props passed by SelectTable. Defaults are not exposed in props for encapsulation
  const TrComponent: React.ComponentType<any> = rest['TrComponent'] || DefaultTrComponent;
  const getTrProps = rest.getTrProps || (() => ({}));
  const selectedIds = rest.selectedIds || [];
  const isSelectTable = rest.isSelectTable || false;
  const primaryKey = rest.primaryKey || 'id';

  return (
    <StyledTable
      columns={columns}
      data={data}
      isSelectTable={isSelectTable}
      className={`${className} ${stripped ? '-striped' : ''} ${highlight ? '-highlight' : ''}`}
      TrComponent={props => (
        <TrComponent {...props} primaryKey={primaryKey} selectedIds={selectedIds} />
      )}
      LoadingComponent={LoadingComponent}
      getTrProps={(state, rowInfo, column) => ({
        rowInfo,
        ...getTrProps(state, rowInfo, column),
      })}
      minRows={0}
      PaginationComponent={PaginationComponent}
      NoDataComponent={() => null}
      showPagination={isEmpty(data) ? false : showPagination}
      {...rest}
    />
  );
};
export default Table;

/**
 * SelectTable provides the row selection capability with the
 * selectTable HOC.
 */
const SelectTableCheckbox = ({
  checked,
  onClick,
  id,
}: {
  checked: boolean,
  onClick: any => any,
  id: string,
}) => (
  // $FlowFixMe `aria-lable` not supported by flow
  <Checkbox value={id} checked={checked} onChange={() => onClick(id)} aria-lable="table-select" />
);

type SelectTableProps = {
  /**
   * returns true if the key passed is selected otherwise it should return false
   */
  isSelected: any => boolean,
  /**
   * a property that indicates if the selectAll is set (true|false)
   */
  selectAll: boolean,
  /**
   * called when the user clicks the selectAll checkbox/radio
   */
  toggleAll: any => any,
  /**
   * called when the use clicks a specific checkbox/radio in a row
   */
  toggleSelection: any => any,
  /**
   * either checkbox|radio to indicate what type of selection is required
   */
  selectType: 'checkbox' | 'radio',
};
export const SelectTable = <Data: { [k: string]: any }>(
  props: TableProps<Data> & SelectTableProps,
) => {
  const { isSelected, data, keyField } = props;
  const selectedIds = (data || []).map(data => data[keyField]).filter(isSelected);
  const Component = selectTable(Table);
  return (
    <Component
      {...props}
      isSelectTable
      primaryKey={keyField}
      selectedIds={selectedIds}
      SelectInputComponent={SelectTableCheckbox}
      SelectAllInputComponent={SelectTableCheckbox}
    />
  );
};

export { default as TablePagination } from './TablePagination';
