// @flow
import type { TableProps, TableColumnConfig } from 'uikit/Table';

import React from 'react';
import sum from 'lodash/sum';
import PropTypes from 'prop-types';
import Table from 'uikit/Table';
import Icon from 'uikit/Icon';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { styled } from 'uikit';

type FileEntry = {
  row: string,
  isNew: boolean,
  [k: string]: string | number | boolean,
};
type FilesStats = {
  totalCount: number,
  newCount: number,
  existingCount: number,
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

const StatsArea = (props: { stats: FilesStats }) => {
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
        <Col>
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
              <StartIcon
                active
                css={css`
                  margin-right: 5px;
                `}
              />{' '}
              {props.stats.newCount} New
            </Section>
            <Section>
              <StartIcon
                active={false}
                css={css`
                  margin-right: 5px;
                `}
              />{' '}
              {props.stats.existingCount} Already Registered
            </Section>
          </Typography>
        </Col>
        <Col align="end" sm={3}>
          <Typography variant="default" color="grey">
            stuff
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

const FilesTable = (props: {
  data: Array<FileEntry>,
  stats: FilesStats,
  registrationId: string,
  programId: string,
  creator: string,
  createdAt: string,
  updatedAt: string,
  tableColumns: Array<
    TableColumnConfig<FileEntry> & {
      keyString: string,
    },
  >,
}) => {
  const getColumnWidth = (c: { keyString: string }): number => {
    const minWidth = 90;
    const maxWidth = 230;
    const magicSpacing = 12;
    return Math.max(Math.min(maxWidth, c.keyString.length * magicSpacing), minWidth);
  };
  return (
    <div>
      <StatsArea stats={props.stats} />
      <Table
        columns={[
          {
            id: 'file_number',
            Cell: ({ original }) => original.row, // we don't know what should be here
            Header: '#',
            width: 60,
          },
          {
            id: 'isNew',
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
          ...props.tableColumns.map(c => ({
            ...c,
            width: getColumnWidth(c),
          })),
        ]}
        data={props.data}
      />
    </div>
  );
};

export default FilesTable;
