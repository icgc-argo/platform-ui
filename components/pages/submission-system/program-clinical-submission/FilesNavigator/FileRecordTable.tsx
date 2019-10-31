import { ClinicalSubmissionEntityFile } from '../types';
import sum from 'lodash/sum';
import Table, { TableColumnConfig } from 'uikit/Table';
import orderBy from 'lodash/orderBy';
import { css, styled } from 'uikit';
import Icon from 'uikit/Icon';
import {
  DataTableStarIcon,
  StatArea as StatAreaDisplay,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
} from '../../common';
import { CSSProperties, createRef } from 'react';
import { useTheme } from 'uikit/ThemeProvider';
import { Stats } from 'fs';

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
          {fileStat.errorCount} {fileStat.errorCount > 1 ? 'Errors' : 'Error'}
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.UPDATED} />
          {fileStat.updateCount} Updated
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.NEW} />
          {fileStat.newCount} New
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section faded={!isSubmissionValidated}>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.NONE} />
          {fileStat.noUpdateCount} No Update
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

const REQUIRED_FILE_ENTRY_FIELDS = {
  ROW: 'row',
};

const CellContentCenter = styled('div')`
  width: 100%;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

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
  const theme = useTheme();
  const { records, stats } = file;
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = records.length
    ? records[0].fields
    : [];
  const sortedRecords = orderBy<typeof records[0]>(records, REQUIRED_FILE_ENTRY_FIELDS.ROW);
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

  const StatusColumCell = ({ original }: { original: typeof tableData[0] }) => {
    const hasError = stats.errorsFound.some(row => row === original.row);
    const hasUpdate = stats.updated.some(row => row === original.row);
    const isNew = stats.new.some(row => row === original.row);
    return (
      isSubmissionValidated && (
        <CellContentCenter>
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
        </CellContentCenter>
      )
    );
  };

  const tableColumns: TableColumnConfig<typeof tableData[0]>[] = [
    {
      id: REQUIRED_FILE_ENTRY_FIELDS.ROW,
      Cell: ({ original }) => <CellContentCenter>{original.row + 1}</CellContentCenter>,
      Header: '#',
      width: 40,
    },
    {
      id: 'status',
      Cell: StatusColumCell,
      accessor: 'status',
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
    ...fields.map(({ name }) => ({
      accessor: name,
      Header: name,
    })),
  ];

  const recordHasError = (record: typeof tableData[0]) =>
    stats.errorsFound.some(row => row === record.row);

  const rowHasUpdate = (record: typeof tableData[0]) =>
    stats.updated.some(row => row === record.row);

  const cellHasUpdate = (cell: { row: typeof tableData[0]; field: string }) =>
    rowHasUpdate(cell.row) && !!file.dataUpdates.find(update => update.field === cell.field);

  return (
    <div
      ref={containerRef}
      css={css`
        margin: 5px 10px;
        /* width: 100%; */
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
        showPagination={false}
        columns={tableColumns}
        data={tableData}
      />
    </div>
  );
};
