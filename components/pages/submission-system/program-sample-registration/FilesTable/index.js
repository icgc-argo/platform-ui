// @flow
import type { TableProps, TableColumnConfig } from 'uikit/Table';

import React from 'react';
import sum from 'lodash/sum';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Table from 'uikit/Table';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { styled } from 'uikit';

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
  totalCount: number,
  newCount: number,
  existingCount: number,
};
type SubmissionInfo = {
  fileName: string,
  creator: string,
  createdAt: string,
};

const StartIcon = (props: { active: boolean, className?: string }) => (
  <Icon
    className={props.className || ''}
    name="star"
    fill={props.active ? 'success' : 'grey_1'}
    width="16px"
    height="16px"
  />
);

const StatsArea = (props: { stats: FileStats, submissionInfo: SubmissionInfo }) => {
  const theme = useTheme();
  const Section = styled('div')`
    display: flex;
    align-items: center;
    margin-right: 16px;
  `;
  return (
    <div
      css={css`
        border-radius: 2px;
        background-color: ${theme.colors.grey_3};
        padding: 8px;
      `}
    >
      <Row>
        <Col sm={5}>
          <Typography
            variant="paragraph"
            component="div"
            color="grey"
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Section>{props.stats.totalCount} Total</Section>
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
                <StartIcon active />
              </div>
              {props.stats.newCount} New
            </Section>
            <Section>
              <div
                css={css`
                  margin-right: 5px;
                  display: flex;
                  align-items: center;
                `}
              >
                <StartIcon active={false} />
              </div>
              {props.stats.existingCount} Already Registered
            </Section>
          </Typography>
        </Col>
        <Col align="end">
          <Typography variant="paragraph" component="div" color="grey">
            <Typography variant="default" color="secondary_dark">
              {props.submissionInfo.fileName}
            </Typography>{' '}
            uploaded on{' '}
            <Typography variant="default" color="secondary_dark">
              {props.submissionInfo.createdAt}
            </Typography>{' '}
            by{' '}
            <Typography variant="default" color="secondary_dark">
              {props.submissionInfo.creator}
            </Typography>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

const FilesTable = (props: {
  records: Array<FileEntry>,
  stats: FileStats,
  submissionInfo: SubmissionInfo,
}) => {
  const getColumnWidth = (keyString: string): number => {
    const minWidth = 90;
    const maxWidth = 230;
    const spacePerChar = 12;
    return Math.max(Math.min(maxWidth, keyString.length * spacePerChar), minWidth);
  };
  const filteredFirstRecord = omit(
    props.records[0],
    ...Object.entries(REQUIRED_FILE_ENTRY_FIELDS).map(([_, value]) => {
      return typeof value === 'string' ? value : '';
    }),
  );
  return (
    <div>
      <StatsArea stats={props.stats} submissionInfo={props.submissionInfo} />
      <Table
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
                <StartIcon active={original.isNew} />
              </div>
            ),
            width: 60,
            Header: <StartIcon active={false} />,
          },
          ...Object.entries(filteredFirstRecord).map(([key]) => ({
            id: key,
            accessor: key,
            Header: key,
            width: getColumnWidth(key),
          })),
        ]}
        data={props.records}
      />
    </div>
  );
};

export default FilesTable;
