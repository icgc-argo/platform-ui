// @flow
import type { TableProps, TableColumnConfig } from 'uikit/Table';

import React from 'react';
import memoize from 'lodash/memoize';
import sum from 'lodash/sum';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Table, { TableActionBar } from 'uikit/Table';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { styled } from 'uikit';
import NoDataMessage from './NoDataMessage';
import get from 'lodash/get';
import { format } from 'date-fns';

const REQUIRED_FILE_ENTRY_FIELDS = {
  ROW: 'row',
  IS_NEW: 'isNew',
};
type FileEntry = {
  row: string,
  isNew: boolean,
  [k: string]: string | number | boolean,
};
type FileStats = {
  newCount: number,
  existingCount: number,
};
type SubmissionInfo = {
  fileName: string,
  creator: string,
  createdAt: string,
};

const StarIcon = (props: { active: boolean, className?: string }) => (
  <Icon
    className={props.className || ''}
    name="star"
    fill={props.active ? 'success' : 'grey_1'}
    width="16px"
    height="16px"
  />
);

const SubmissionInfoArea = ({ submissionInfo }: { submissionInfo: ?SubmissionInfo }) => (
  <Typography variant="paragraph" component="div" color="grey">
    <Typography variant="default" color="secondary_dark">
      {submissionInfo && submissionInfo.fileName}
    </Typography>{' '}
    uploaded on{' '}
    <Typography variant="default" color="secondary_dark">
      {submissionInfo && format(new Date(submissionInfo.createdAt), 'MMMM D, YYYY ')}
    </Typography>{' '}
    by{' '}
    <Typography variant="default" color="secondary_dark">
      {submissionInfo && submissionInfo.creator}
    </Typography>
  </Typography>
);

const StatsArea = (props: { stats: ?FileStats }) => {
  const { stats } = props;
  const Section = styled('div')`
    display: flex;
    align-items: center;
    margin-right: 16px;
    text-align: center;
  `;

  return (
    <Typography
      variant="paragraph"
      component="div"
      color="grey"
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <Section>{stats ? stats.existingCount + stats.newCount : 0} Total</Section>
      <Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </Section>
      <Section>
        <div
          css={css`
            margin-right: 5px;
            display: flex;
            align-items: center;
          `}
        >
          <StarIcon active />
        </div>
        {stats && stats.newCount} New
      </Section>
      <Section>
        <div
          css={css`
            margin-right: 5px;
            display: flex;
            align-items: center;
          `}
        >
          <StarIcon active={false} />
        </div>
        {stats && stats.existingCount} Already Registered
      </Section>
    </Typography>
  );
};

const getColumnWidth = memoize<[string], number | void>(keyString => {
  const minWidth = 90;
  const maxWidth = 230;
  const spacePerChar = 9;
  const margin = 25;
  const targetWidth = keyString.length * spacePerChar + margin;
  return Math.max(Math.min(maxWidth, targetWidth), minWidth);
});

const FileTable = (props: {
  records: Array<FileEntry>,
  stats: ?FileStats,
  submissionInfo: ?SubmissionInfo,
}) => {
  const theme = useTheme();
  const { records, stats, submissionInfo } = props;

  // col headings
  const excludeHeadings = Object.keys(REQUIRED_FILE_ENTRY_FIELDS).map(key => {
    const value = REQUIRED_FILE_ENTRY_FIELDS[key];
    return typeof value === 'string' ? value : '';
  });
  const fields = get(records[0], 'fields', []);
  const filteredFirstRecord = fields.filter(field => !excludeHeadings.includes(field.name));

  // table data
  const tableData = records.map(record => {
    const fields = get(record, 'fields', []);

    const data = fields.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
    // add row number
    return { ...data, row: record.row };
  });

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
          <Col lg={6}>{stats && <StatsArea stats={stats} />}</Col>
          <Col align="end">
            {submissionInfo && <SubmissionInfoArea submissionInfo={submissionInfo} />}
          </Col>
        </Row>
      </div>
      <Table
        showPagination={false}
        columns={[
          {
            id: REQUIRED_FILE_ENTRY_FIELDS.ROW,
            Cell: ({ original }) => original.row, // we don't know what should be here
            Header: '#',
            width: 60,
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
                <StarIcon active={original.isNew} />
              </div>
            ),
            width: 60,
            Header: <StarIcon active={false} />,
          },
          ...filteredFirstRecord.map(({ name }, i) => ({
            id: name,
            accessor: name,
            Header: name,
            minWidth: getColumnWidth(name),
          })),
        ]}
        style={{ maxHeight: '500px' }}
        data={tableData}
      />
    </div>
  );
};

export default FileTable;
