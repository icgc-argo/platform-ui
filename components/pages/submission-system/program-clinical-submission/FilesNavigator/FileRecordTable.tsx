import { ClinicalSubmissionEntityFile } from '../types';
import Table, { TableColumnConfig } from 'uikit/Table';
import orderBy from 'lodash/orderBy';
import { css, styled } from 'uikit';
import Icon from 'uikit/Icon';
import {
  DataTableStarIcon,
  StatArea as StatAreaDisplay,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
  CellContentCenter,
} from '../../common';
import { CSSProperties, createRef } from 'react';
import { useTheme } from 'uikit/ThemeProvider';
import useAuthContext from 'global/hooks/useAuthContext';
import { isDccMember, getPermissionsFromToken } from 'global/utils/egoJwt';
import { toDisplayRowIndex } from 'global/utils/clinicalUtils';
import get from 'lodash/get';

const StarIcon = DataTableStarIcon;

type RecordState = 'NEW' | 'NONE' | 'UPDATED' | 'ERROR';

type FileStat = {
  newCount: number;
  noUpdateCount: number;
  updateCount: number;
  errorCount: number;
};

export const FILE_STATE_COLORS: {
  [k in RecordState]: React.ComponentProps<typeof StarIcon>['fill']
} = {
  ERROR: 'error',
  NEW: 'accent2',
  NONE: 'grey_1',
  UPDATED: 'accent3_dark',
};

const StatsArea = ({
  fileStat,
  total,
  isSubmissionValidated,
}: {
  fileStat: FileStat;
  total: number;
  isSubmissionValidated: boolean;
}) => {
  return (
    <StatAreaDisplay.Container>
      <StatAreaDisplay.Section>{total} Total</StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.ERROR} />
          {isSubmissionValidated && fileStat.errorCount}{' '}
          {fileStat.errorCount > 1 ? 'Errors' : 'Error'}
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.UPDATED} />
          {isSubmissionValidated && fileStat.updateCount} Updated
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.NEW} />
          {isSubmissionValidated && fileStat.newCount} New
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.NONE} />
          {isSubmissionValidated && fileStat.noUpdateCount} No Update
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

const REQUIRED_FILE_ENTRY_FIELDS = {
  ROW: 'row',
};

export default ({
  file,
  submissionData,
  isPendingApproval,
  isSubmissionValidated,
}: {
  isPendingApproval: boolean;
  isSubmissionValidated: boolean;
  file: ClinicalSubmissionEntityFile;
  submissionData?: React.ComponentProps<typeof SubmissionInfoArea>;
}) => {
  const { token } = useAuthContext();
  const isDccPreview = isDccMember(getPermissionsFromToken(token)) && isPendingApproval;
  const theme = useTheme();
  const { records, stats } = file;
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = records.length
    ? records[0].fields
    : [];
  const sortedRecords = orderBy(
    records,
    !isDccPreview
      ? REQUIRED_FILE_ENTRY_FIELDS.ROW
      : r => {
          const priority = (() => {
            switch (true) {
              case file.stats.updated.some(i => i === r.row):
                return 0;
              case file.stats.new.some(i => i === r.row):
                return 1;
              default:
                return records.length;
            }
          })();
          return `${priority}::${r.row}`;
        },
  );
  const containerRef = createRef<HTMLDivElement>();

  const tableData = sortedRecords.map(record =>
    record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {
      row: record.row,
      status: (() => {
        switch (true) {
          case stats.updated.some(i => i === record.row):
            return 'UPDATE';
          case stats.errorsFound.some(i => i === record.row):
            return 'ERROR';
          case stats.new.some(i => i === record.row):
            return 'NEW';
          default:
            return 'NONE';
        }
      })(),
    } as { row: number; [k: string]: number | string; status: 'ERROR' | 'UPDATE' | 'NEW' | 'NONE' }),
  );

  const recordHasError = (record: typeof tableData[0]) =>
    stats.errorsFound.some(row => row === record.row);
  const rowHasUpdate = (record: typeof tableData[0]) =>
    stats.updated.some(row => row === record.row);
  const cellHasUpdate = (cell: { row: typeof tableData[0]; field: string }) =>
    file.dataUpdates.some(update => update.field === cell.field && update.row === cell.row.row);

  const StatusColumCell = ({ original }: { original: typeof tableData[0] }) => {
    const hasError = recordHasError(original);
    const hasUpdate = rowHasUpdate(original);
    const isNew = stats.new.some(row => row === original.row);
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
          {isDccPreview && hasUpdate && <div>old</div>}
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
    isDccPreview && rowHasUpdate(original) ? (
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
            file.dataUpdates.find(u => u.field === fieldName && u.row === original.row),
            'oldValue',
            original[fieldName],
          )}
        </div>
      </div>
    ) : (
      <>{original[fieldName]}</>
    );

  const tableColumns: TableColumnConfig<typeof tableData[0]>[] = [
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
      Cell: StatusColumCell,
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
        } as typeof tableColumns[0]),
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
        showPagination={false}
        columns={tableColumns}
        data={tableData}
      />
    </div>
  );
};
