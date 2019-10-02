import { format } from 'date-fns';
import memoize from 'lodash/memoize';
import omit from 'lodash/omit';
import React from 'react';
import { Col, Row } from 'react-grid-system';
import { css, styled } from 'uikit';
import Table from 'uikit/Table';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import { formatFileName } from '../util';
import { DataTableStarIcon, StatArea as StatAreaDisplay } from '../../common';

const REQUIRED_FILE_ENTRY_FIELDS = {
  ROW: 'row',
  IS_NEW: 'isNew',
};
export type FileEntry = {
  row: string;
  isNew: boolean;
  [k: string]: string | number | boolean;
};
type FileStats = {
  newCount: number;
  existingCount: number;
};
type SubmissionInfo = {
  fileName: string;
  creator: string;
  createdAt: string;
};

const StarIcon = ({
  fill,
  ...rest
}: React.ComponentProps<typeof DataTableStarIcon> & { fill: 'accent2' | 'grey_1' }) => (
  <DataTableStarIcon fill={fill} />
);

const SubmissionInfoArea = ({
  submissionInfo: { fileName, createdAt, creator },
}: {
  submissionInfo?: SubmissionInfo;
}) => {
  return (
    <Typography variant="data" component="div" color="grey">
      <Typography variant="data" color="secondary_dark">
        {formatFileName(fileName)}
      </Typography>{' '}
      uploaded on{' '}
      <Typography variant="data" color="secondary_dark">
        {format(new Date(createdAt), 'MMMM D, YYYY ')}
      </Typography>{' '}
      by{' '}
      <Typography variant="data" color="secondary_dark">
        {creator}
      </Typography>
    </Typography>
  );
};

const StatsArea = (props: { stats?: FileStats }) => {
  const { stats } = props;
  return (
    <StatAreaDisplay.Container>
      <StatAreaDisplay.Section>
        {stats ? stats.existingCount + stats.newCount : 0} Total
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StarIcon fill="accent2" />
        </StatAreaDisplay.StatEntryContainer>
        {stats && stats.newCount} New
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StarIcon fill="grey_1" />
        </StatAreaDisplay.StatEntryContainer>
        {stats && stats.existingCount} Already Registered
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

const getColumnWidth = memoize<(keyString: string) => number>(keyString => {
  const minWidth = 90;
  const maxWidth = 230;
  const spacePerChar = 9;
  const margin = 25;
  const targetWidth = keyString.length * spacePerChar + margin;
  return Math.max(Math.min(maxWidth, targetWidth), minWidth);
});

const FileTable = (props: {
  records: Array<FileEntry>;
  stats?: FileStats;
  submissionInfo?: SubmissionInfo;
}) => {
  const theme = useTheme();
  const { records, stats, submissionInfo } = props;

  const filteredFirstRecord = omit(
    records[0],
    ...Object.entries(REQUIRED_FILE_ENTRY_FIELDS).map(([_, value]) => {
      return typeof value === 'string' ? value : '';
    }),
  );

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          margin-bottom: 3px;
          border-radius: 2px;
          background-color: ${theme.colors.grey_3};
          padding: 8px;
        `}
      >
        <Row nogutter>
          {stats && <StatsArea stats={stats} />}
          <Col align="end">
            {submissionInfo && <SubmissionInfoArea submissionInfo={submissionInfo} />}
          </Col>
        </Row>
      </div>
      <Table
        showPagination={false}
        pageSize={Number.MAX_SAFE_INTEGER}
        columns={[
          {
            id: REQUIRED_FILE_ENTRY_FIELDS.ROW,
            Cell: ({ original }) => original.row, // we don't know what should be here
            Header: '#',
            width: 48,
          },
          {
            id: REQUIRED_FILE_ENTRY_FIELDS.IS_NEW,
            Cell: ({ original }) => (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  width: 100%;
                `}
              >
                <StarIcon fill={original.isNew ? 'accent2' : 'grey_1'} />
              </div>
            ),
            width: 48,
            Header: (
              <div
                css={css`
                  display: flex;
                `}
              >
                <StarIcon fill="grey_1" />
              </div>
            ),
          },
          ...Object.entries(filteredFirstRecord).map(([key], i, arr) => ({
            id: key,
            accessor: key,
            Header: key,
            minWidth: getColumnWidth(key),
          })),
        ]}
        style={{ maxHeight: '500px' }}
        data={records}
      />
    </div>
  );
};

export default FileTable;
