import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import ReactTable from 'react-table';

import reactTableDefaultStyle from './reactTableDefaultStyle';
import ascending from '../assets/table/ascending.svg';
import descending from '../assets/table/descending.svg';
import unsorted from '../assets/table/unsorted.svg';

export const StyledTable = styled<typeof ReactTable, { isSelectTable: boolean }>(ReactTable)`
  ${reactTableDefaultStyle}

  &.ReactTable .-loading.-active .-loading-inner {
    font-family: ${({ theme }) => theme.typography.data.fontFamily};
  }

  &.ReactTable {
    border: none;
    & .rt-table {
      border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};
      border-top: solid 1px ${({ theme }) => theme.colors.grey_2};
      & .rt-thead .rt-tr .rt-th:first-of-type,
      & .rt-tr .rt-td:first-of-type {
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
    }
  }

  &.ReactTable .rt-thead.-header .rt-tr .rt-th {
    ${({ theme }) => css(theme.typography.data)};
    min-height: 28px;
    line-height: 1.33;
    font-weight: bold;
    align-items: center;
    background: ${({ theme }) => theme.colors.white};
    &:not(:last-of-type) {
      border-right: solid 1px ${({ theme }) => theme.colors.grey_2};
    }
  }
  &.ReactTable .rt-tbody .rt-td {
    ${({ theme }) => css(theme.typography.data)}
    min-height: 28px;
    line-height: 1.33;
    padding: 2px 8px;
    border-right: solid 1px ${({ theme }) => theme.colors.grey_2};
    display: flex;
    align-items: center;
  }
  &.ReactTable .rt-tr {
    &.selected {
      background-color: ${({ theme }) => theme.colors.secondary_4} !important;
    }
  }
  /* overrides stripped rows style */
  &.ReactTable.-striped .rt-tr:not(.-odd) {
    background: ${({ theme }) => theme.colors.grey_4};
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
    border-bottom: solid 1px ${({ theme }) => theme.colors.grey_2};

    & .rt-tr .rt-th {
      padding: ${({ sortable }) => (sortable ? '2px 6px 2px 8px' : '2px 8px')};
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
