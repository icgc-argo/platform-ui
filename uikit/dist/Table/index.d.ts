import * as React from 'react';
import { SelectTableAdditionalProps } from 'react-table/lib/hoc/selectTable';
import { StyledTableProps } from './styledComponent';
import { TableProps } from 'react-table';
export { default as TablePagination, TableActionBar } from './TablePagination';
export declare type TableVariant = 'DEFAULT' | 'STATIC';
declare type TableDataBase = {
  [k: string]: any;
};
export declare const DefaultTrComponent: ({
  rowInfo,
  primaryKey,
  selectedIds,
  ...props
}: any) => JSX.Element;
export declare const DefaultLoadingComponent: ({
  loading,
  loadingText,
}: {
  loading?: boolean;
  loadingText?: string;
}) => JSX.Element;
export declare type TableColumnConfig<Data extends TableDataBase> =
  TableProps<Data>['columns'][0] & {
    accessor?: TableProps<Data>['columns'][0]['accessor'] | keyof Data;
    Cell?: TableProps<Data>['columns'][0]['Cell'] | ((c: { original: Data }) => React.ReactNode);
    style?: React.CSSProperties;
  };
declare function Table<Data extends TableDataBase>({
  variant,
  withRowBorder,
  withOutsideBorder,
  cellAlignment,
  stripped,
  highlight,
  showPagination,
  sortable,
  resizable,
  className,
  PaginationComponent,
  LoadingComponent,
  NoDataComponent,
  columns,
  data,
  getTableProps,
  parentRef,
  withResizeBlur,
  ...rest
}: Partial<TableProps<Data>> & {
  variant?: TableVariant;
  highlight?: boolean;
  stripped?: boolean;
  selectedIds?: Array<any>;
  primaryKey?: string;
  columns: Array<TableColumnConfig<Data>>;
  parentRef: React.RefObject<HTMLElement>;
  withResizeBlur?: boolean;
} & StyledTableProps): JSX.Element;
export default Table;
export declare function useSelectTableSelectionState<TableEntry = {}>({
  selectionKeyField,
  totalEntriesCount,
}: {
  totalEntriesCount: number;
  selectionKeyField: keyof TableEntry;
}): {
  selectionKeyField: keyof TableEntry;
  selectedRows: string[];
  unselectedRows: string[];
  allRowsSelected: boolean;
  toggleHandler: (key: string, shiftKeyPressed: boolean, row: any) => any;
  toggleAllHandler: () => any;
  isSelected: (key: string) => boolean;
  selectedRowsCount: number;
};
export declare function SelectTable<Data extends TableDataBase>(
  props: Partial<TableProps<Data>> &
    Partial<SelectTableAdditionalProps> & {
      columns: Array<TableColumnConfig<Data>>;
      parentRef: React.RefObject<HTMLElement>;
      withResizeBlur?: boolean;
    },
): JSX.Element;
