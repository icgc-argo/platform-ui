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

import { ColumnDef, css, Table, TableColumnConfig, TableV8, useTheme } from '@icgc-argo/uikit';
import useAuthContext from 'global/hooks/useAuthContext';
import { usePageQuery } from 'global/hooks/usePageContext';
import { toDisplayRowIndex } from 'global/utils/clinicalUtils';
import { isDataSubmitter, isDccMember } from 'global/utils/egoJwt';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { ComponentProps, useMemo, createRef, CSSProperties } from 'react';

import {
  CellContentCenter,
  DataTableStarIcon as StarIcon,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
} from '../../common';
import { ClinicalSubmissionEntityFile } from '../types';
import StatsArea from './StatsArea';

type TableColumns = {
  row: number;
  status: 'ERROR' | 'UPDATE' | 'NEW' | 'NONE';
  fakeColumn: string;
};

type RecordState = 'NEW' | 'NONE' | 'UPDATED' | 'ERROR' | 'WARNING';

export const FILE_STATE_COLORS: {
  [k in RecordState]: ComponentProps<typeof StarIcon>['fill'];
} = {
  ERROR: 'error',
  WARNING: 'warning',
  NEW: 'accent2',
  NONE: 'grey_1',
  UPDATED: 'accent3_dark',
};

const REQUIRED_FILE_ENTRY_FIELDS = {
  ROW: 'row',
};

const FileRecordTable = ({
  file,
  submissionData,
  isPendingApproval,
  isSubmissionValidated,
}: {
  isPendingApproval: boolean;
  isSubmissionValidated: boolean;
  file: ClinicalSubmissionEntityFile;
  submissionData?: ComponentProps<typeof SubmissionInfoArea>;
}) => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { egoJwt, permissions } = useAuthContext();
  const isDiffPreview = useMemo(
    () =>
      (isDccMember(permissions) || isDataSubmitter({ permissions, programId: programShortName })) &&
      isPendingApproval,
    [egoJwt, isPendingApproval],
  );
  const theme = useTheme();
  const { records, stats, dataWarnings } = file;
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = records.length
    ? records[0].fields
    : [];
  const sortedRecords = orderBy(
    records,
    !(isDccMember(permissions) && isPendingApproval)
      ? REQUIRED_FILE_ENTRY_FIELDS.ROW
      : (r) => {
          const priority = (() => {
            switch (true) {
              case file.stats.updated.some((i) => i === r.row):
                return 0;
              case file.stats.new.some((i) => i === r.row):
                return 1;
              default:
                return records.length;
            }
          })();
          return `${priority}::${r.row}`;
        },
  );
  const containerRef = createRef<HTMLDivElement>();

  const tableData: TableColumns[] = sortedRecords.map((record) =>
    record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {
      fakeColumn: 'testing',
      row: record.row,
      status: (() => {
        switch (true) {
          case stats.updated.some((i) => i === record.row):
            return 'UPDATE';
          case stats.errorsFound.some((i) => i === record.row):
            return 'ERROR';
          case stats.new.some((i) => i === record.row):
            return 'NEW';
          default:
            return 'NONE';
        }
      })(),
    }),
  );

  const recordHasError = (record: typeof tableData[0]) =>
    stats.errorsFound.some((row) => row === record.row);

  const rowHasUpdate = (record: typeof tableData[0]) =>
    stats.updated.some((row) => row === record.row);

  const cellHasUpdate = (cell: { row: typeof tableData[0]; field: string }) =>
    file.dataUpdates.some((update) => update.field === cell.field && update.row === cell.row.row);

  const recordHasWarning = (record: typeof tableData[0]) =>
    dataWarnings.some((dw) => dw.row === record.row);

  const StatusColumnCell = ({ original }: { original: typeof tableData[0] }) => {
    const hasError = recordHasError(original);
    const hasUpdate = rowHasUpdate(original);
    const isNew = stats.new.some((row) => row === original.row);
    return (
      isSubmissionValidated && (
        <CellContentCenter
          css={css`
            display: flex;
            justify-content: space-around;
          `}
        >
          <StarIcon
            fill={
              hasError
                ? FILE_STATE_COLORS.ERROR
                : hasUpdate
                ? FILE_STATE_COLORS.UPDATED
                : isNew
                ? FILE_STATE_COLORS.NEW
                : FILE_STATE_COLORS.NONE
            }
          />
          {isDiffPreview && hasUpdate && <div>old</div>}
        </CellContentCenter>
      )
    );
  };

  const DataFieldCell = ({
    original,
    fieldName,
  }: {
    original: typeof tableData[0];
    fieldName: string;
  }) =>
    isDiffPreview && rowHasUpdate(original) ? (
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          & > div {
            margin-top: 5px;
            margin-bottom: 5px;
            flex: 1;
          }
        `}
      >
        <div>{original[fieldName]}</div>
        <div>
          {get(
            file.dataUpdates.find((u) => u.field === fieldName && u.row === original.row),
            'oldValue',
            original[fieldName],
          )}
        </div>
      </div>
    ) : (
      <>{original[fieldName]}</>
    );

  const tableColumns: ColumnDef<TableColumns>[] = [
    {
      accessorKey: 'row',
    },
    { accessorKey: 'status', size: 50, enableResizing: false },
    { accessorKey: 'fakeColumn' },
  ];

  const tableColumnsTableV6: TableColumnConfig<typeof tableData[0]>[] = [
    {
      id: REQUIRED_FILE_ENTRY_FIELDS.ROW,
      Cell: ({ original }) => (
        <CellContentCenter
          css={
            rowHasUpdate(original)
              ? css`
                  justify-content: flex-start;
                  padding-top: 5px;
                `
              : css``
          }
        >
          {toDisplayRowIndex(original.row)}
        </CellContentCenter>
      ),
      Header: 'Line #',
      resizable: false,
      width: 70,
    },
    {
      id: 'status',
      Cell: StatusColumnCell,
      accessor: 'status',
      resizable: false,
      Header: (
        <CellContentCenter>
          <StarIcon fill={FILE_STATE_COLORS.NONE} />
        </CellContentCenter>
      ),
      sortMethod: (a: typeof tableData[0]['status'], b: typeof tableData[0]['status']) => {
        const priorities = {
          ERROR: 1,
          UPDATE: 2,
          NEW: 3,
          NONE: 4,
        } as { [k in typeof tableData[0]['status']]: number };
        return priorities[a] - priorities[b];
      },
      width: 50,
    },
    ...fields.map(
      ({ name: fieldName }) =>
        ({
          accessor: fieldName,
          Header: fieldName,
          Cell: ({ original }) => <DataFieldCell original={original} fieldName={fieldName} />,
        } as typeof tableColumnsTableV6[0]),
    ),
  ];

  return (
    <div
      ref={containerRef}
      css={css`
        margin: 5px 10px;
        .updateRow + .updateRow {
          border-top: solid 1px ${theme.colors.grey_2};
        }
      `}
    >
      <TableInfoHeaderContainer
        left={
          <StatsArea
            isSubmissionValidated={isSubmissionValidated}
            total={records.length}
            fileStat={{
              errorCount: file.stats.errorsFound.length,
              newCount: file.stats.new.length,
              noUpdateCount: file.stats.noUpdate.length,
              updateCount: file.stats.updated.length,
            }}
          />
        }
        right={<SubmissionInfoArea {...submissionData} />}
      />
      <Table
        parentRef={containerRef}
        getTdProps={(_, row: { original: typeof tableData[0] }, column: { id: string }) =>
          ({
            style:
              isPendingApproval && cellHasUpdate({ row: row.original, field: column.id })
                ? {
                    background: theme.colors.accent3_3,
                  }
                : {},
          } as { style: CSSProperties })
        }
        getTrProps={(_, { original }: { original: typeof tableData[0] }) =>
          ({
            style: recordHasError(original)
              ? {
                  background: theme.colors.error_4,
                }
              : recordHasWarning(original)
              ? {
                  background: theme.colors.warning_4,
                }
              : isPendingApproval && rowHasUpdate(original)
              ? {
                  background: theme.colors.accent3_4,
                }
              : {},
          } as { style: CSSProperties })
        }
        getTrGroupProps={(_, { original }: { original: typeof tableData[0] }) =>
          isPendingApproval && rowHasUpdate(original)
            ? {
                className: `updateRow`, // append this classname so parent div's css can apply style
              }
            : {}
        }
        columns={tableColumnsTableV6}
        data={tableData}
        showPagination
      />
      <br />
      <br />
      <br />
      <TableV8 data={tableData} columns={tableColumns} withHeaders withStripes />
    </div>
  );
};

export default FileRecordTable;
