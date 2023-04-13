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

import {
  ColumnDef,
  css,
  Table,
  TableCellWrapper,
  TableColumnConfig,
  TableV8,
  useTheme,
} from '@icgc-argo/uikit';
import { capitalize } from 'global/utils/stringUtils';
import { createRef, CSSProperties } from 'react';

import { StatArea } from '../common';
import { FILE_STATE_COLORS } from './FilesNavigator/FileRecordTable';
import { GqlClinicalEntityClinicalType, GqlClinicalEntity } from './types';
import { getConfig } from 'global/config';

type EntryTableV6 = {
  [k: string]: number | JSX.Element;
};

type SubmissionSummaryStatus = {
  submissionSummaryStatus: string;
};

// This type allows us to have a subset of the GqlClinicalEntity properties as columns, but not any other columns.
//   A SubmissionSummaryStatus column is also allowed.
type SubmissionSummaryColumns = Partial<
  SubmissionSummaryStatus & {
    [k in GqlClinicalEntityClinicalType]: string;
  }
>;

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

const FIRST_COLUMN_ACCESSOR = 'submissionSummaryStatus';

const SubmissionSummaryTable = ({
  clinicalEntities,
}: {
  clinicalEntities: GqlClinicalEntity[];
}) => {
  const theme = useTheme();

  const newDataRow = clinicalEntities.reduce<SubmissionSummaryColumns>(
    (acc, entity) => ({
      ...acc,
      [entity.clinicalType]: String(entity.stats?.new?.length || 0),
    }),
    { [FIRST_COLUMN_ACCESSOR]: 'New' },
  );

  const updatedDataRow = clinicalEntities.reduce<SubmissionSummaryColumns>(
    (acc, entity) => ({
      ...acc,
      [entity.clinicalType]: String(entity.stats?.updated?.length || 0),
    }),
    { [FIRST_COLUMN_ACCESSOR]: 'Updated' },
  );

  const tableData: SubmissionSummaryColumns[] = [newDataRow, updatedDataRow];

  // for react table v6
  const tableColumnsTableV6: TableColumnConfig<EntryTableV6>[] = [
    // this is the first column
    {
      accessor: FIRST_COLUMN_ACCESSOR,
      width: 100,
    },
    ...clinicalEntities.map((entity) => ({
      accessor: entity.clinicalType,
      Header: capitalize(entity.clinicalType.split('_').join(' ')),
    })),
  ];
  const containerRef = createRef<HTMLDivElement>();

  // for react table v8
  const tableColumns: ColumnDef<SubmissionSummaryColumns>[] = [
    {
      header: '',
      accessorKey: FIRST_COLUMN_ACCESSOR,
      size: 100,
      cell: ({ row: { index, original } }) => {
        const cellValue = original[FIRST_COLUMN_ACCESSOR];
        return (
          <TableCellWrapper
            css={css`
              background: ${index ? theme.colors.accent3_3 : theme.colors.accent2_4};
            `}
          >
            <StatArea.StarIcon fill={FILE_STATE_COLORS[cellValue.toUpperCase()]} />
            &nbsp;{cellValue}
          </TableCellWrapper>
        );
      },
      meta: {
        customCell: true,
      },
    },
    ...clinicalEntities.map((entity) => ({
      accessorKey: entity.clinicalType,
      header: capitalize(entity.clinicalType.split('_').join(' ')),
      cell: ({ cell, row }) => (
        <TableCellWrapper
          css={css`
            background: ${Number(cell.getValue())
              ? row.index
                ? theme.colors.accent3_3
                : theme.colors.accent2_4
              : 'transparent'};
          `}
        >
          {cell.getValue()}
        </TableCellWrapper>
      ),
      meta: {
        customCell: true,
      },
    })),
  ];

  return (
    <div
      css={css`
        width: 100%;
      `}
      ref={containerRef}
    >
      {FEATURE_REACT_TABLE_V8_ENABLED ? (
        <TableV8 columns={tableColumns} data={tableData} withHeaders withResize withRowBorder />
      ) : (
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
          columns={tableColumnsTableV6}
          data={tableData}
          resizable
        />
      )}
    </div>
  );
};

export default SubmissionSummaryTable;
