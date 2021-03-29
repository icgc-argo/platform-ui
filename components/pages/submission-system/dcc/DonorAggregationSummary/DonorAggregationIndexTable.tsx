import React from 'react';
import Table from 'uikit/Table';

import { css } from '@emotion/core';

import ProgramDashboardLink from './table-cell-components/ProgramDashboardLink';
import SyncIndexButton from './table-cell-components/SyncIndexButton';
import { format as formatDate, formatDistance } from 'date-fns';

// GQL Query
import { useQuery } from '@apollo/react-hooks';
import PROGRAM_DONOR_INDEX_STATES from './PROGRAM_DONOR_INDEX_STATS.gql';

const columns = [
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

export default ({
  loading,
  programs,
}: {
  loading: boolean;
  programs?: { shortName: string }[];
}) => {
  const queries = (programs || []).map((program) => ({
    shortName: program.shortName,
    query: useQuery(PROGRAM_DONOR_INDEX_STATES, {
      variables: { programShortName: program.shortName },
    }),
  }));

  const data = (queries || []).map(({ shortName, query: { loading, data } }) => ({
    // loading,
    // shortName: data?.programDonorSummaryStats.programShortName,
    loading: '' + loading,
    shortName,
    donors: data?.programDonorSummaryStats.registeredDonorsCount,
    files: data?.programDonorSummaryStats.allFilesCount,
    lastUpdate: data?.programDonorSummaryStats.lastUpdate,
  }));

  console.log({ data });

  const containerRef = React.createRef<HTMLDivElement>();
  return (
    <div
      ref={containerRef}
      css={css`
        margin-top: 15px;
      `}
    >
      <Table
        loading={loading}
        highlight={false}
        parentRef={containerRef}
        showPagination={false}
        withOutsideBorder
        data={data}
        columns={columns}
        pageSize={programs.length}
        defaultSorted={[{ id: 'shortName', desc: false }]}
      />
    </div>
  );
};
