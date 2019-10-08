import memoize from 'lodash/memoize';
import omit from 'lodash/omit';
import React from 'react';
import { css } from 'uikit';
import Affix from 'uikit/Affix';
import clsx from 'clsx';
import Icon from 'uikit/Icon';
import Table from 'uikit/Table';
import { useTheme } from 'uikit/ThemeProvider';
import {
  DataTableStarIcon,
  StatArea as StatAreaDisplay,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
} from '../../common';

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

const StarIcon = ({
  fill,
  ...rest
}: React.ComponentProps<typeof DataTableStarIcon> & { fill: 'accent2' | 'grey_1' }) => (
  <DataTableStarIcon fill={fill} />
);

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
          <StatAreaDisplay.StarIcon fill="accent2" />
          {stats && stats.newCount} New
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill="grey_1" />
          {stats && stats.existingCount} Already Registered
        </StatAreaDisplay.StatEntryContainer>
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
  submissionInfo?: React.ComponentProps<typeof SubmissionInfoArea>;
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
      <Table
        TheadComponent={({ children, className, ...rest }) => (
          <Affix
            top={58}
            css={css`
              background: white;
            `}
          >
            <TableInfoHeaderContainer
              left={<StatsArea stats={stats} />}
              right={<SubmissionInfoArea {...submissionInfo} />}
            />
            <div className={clsx('rt-thead', className)} {...rest}>
              {children}
            </div>
          </Affix>
        )}
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
        data={records}
      />
    </div>
  );
};

export default FileTable;
