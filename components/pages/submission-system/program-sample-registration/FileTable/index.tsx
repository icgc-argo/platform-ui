/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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
  CellContentCenter,
} from '../../common';
import { toDisplayRowIndex } from 'global/utils/clinicalUtils';

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

  const containerRef = React.createRef<HTMLDivElement>();

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
      />{' '}
      <Table
        parentRef={containerRef}
        showPagination={false}
        pageSize={Number.MAX_SAFE_INTEGER}
        columns={[
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
        ]}
        data={records}
      />
    </div>
  );
};

export default FileTable;
