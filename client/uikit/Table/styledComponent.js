import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import ReactTable from 'react-table';

import reactTableDefaultStyle from './reactTableDefaultStyle';
import ascending from '../assets/table/ascending.svg';
import descending from '../assets/table/descending.svg';
import unsorted from '../assets/table/unsorted.svg';

export const StyledTable = styled(ReactTable)`
  ${reactTableDefaultStyle}

  &.ReactTable .-loading.-active .-loading-inner {
    font-family: ${({ theme }) => theme.typography.data.fontFamily};
  }

  &.ReactTable {
    border: none;
    & .rt-table {
      & .rt-thead .rt-tr .rt-th:first-child,
      & .rt-tr .rt-td:first-child {
        ${({ isSelectTable, theme }) =>
          isSelectTable &&
          css`
            padding: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 0px !important;
            border-right: solid 1px ${theme.colors.grey_2};
            margin: 0px;
          `}
      }
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
    background: ${({ theme }) => theme.table.header.background};
  }
  &.ReactTable .rt-tr {
    border-top: solid 1px ${({ theme }) => theme.colors.grey_2};
    &.selected {
      background-color: ${({ theme }) => theme.colors.secondary_4} !important;
    }
  }
  &.ReactTable .rt-tbody .rt-td {
    ${({ theme }) => css(theme.typography.data)}
    padding: 10px 16px;
    border-right: none;
  }

  /* overrides stripped rows style */
  &.ReactTable.-striped .rt-tr:not(.-odd) {
    background: ${({ theme }) => theme.table.body.stripedRowBackground};
  }
  &.ReactTable.-striped .rt-tr.-odd {
    background: ${({ theme }) => theme.colors.white};
  }

  /* overrides hover highlight rows style */
  &.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: ${({ theme }) => theme.colors.grey_4};
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
    ${({ sortable }) =>
      sortable
        ? css`
            /* .-cursor-pointer idicates a sortable column */
            & .rt-th.-cursor-pointer {
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
            }
          `
        : css``}
  }
`;
