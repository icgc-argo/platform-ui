/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { ColumnDef, css, Row, TableCellWrapper, TableV8, useTheme } from '@icgc-argo/uikit';
import useAuthContext from 'global/hooks/useAuthContext';
import { usePageQuery } from 'global/hooks/usePageContext';
import { toDisplayRowIndex } from 'global/utils/clinicalUtils';
import { isDataSubmitter, isDccMember } from 'global/utils/egoJwt';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { ComponentProps, PropsWithChildren, useMemo } from 'react';

import {
  CellContentCenter,
  DataTableStarIcon as StarIcon,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
} from '../../common';
import { ClinicalSubmissionEntityFile } from '../types';
import StatsArea, { FILE_STATE_COLORS } from './StatsArea';

type FileRecord = {
  rowIndex: number;
  status: 'ERROR' | 'UPDATE' | 'NEW' | 'NONE';
};

type FileRecordTableProps = { row: { original: FileRecord } };

const REQUIRED_FILE_ENTRY_FIELDS = {
  ROW_INDEX: 'rowIndex',
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
      ? REQUIRED_FILE_ENTRY_FIELDS.ROW_INDEX
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

  const tableData: FileRecord[] = sortedRecords.map((record) =>
    record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {
      rowIndex: record.row,
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

  const recordHasError = (original: FileRecord) =>
    stats.errorsFound.some((row) => row === original.rowIndex);

  const rowHasUpdate = (original: FileRecord) =>
    stats.updated.some((row) => row === original.rowIndex);

  const cellHasUpdate = ({ original, field }: { original: FileRecord; field: string }) =>
    file.dataUpdates.some((update) => update.field === field && update.row === original.rowIndex);

  const recordHasWarning = (original: FileRecord) =>
    dataWarnings.some((dw) => dw.row === original.rowIndex);

  const StatusColumnCell = ({ original }: { original: FileRecord }) => {
    const hasError = recordHasError(original);
    const hasUpdate = rowHasUpdate(original);
    const hasNewData = stats.new.some((row) => row === original.rowIndex);
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
                : hasNewData
                ? FILE_STATE_COLORS.NEW
                : FILE_STATE_COLORS.NONE
            }
          />
          {isDiffPreview && hasUpdate && <div>old</div>}
        </CellContentCenter>
      )
    );
  };

  const DataFieldCell = ({ original, fieldName }: { original: FileRecord; fieldName: string }) =>
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
            file.dataUpdates.find((u) => u.field === fieldName && u.row === original.rowIndex),
            'oldValue',
            original[fieldName],
          )}
        </div>
      </div>
    ) : (
      <>{original[fieldName]}</>
    );

  const CellStatusDisplay = ({
    children,
    original,
    field = '',
  }: PropsWithChildren<{ original: FileRecord; field?: string }>) => {
    const pendingApprovalRowUpdate = isPendingApproval && rowHasUpdate(original);
    const cellBackground =
      !isPendingApproval && cellHasUpdate({ original, field })
        ? theme.colors.accent3_3
        : recordHasError(original)
        ? theme.colors.error_4
        : recordHasWarning(original)
        ? theme.colors.warning_4
        : pendingApprovalRowUpdate
        ? theme.colors.accent3_4
        : 'transparent';
    const cellClassName = pendingApprovalRowUpdate
      ? `updateRow` // append this classname so parent div's css can apply style
      : '';
    return (
      <TableCellWrapper
        className={cellClassName}
        css={css`
          background: ${cellBackground};
        `}
      >
        {children}
      </TableCellWrapper>
    );
  };

  const tableColumns: ColumnDef<FileRecord>[] = [
    {
      accessorKey: 'rowIndex',
      cell: ({ row: { original } }: FileRecordTableProps) => (
        <CellStatusDisplay original={original}>
          <CellContentCenter
            css={
              rowHasUpdate(original) &&
              css`
                justify-content: flex-start;
                padding-top: 5px;
              `
            }
          >
            {toDisplayRowIndex(original.rowIndex)}
          </CellContentCenter>
        </CellStatusDisplay>
      ),
      enableResizing: false,
      header: 'Line #',
      size: 70,
    },
    {
      accessorKey: 'status',
      cell: ({ row: { original } }: FileRecordTableProps) => (
        <CellStatusDisplay original={original} field="status">
          <StatusColumnCell original={original} />
        </CellStatusDisplay>
      ),
      enableResizing: false,
      header: () => (
        <CellContentCenter>
          <StarIcon fill={FILE_STATE_COLORS.NONE} />
        </CellContentCenter>
      ),
      id: 'status',
      size: 50,
      sortingFn: (a: Row<FileRecord>, b: Row<FileRecord>) => {
        const sortA = a.original.status;
        const sortB = b.original.status;
        const priorities: { [k in FileRecord['status']]: number } = {
          ERROR: 1,
          UPDATE: 2,
          NEW: 3,
          NONE: 4,
        };
        return priorities[sortA] - priorities[sortB];
      },
    },
    ...fields.map(({ name: fieldName }) => ({
      accessorKey: fieldName,
      header: fieldName,
      cell: ({ row: { original } }: FileRecordTableProps) => (
        <CellStatusDisplay original={original} field={fieldName}>
          <DataFieldCell original={original} fieldName={fieldName} />
        </CellStatusDisplay>
      ),
    })),
  ].map((column) => ({
    ...column,
    meta: {
      customCell: true,
    },
  }));

  return (
    <div
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
      <TableV8
        columns={tableColumns}
        data={tableData}
        enableSorting
        showPageSizeOptions
        withHeaders
        withPagination
        withStripes
      />
    </div>
  );
};

export default FileRecordTable;
