import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';
import selectTable, {
  SelectInputComponentProps,
  SelectAllInputComponentProps,
  SelectTableAdditionalProps,
} from 'react-table/lib/hoc/selectTable';
import DnaLoader from '../DnaLoader';
import Checkbox from '../form/Checkbox';
import { StyledTable, StyledTableProps } from './styledComponent';
import TablePagination from './TablePagination';
import DefaultNoDataComponent from './NoDataComponent';
import { TableProps } from 'react-table';
import useElementDimention from '../utils/Hook/useElementDimention';

export { default as TablePagination, TableActionBar } from './TablePagination';

export type TableVariant = 'DEFAULT' | 'STATIC';
type TableDataBase = {
  [k: string]: any;
};

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

export type TableColumnConfig<Data extends TableDataBase> = TableProps<Data>['columns'][0] & {
  accessor?: TableProps<Data>['columns'][0]['accessor'] | keyof Data;
  Cell?: TableProps<Data>['columns'][0]['Cell'] | ((c: { original: Data }) => React.ReactNode);
  style?: React.CSSProperties;
};
function Table<Data extends TableDataBase>({
  variant = 'DEFAULT',
  withRowBorder = variant === 'STATIC',
  withOutsideBorder,
  cellAlignment,
  stripped = variant === 'DEFAULT',
  highlight = variant === 'DEFAULT',
  showPagination = variant === 'DEFAULT',
  sortable = variant === 'DEFAULT',
  resizable = variant === 'DEFAULT',
  className = '',
  PaginationComponent = TablePagination,
  LoadingComponent = DefaultLoadingComponent,
  NoDataComponent = DefaultNoDataComponent,
  columns,
  data,
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
  parentRef,
  withResizeBlur = false,
  ...rest
}: Partial<TableProps<Data>> & {
  variant?: TableVariant;
  highlight?: boolean;
  stripped?: boolean;
  selectedIds?: Array<any>;
  primaryKey?: string;
  columns: Array<TableColumnConfig<Data>>; //columns is required
  parentRef: React.RefObject<HTMLElement>;
  withResizeBlur?: boolean;
} & StyledTableProps) {
  const TrComponent = rest.TrComponent || DefaultTrComponent;
  const getTrProps = rest.getTrProps || (() => ({}));

  // these are props passed by SelectTable. Defaults are not exposed in props for encapsulation
  const selectedIds = rest.selectedIds || [];
  const isSelectTable = rest.isSelectTable || false;
  const primaryKey = rest.primaryKey || 'id';

  // react-table needs an explicit pixel width to handle horizontal scroll properly.
  // This syncs up the component's width to its container.
  const { width, resizing } = useElementDimention(parentRef);

  return (
    <StyledTable
      style={{
        // this is written with style object because css prop somehow only applies to the header
        transition: 'all 0.25s',
        filter: resizing && withResizeBlur ? 'blur(8px)' : 'blur(0px)',
        width,
      }}
      withRowBorder={withRowBorder}
      withOutsideBorder={withOutsideBorder}
      cellAlignment={cellAlignment}
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
      getNoDataProps={x => x}
      sortable={sortable}
      resizable={resizable}
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
  <Checkbox value={id} checked={checked} onChange={() => onClick(id)} aria-label="table-select" />
);

const TableWithSelect = selectTable(Table);

export function SelectTable<Data extends TableDataBase>(
  props: Partial<TableProps<Data>> &
    Partial<SelectTableAdditionalProps> & {
      columns: Array<TableColumnConfig<Data>>; //columns is required
      parentRef: React.RefObject<HTMLElement>;
      withResizeBlur?: boolean;
    },
) {
  const { isSelected, data, keyField } = props;
  const selectedIds = (data || []).map(data => data[keyField]).filter(isSelected);
  return (
    <TableWithSelect
      {...props}
      isSelectTable
      primaryKey={keyField}
      selectedIds={selectedIds}
      SelectInputComponent={SelectTableCheckbox}
      SelectAllInputComponent={SelectTableCheckbox}
    />
  );
}
