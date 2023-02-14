/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { css, Table, TableColumnConfig, TableV8, useTheme } from '@icgc-argo/uikit';
import { capitalize } from 'global/utils/stringUtils';
import { createRef, CSSProperties } from 'react';

import { StatArea } from '../common';
import { FILE_STATE_COLORS } from './FilesNavigator/FileRecordTable';
import { GqlClinicalSubmissionData } from './types';

const defaultStats: GqlClinicalSubmissionData['clinicalEntities'][0]['stats'] = {
  errorsFound: [],
  new: [],
  noUpdate: [],
  updated: [],
};

const SubmissionSummaryTable = ({
  clinicalSubmissions,
}: {
  clinicalSubmissions: GqlClinicalSubmissionData;
}) => {
  const theme = useTheme();

  const FIRST_COLUMN_ACCESSOR = '__';

  type Entry = {
    [k: string]: number | JSX.Element;
  };

  const newDataRow: Entry = {
    [FIRST_COLUMN_ACCESSOR]: (
      <>
        <StatArea.StarIcon fill={FILE_STATE_COLORS.NEW} />
        New
      </>
    ),
    ...clinicalSubmissions.clinicalEntities.reduce<{ [k: string]: string }>(
      (acc, entity) => ({
        ...acc,
        [entity.clinicalType]: String((entity.stats || defaultStats).new.length),
      }),
      {},
    ),
  };

  const updatedDataRow: Entry = {
    [FIRST_COLUMN_ACCESSOR]: (
      <>
        <StatArea.StarIcon fill={FILE_STATE_COLORS.UPDATED} />
        &nbsp;Updated
      </>
    ),
    ...clinicalSubmissions.clinicalEntities.reduce<{ [k: string]: string }>(
      (acc, entity) => ({
        ...acc,
        [entity.clinicalType]: String((entity.stats || defaultStats).updated.length),
      }),
      {},
    ),
  };

  const tableData = [newDataRow, updatedDataRow];

  // for react table v6
  const tableColumns_legacy: TableColumnConfig<Entry>[] = [
    // this is the first column
    {
      accessor: FIRST_COLUMN_ACCESSOR,
      width: 100,
    },
    ...clinicalSubmissions.clinicalEntities.map(
      (entity) =>
        ({
          accessor: entity.clinicalType,
          Header: capitalize(entity.clinicalType.split('_').join(' ')),
        } as TableColumnConfig<Entry>),
    ),
  ];
  const containerRef = createRef<HTMLDivElement>();

  // for react table v8
  const tableColumns = [
    {
      accessorKey: FIRST_COLUMN_ACCESSOR,
      size: 100,
      cell: ({ cell, column, row }) => {
        const isUpdateRow = row.index === 1;
        return (
          <span
            css={css`
              background: ${row.original[column.id] > 0
                ? isUpdateRow
                  ? theme.colors.accent3_3
                  : theme.colors.accent2_4
                : 'transparent'};
            `}
          >
            {cell.renderValue()}
          </span>
        );
      },
    },
    ...clinicalSubmissions.clinicalEntities.map(
      (entity) =>
        ({
          accessorKey: entity.clinicalType,
          header: capitalize(entity.clinicalType.split('_').join(' ')),
        } as TableColumnConfig<Entry>),
    ),
  ];

  return (
    <div
      css={css`
        width: 100%;
      `}
      ref={containerRef}
    >
      <Table
        parentRef={containerRef}
        variant="STATIC"
        getTdProps={(_, row, column) => {
          const isUpdateRow = row.index === 1;
          const isFirstColumn = column.id === FIRST_COLUMN_ACCESSOR;
          return {
            style: {
              background:
                row.original[column.id] > 0 || isFirstColumn
                  ? isUpdateRow
                    ? theme.colors.accent3_3
                    : theme.colors.accent2_4
                  : null,
            } as CSSProperties,
          };
        }}
        columns={tableColumns_legacy}
        data={tableData}
        resizable
      />
      <br />
      <br />
      <br />
      <TableV8 columns={tableColumns} data={tableData} withHeaders withResize withRowBorder />
    </div>
  );
};

export default SubmissionSummaryTable;
