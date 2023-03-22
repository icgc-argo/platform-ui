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

import { ColumnDef, css, Table, TableV8 } from '@icgc-argo/uikit';

import { format as formatDate, formatDistance } from 'date-fns';
import ProgramDashboardLink from './table-cell-components/ProgramDashboardLink';
import SyncIndexButton from './table-cell-components/SyncIndexButton';

// GQL Query
import { useQuery } from '@apollo/client';
import { createRef } from 'react';
import PROGRAM_DONOR_INDEX_STATS_QUERY from './gql/PROGRAM_DONOR_INDEX_STATS_QUERY';

import { getConfig } from 'global/config';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

type TableColumns = {
  donors: number;
  files: number;
  lastUpdate?: string;
  shortName: string;
};

// for react table v6
const tableColumnsTableV6 = [
  {
    Header: 'Program',
    accessor: 'shortName',
    Cell: ({ original }) => <ProgramDashboardLink program={original.shortName} />,
  },
  {
    Header: 'Last Index Release',
    accessor: 'lastUpdate',
    Cell: ({ original }) => {
      if (!original.lastUpdate) {
        return null;
      }
      const date = new Date(original.lastUpdate);
      const formattedDate = formatDate(date, 'yyyy MMM d HH:mm');
      const relativeDate = formatDistance(date, new Date(), { addSuffix: true });
      return `${formattedDate} (${relativeDate})`;
    },
  },
  {
    Header: 'Total Donors',
    accessor: 'donors',
  },
  {
    Header: 'Total Files',
    accessor: 'files',
  },
  {
    Header: 'Sync Donor Index',
    accessor: 'action',
    sortable: false,
    Cell: ({ original }) => <SyncIndexButton program={original.shortName} />,
  },
];

// for react table v8
const tableColumns: ColumnDef<TableColumns>[] = [
  {
    header: 'Program',
    accessorKey: 'shortName',
    cell: ({ row }) => <ProgramDashboardLink program={row.original.shortName} />,
  },
  {
    header: 'Last Index Release',
    accessorKey: 'lastUpdate',
    cell: ({
      row: {
        original: { lastUpdate = '' },
      },
    }) => {
      if (!lastUpdate) {
        return null;
      }
      const date = new Date(lastUpdate);
      const formattedDate = formatDate(date, 'yyyy MMM d HH:mm');
      const relativeDate = formatDistance(date, new Date(), { addSuffix: true });
      return `${formattedDate} (${relativeDate})`;
    },
  },
  {
    header: 'Total Donors',
    accessorKey: 'donors',
  },
  {
    header: 'Total Files',
    accessorKey: 'files',
  },
  {
    header: 'Sync Donor Index',
    id: 'action',
    enableSorting: false,
    cell: ({ row }) => <SyncIndexButton program={row.original.shortName} />,
  },
];

const DonorAggregationIndexTable = ({
  loading,
  programs,
}: {
  loading: boolean;
  programs?: { shortName: string }[];
}) => {
  const queries = (programs || []).map((program) => ({
    shortName: program.shortName,
    query: useQuery(PROGRAM_DONOR_INDEX_STATS_QUERY, {
      variables: { programShortName: program.shortName },
    }),
  }));

  const tableData = (queries || []).map(({ shortName, query: { data } }) => ({
    donors: data?.programDonorSummary?.stats?.registeredDonorsCount,
    files: data?.programDonorSummary?.stats?.allFilesCount,
    lastUpdate: data?.programDonorSummary?.stats?.lastUpdate,
    shortName,
  }));

  const someQueriesLoading = queries.some((query) => query.query.loading);

  const containerRef = createRef<HTMLDivElement>();
  return (
    <div
      ref={containerRef}
      css={css`
        margin-top: 15px;
      `}
    >
      {FEATURE_REACT_TABLE_V8_ENABLED ? (
        <TableV8
          columns={tableColumns}
          data={tableData}
          loading={loading || someQueriesLoading}
          withHeaders
          withResize
          withSideBorders
          withSorting
          withStripes
        />
      ) : (
        <Table
          loading={loading || someQueriesLoading}
          highlight={false}
          parentRef={containerRef}
          showPagination={false}
          withOutsideBorder
          data={tableData}
          columns={tableColumnsTableV6}
          pageSize={programs.length}
          defaultSorted={[{ id: 'shortName', desc: false }]}
        />
      )}
    </div>
  );
};
export default DonorAggregationIndexTable;
