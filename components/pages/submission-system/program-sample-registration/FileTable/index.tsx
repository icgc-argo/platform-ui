/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { ColumnDef, css, Icon, Table, TableV8 } from '@icgc-argo/uikit';
import { toDisplayRowIndex } from 'global/utils/clinicalUtils';
import memoize from 'lodash/memoize';
import omit from 'lodash/omit';
import { ComponentProps, createRef } from 'react';

import {
  CellContentCenter,
  DataTableStarIcon,
  StatArea as StatAreaDisplay,
  SubmissionInfoArea,
  TableInfoHeaderContainer,
} from '../../common';

import { getConfig } from 'global/config';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

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
}: ComponentProps<typeof DataTableStarIcon> & { fill: 'accent2' | 'grey_1' }) => (
  <DataTableStarIcon fill={fill} />
);

const StatsArea = (props: { stats?: FileStats }) => {
  const { stats } = props;
  return (
    <StatAreaDisplay.Container>
      <StatAreaDisplay.Section>
        {stats ? (stats.existingCount + stats.newCount).toLocaleString() : 0} Total
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill="accent2" />
          {stats && stats.newCount.toLocaleString()} New
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon fill="grey_1" />
          {stats && stats.existingCount.toLocaleString()} Already Registered
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
    </StatAreaDisplay.Container>
  );
};

const getColumnWidth = memoize<(keyString: string) => number>((keyString) => {
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
  submissionInfo?: ComponentProps<typeof SubmissionInfoArea>;
}) => {
  const { records: tableData, stats, submissionInfo } = props;

  const filteredFirstRecord = omit(
    tableData[0],
    ...Object.entries(REQUIRED_FILE_ENTRY_FIELDS).map(([_, value]) => {
      return typeof value === 'string' ? value : '';
    }),
  );

  const containerRef = createRef<HTMLDivElement>();

  // for react table v6
  const tableColumns_legacy = [
    {
      id: REQUIRED_FILE_ENTRY_FIELDS.ROW,
      Cell: ({ original }) => (
        <CellContentCenter>{toDisplayRowIndex(original.row)}</CellContentCenter>
      ),
      Header: 'Line #',
      resizable: false,
      width: 70,
    },
    {
      id: REQUIRED_FILE_ENTRY_FIELDS.IS_NEW,
      Cell: ({ original }) => (
        <CellContentCenter>
          <StarIcon fill={original.isNew ? 'accent2' : 'grey_1'} />
        </CellContentCenter>
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
  ];

  // for react table v8
  const tableColumns: ColumnDef<FileEntry>[] = [
    {
      cell: ({ row: { original } }) => (
        <CellContentCenter>{toDisplayRowIndex(original.row)}</CellContentCenter>
      ),
      header: 'Line #',
      accessorKey: REQUIRED_FILE_ENTRY_FIELDS.ROW,
      minSize: 90,
    },
    {
      cell: ({ row: { original } }) => (
        <CellContentCenter>
          <StarIcon fill={original.isNew ? 'accent2' : 'grey_1'} />
        </CellContentCenter>
      ),
      header: () => (
        <div
          css={css`
            display: flex;
          `}
        >
          <StarIcon fill="grey_1" />
        </div>
      ),
      accessorKey: REQUIRED_FILE_ENTRY_FIELDS.IS_NEW,
      size: 48,
    },
    ...Object.entries(filteredFirstRecord).map(([key], i, arr) => ({
      accessorKey: key,
      header: key,
      id: key,
      minSize: getColumnWidth(key),
    })),
  ];

  return (
    <div
      ref={containerRef}
      css={css`
        position: relative;
      `}
    >
      <TableInfoHeaderContainer
        left={<StatsArea stats={stats} />}
        right={<SubmissionInfoArea {...submissionInfo} />}
      />
      {FEATURE_REACT_TABLE_V8_ENABLED ? (
        <TableV8
          columns={tableColumns}
          data={tableData}
          withHeaders
          withResize
          withSorting
          withStripes
        />
      ) : (
        <Table
          parentRef={containerRef}
          showPagination={false}
          pageSize={Number.MAX_SAFE_INTEGER}
          columns={tableColumns_legacy}
          data={tableData}
        />
      )}
    </div>
  );
};

export default FileTable;
