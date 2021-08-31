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

import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import ReactTable from 'react-table';

import reactTableDefaultStyle from './reactTableDefaultStyle';
import ascending from '../assets/table/ascending.svg';
import descending from '../assets/table/descending.svg';
import unsorted from '../assets/table/unsorted.svg';

export type StyledTableProps = {
  withRowBorder?: boolean;
  isSelectTable?: boolean;
  withOutsideBorder?: boolean;
  cellAlignment?: 'top' | 'center' | 'bottom';
};

export const StyledTable = styled<typeof ReactTable, StyledTableProps>(ReactTable)`
  ${reactTableDefaultStyle}

  &.ReactTable .-loading.-active .-loading-inner {
    font-family: ${({ theme }) => theme.typography.data.fontFamily};
  }

  &.ReactTable {
    border: none;
    &.has-filters {
      .rt-table {
        opacity: 1 !important;
        min-height: 250px;
        .rt-tbody .rt-tr-group {
          max-height: 28px;
        }
      }
      &.no-data {
        .rt-table {
          margin-bottom: -185px;
          border-bottom: none;
        }
      }
    }
    & .rt-table {
      ${({ theme, withOutsideBorder }) =>
        withOutsideBorder
          ? css`
              border: solid 1px ${theme.colors.grey_2};
            `
          : css`
              border-bottom: solid 1px ${theme.colors.grey_2};
              border-top: solid 1px ${theme.colors.grey_2};
            `}

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

  &.ReactTable .rt-tbody .rt-tr-group {
    ${({ theme, withRowBorder }) =>
      withRowBorder
        ? css`
            border-bottom: solid 1px ${theme.colors.grey_2};
          `
        : css`
            border-bottom: none;
          `};
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

  &.ReactTable .rt-thead.-headerGroups {
    ${({ theme }) => css(theme.typography.data)};
    background: ${({ theme }) => theme.colors.grey_2};
    font-weight: 600;
    font-size: 13px;
    line-height: 1.27;
  }

  &.ReactTable .rt-tbody .rt-td {
    ${({ theme }) => css(theme.typography.data)}
    min-height: 28px;
    line-height: 1.33;
    padding: 2px 8px;
    border-right: solid 1px ${({ theme }) => theme.colors.grey_2};
    display: flex;
    align-items: ${({ cellAlignment }) =>
      cellAlignment === 'top' ? 'flex-start' : cellAlignment === 'bottom' ? 'flex-end' : 'center'};
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
      padding: ${({ sortable }) => (sortable ? '2px 6px' : '2px 8px')};
      border-left: none;
      border-right: none;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
  }
  &.ReactTable .rt-thead .rt-th.-sort-asc,
  &.ReactTable .rt-thead .rt-td.-sort-asc {
    box-shadow: inset 0 3px 0 0 rgba(7, 116, 211, 1);
  }
  &.ReactTable .rt-thead .rt-th.-sort-desc,
  &.ReactTable .rt-thead .rt-td.-sort-desc {
    box-shadow: inset 0 -3px 0 0 rgba(7, 116, 211, 1);
  }
`;
