import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';
import selectTable, {
  SelectInputComponentProps,
  SelectAllInputComponentProps,
} from 'react-table/lib/hoc/selectTable';
import DnaLoader from '../DnaLoader';
import Checkbox from '../form/Checkbox';
import { StyledTable } from './styledComponent';
import TablePagination from './TablePagination';
import DefaultNoDataComponent from './NoDataComponent';
import { TableProps } from 'react-table';

export { default as TablePagination, TableActionBar } from './TablePagination';

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
  loading?: boolean;
  loadingText?: string;
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

export type TableColumnConfig<Data = { [k: string]: any }> = TableProps<Data>['columns'][0];
function Table<Data = { [k: string]: any }>({
  className = '',
  stripped = true,
  highlight = true,
  PaginationComponent = TablePagination,
  LoadingComponent = DefaultLoadingComponent,
  NoDataComponent = DefaultNoDataComponent,
  columns,
  data,
  showPagination,
  getTableProps = ({ data }) => {
    if (isEmpty(data)) {
      return {
        style: {
          opacity: 0.3,
        },
      };
    } else {
      return {};
    }
  },
  ...rest
}: Partial<TableProps<Data>> & {
  highlight?: boolean;
  stripped?: boolean;
  selectedIds?: Array<any>;
  isSelectTable?: boolean;
  primaryKey?: string;
  columns: TableProps<Data>['columns']; //columns is required
}) {
  const TrComponent = rest.TrComponent || DefaultTrComponent;
  const getTrProps = rest.getTrProps || (() => ({}));

  // these are props passed by SelectTable. Defaults are not exposed in props for encapsulation
  const selectedIds = rest.selectedIds || [];
  const isSelectTable = rest.isSelectTable || false;
  const primaryKey = rest.primaryKey || 'id';

  return (
    <StyledTable
      getTableProps={getTableProps}
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
      NoDataComponent={NoDataComponent}
      showPagination={isEmpty(data) ? false : showPagination}
      {...rest}
    />
  );
}
export default Table;

/**
 * SelectTable provides the row selection capability with the
 * selectTable HOC.
 */
const SelectTableCheckbox: React.ComponentType<
  SelectInputComponentProps & SelectAllInputComponentProps
> = ({ checked, onClick, id }) => (
  // @ts-ignore area-label not supported by ts
  <Checkbox value={id} checked={checked} onChange={() => onClick(id)} aria-lable="table-select" />
);

export function SelectTable<Data = { [k: string]: any }>(
  props: TableProps<Data> & {
    isSelected: (d: any) => boolean;
    keyField: string;
    highlight: boolean;
    stripped: boolean;
    selectedIds?: any[];
    isSelectTable: boolean;
    primaryKey: string;
    columns: TableProps<Data>['columns']; //columns is required
  },
) {
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
}
