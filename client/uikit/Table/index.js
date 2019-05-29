import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import ReactTable from 'react-table';
import selectTable from 'react-table/lib/hoc/selectTable';
import { get } from 'lodash';

import reactTableDefaultStyle from './reactTableDefaultStyle';
import Typography from '../Typography';
import ascending from '../assets/table/ascending.svg';
import descending from '../assets/table/descending.svg';
import unsorted from '../assets/table/unsorted.svg';
import TablePagination from './TablePagination';
import { useTheme } from '../ThemeProvider';
import { StyledTable } from './styledComponent';

export const DefaultTrComponent = ({ rowInfo, primaryKey, selectedIds, ...props }) => {
  const thisRowId = get(rowInfo, `original.${primaryKey}`);
  const selected = selectedIds.some(id => id === thisRowId);
  return <div {...props} className={`rt-tr ${props.className} ${selected ? 'selected' : ''}`} />;
};

const Table = ({
  className = '',
  stripped = true,
  highlight = true,
  PaginationComponent = TablePagination,
  ...rest
}) => {
  // these are props passed by SelectTable. Defaults are not exposed in props for encapsulation
  const TrComponent = rest.TrComponent || DefaultTrComponent;
  const getTrProps = rest.getTrProps || (() => ({}));
  const selectedIds = rest.selectedIds || [];
  const isSelectTable = rest.isSelectTable || false;
  const primaryKey = rest.primaryKey || 'id';
  return (
    <StyledTable
      isSelectTable={isSelectTable}
      className={`${className} ${stripped ? '-striped' : ''} ${highlight ? '-highlight' : ''}`}
      TrComponent={props => (
        <TrComponent {...props} primaryKey={primaryKey} selectedIds={selectedIds} />
      )}
      getTrProps={(state, rowInfo, column) => ({ rowInfo, ...getTrProps(state, rowInfo, column) })}
      minRows={0}
      showPagination={false}
      PaginationComponent={PaginationComponent}
      {...rest}
    />
  );
};
Table.propTypes = {
  ...ReactTable.propTypes,
  /**
   * Whether to strip odd rows
   */
  stripped: PropTypes.bool,
  /**
   * Whether to highlight hovered row
   */
  highlight: PropTypes.bool,
  className: PropTypes.string,
};
export default Table;

/**
 * SelectTable provides the row selection capability with the
 * selectTable HOC.
 */
export const SelectTable = props => {
  const { isSelected, data, keyField } = props;
  const selectedIds = data.map(data => data[keyField]).filter(isSelected);
  const Component = selectTable(Table);
  return <Component {...props} isSelectTable primaryKey={keyField} selectedIds={selectedIds} />;
};
SelectTable.propTypes = {
  ...ReactTable.propTypes,
  /**
   * returns true if the key passed is selected otherwise it should return false
   */
  isSelected: PropTypes.func.isRequired,
  /**
   * a property that indicates if the selectAll is set (true|false)
   */
  selectAll: PropTypes.bool.isRequired,
  /**
   * called when the user clicks the selectAll checkbox/radio
   */
  toggleAll: PropTypes.func.isRequired,
  /**
   * called when the use clicks a specific checkbox/radio in a row
   */
  toggleSelection: PropTypes.func.isRequired,
  /**
   * either checkbox|radio to indicate what type of selection is required
   */
  selectType: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
};

export { default as TablePagination } from './TablePagination';
