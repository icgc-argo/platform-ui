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

const StyledTable = styled(ReactTable)`
  ${reactTableDefaultStyle}
  &.ReactTable {
    border: none;
    & .rt-table {
      ${({ theme, showPagination, showPaginationBottom }) =>
        !(showPagination && showPaginationBottom) &&
        css`
          border-bottom: solid 1px ${theme.colors.grey_2};
        `};
    }
  }

  &.ReactTable .rt-th {
    ${({ theme }) => css(theme.typography.data)};
    font-weight: bold;
    background: ${({ theme }) => theme.table.th.background};
  }
  &.ReactTable .rt-tr {
    border-top: solid 1px ${({ theme }) => theme.colors.grey_2};
    &.selected {
      background-color: ${({ theme }) => theme.colors.secondary_3} !important;
    }
  }
  &.ReactTable .rt-tbody .rt-td {
    ${({ theme }) => css(theme.typography.data)}
    padding: 10px 16px;
    border-right: none;
  }

  /* overrides stripped rows style */
  &.ReactTable.-striped .rt-tr:not(.-odd) {
    background: ${({ theme }) => theme.table.th.background};
  }
  &.ReactTable.-striped .rt-tr.-odd {
    background: ${({ theme }) => theme.colors.white};
  }

  /* overrides hover highlight rows style */
  &.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: ${({ theme }) => theme.colors.grey_3};
  }

  &.ReactTable .rt-thead.-header {
    box-shadow: none;
    border-bottom: solid 2px ${({ theme }) => theme.colors.grey_2};
    & .rt-th {
      padding: 10px 16px;
      border-left: none;
      border-right: none;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
    /* .-cursor-pointer idicates a sortable column */
    & .rt-th.-cursor-pointer {
      ${({ sortable }) =>
        sortable
          ? css`
              &:after {
                content: url(${unsorted});
              }
              &.-sort-asc {
                box-shadow: none;
                &:after {
                  content: url(${ascending});
                }
              }
              &.-sort-desc {
                box-shadow: none;
                &:after {
                  content: url(${descending});
                }
              }
            `
          : css``}
    }
  }
`;

const Table = ({
  className = '',
  stripped = true,
  highlight = true,
  PaginationComponent = TablePagination,
  primaryKey = 'id',
  selectedIds = [],
  TrComponent = ({ rowInfo, ...props }) => {
    const thisRowId = get(rowInfo, `original.${primaryKey}`);
    const selected = selectedIds.some(id => id === thisRowId);
    return <div {...props} className={`rt-tr ${props.className} ${selected ? 'selected' : ''}`} />;
  },
  getTrProps = () => ({}),
  ...rest
}) => (
  <StyledTable
    className={`${className} ${stripped ? '-striped' : ''} ${highlight ? '-highlight' : ''}`}
    TrComponent={TrComponent}
    getTrProps={(state, rowInfo, column) => {
      return { rowInfo, ...getTrProps(state, rowInfo, column) };
    }}
    minRows={0}
    showPagination={false}
    PaginationComponent={PaginationComponent}
    {...rest}
  />
);

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
export const SelectTable = props => {
  const { isSelected, data, keyField } = props;
  const selectedIds = data.map(data => data[keyField]).filter(isSelected);
  const Component = selectTable(Table);
  return <Component {...props} primaryKey={keyField} selectedIds={selectedIds} />;
};
export { default as TablePagination } from './TablePagination';
