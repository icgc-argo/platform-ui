import { ClinicalSubmissionEntityFile } from '../types';
import sum from 'lodash/sum';
import Table from 'uikit/Table';
import orderBy from 'lodash/orderBy';
import { css, styled } from 'uikit';
import { useTheme } from 'uikit/ThemeProvider';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
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
          <StarIcon fill={FILE_STATE_COLORS.NEW} />
          {fileStat.newCount} New
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StarIcon fill={FILE_STATE_COLORS.NONE} />
          {fileStat.noUpdateCount} No Update
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StarIcon fill={FILE_STATE_COLORS.UPDATED} />
          {fileStat.updateCount} Updated
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StarIcon fill={FILE_STATE_COLORS.ERROR} />
          {fileStat.errorCount} Errors
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

export default ({
  file,
  submissionData,
}: {
  file: ClinicalSubmissionEntityFile;
  submissionData?: React.ComponentProps<typeof SubmissionInfoArea>;
}) => {
  const fields: ClinicalSubmissionEntityFile['records'][0]['fields'] = file.records.length
    ? file.records[0].fields
    : [];
  const sortedRecords = orderBy<typeof file.records[0]>(file.records, 'row');
  const theme = useTheme();
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
        columns={fields.map(({ name }) => ({
          accessor: name,
          Header: name,
        }))}
        data={sortedRecords.map(record =>
          record.fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
        )}
      />
    </div>
  );
};
