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
import { CSSProperties } from 'react';
import { useTheme } from 'uikit/ThemeProvider';

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

const StatsArea = ({ fileStat }: { fileStat: FileStat }) => {
  return (
    <StatAreaDisplay.Container>
      <StatAreaDisplay.Section>
        {sum([
          fileStat.newCount,
          fileStat.noUpdateCount,
          fileStat.updateCount,
          fileStat.errorCount,
        ])}{' '}
        Total
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.NEW} />
          {fileStat.newCount} New
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.NONE} />
          {fileStat.noUpdateCount} No Update
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.UPDATED} />
          {fileStat.updateCount} Updated
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill={FILE_STATE_COLORS.ERROR} />
          {fileStat.errorCount} Errors
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
}: {
  isPendingApproval: boolean;
  file: ClinicalSubmissionEntityFile;
  submissionData?: React.ComponentProps<typeof SubmissionInfoArea>;
}) => {
  const theme = useTheme();
  const { records, stats } = file;
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = records.length
    ? records[0].fields
    : [];
  const sortedRecords = orderBy<typeof records[0]>(records, REQUIRED_FILE_ENTRY_FIELDS.ROW);

  const tableData = sortedRecords.map(record =>
    record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {
      row: record.row,
    } as { row: number; [k: string]: number | string }),
  );

  const StatusColumCell = ({ original }: { original: typeof tableData[0] }) => {
    const hasError = stats.errorsFound.some(row => row === original.row);
    const hasUpdate = stats.updated.some(row => row === original.row);
    const isNew = stats.new.some(row => row === original.row);
    return (
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
    );
  };

  const tableColumns: TableColumnConfig<typeof tableData[0]>[] = [
    {
      id: REQUIRED_FILE_ENTRY_FIELDS.ROW,
      Cell: ({ original }) => <CellContentCenter>{original.row}</CellContentCenter>,
      Header: '#',
      width: 40,
    },
    {
      id: 'error',
      Cell: StatusColumCell,
      Header: (
        <CellContentCenter>
          <StarIcon fill={FILE_STATE_COLORS.NONE} />
        </CellContentCenter>
      ),
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
      css={css`
        margin: 5px 10px;
      `}
    >
      <TableInfoHeaderContainer
        left={
          <StatsArea
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
