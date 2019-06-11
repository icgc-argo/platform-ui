//@flow
import React from 'react';
import get from 'lodash/get';

import Table from 'uikit/Table';
import { css } from 'uikit';
import PercentageBar from 'uikit/PercentageBar';

interface ProgramsTableProgram {
  id: string;
  shortName: string;
  name: string;
  cancerTypes: Array<{ id: string, name: string }>;
  countries: string;
  membershipType: string;
  genomicDonors: number;
  submittedDonors: number;
  commitmentDonors: number;
}

const DonorStatusCell = ({ original }: { original: ProgramsTableProgram }) => (
  <PercentageBar nom={original.submittedDonors} denom={original.commitmentDonors} />
);

export default (props: { programs: Array<ProgramsTableProgram> }) => {
  const DONOR_PERCENTAGE_KEY = 'donorPercentage';
  return (
    <Table
      data={props.programs.map(p => ({
        ...p,
        [DONOR_PERCENTAGE_KEY]: p.submittedDonors / p.commitmentDonors,
      }))}
      showPagination
      showPaginationTop
      showPaginationBottom
      columns={[
        {
          Header: 'Program Name',
          accessor: 'name',
        },
        {
          Header: 'Short Name',
          accessor: 'shortName',
        },
        {
          Header: 'Country',
          accessor: 'countries',
        },
        {
          Header: 'Memebership',
          accessor: 'membershipType',
        },
        {
          Header: 'Donor Status',
          accessor: DONOR_PERCENTAGE_KEY,
          Cell: DonorStatusCell,
        },
      ]}
    />
  );
};
