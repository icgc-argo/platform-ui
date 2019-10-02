import { ClinicalSubmissionEntityFile } from '../types';
import sum from 'lodash/sum';
import Table from 'uikit/Table';
import orderBy from 'lodash/orderBy';
import { css, styled } from 'uikit';
import Icon from 'uikit/Icon';
import {
  DataTableStarIcon,
  StatArea as StatAreaDisplay,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
} from '../../common';
import { ThemeColorNames } from 'uikit/theme/types';
import { Col, Row } from 'react-grid-system';

const StarIcon = DataTableStarIcon;

type RecordState = 'NEW' | 'NONE' | 'UPDATED' | 'ERROR';

type FileStat = {
  newCount: number;
  noUpdateCount: number;
  updateCount: number;
  errorCount: number;
};

const FILE_STATE_COLORS: { [k in RecordState]: React.ComponentProps<typeof StarIcon>['fill'] } = {
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
          fileStat.errorCount,
          fileStat.newCount,
          fileStat.noUpdateCount,
          fileStat.updateCount,
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
}: {
  file: ClinicalSubmissionEntityFile;
  submissionData?: React.ComponentProps<typeof SubmissionInfoArea>;
}) => {
  const { dataErrors, records, dataUpdates } = file;
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = records.length
    ? records[0].fields
    : [];
  const sortedRecords = orderBy<typeof records[0]>(records, REQUIRED_FILE_ENTRY_FIELDS.ROW);

  const tableData = sortedRecords.map(record =>
    record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {
      row: record.row,
    }),
  );

  const StatusColumCell = ({ original }: { original: typeof tableData[0] }) => {
    const hasError = dataErrors.some(error => error.row === original.row);
    const hasUpdate = dataUpdates.some(update => update.row === original.row);
    return (
      <CellContentCenter>
        <StarIcon
          fill={
            hasError
              ? FILE_STATE_COLORS.ERROR
              : hasUpdate
              ? FILE_STATE_COLORS.UPDATED
              : FILE_STATE_COLORS.NONE
          }
        />
      </CellContentCenter>
    );
  };

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
              errorCount: 1,
              newCount: 2,
              noUpdateCount: 3,
              updateCount: 5,
            }}
          />
        }
        right={<SubmissionInfoArea {...submissionData} />}
      />
      <Table
        showPagination={false}
        columns={[
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
        ]}
        data={tableData}
      />
    </div>
  );
};
