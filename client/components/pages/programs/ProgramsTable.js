//@flow
import React from 'react';
import get from 'lodash/get';

import Table from 'uikit/Table';
import { css } from 'uikit';
import PercentageBar from 'uikit/PercentageBar';
import Icon from 'uikit/Icon';

type ProgramsTableProgram = {
  id: string,
  shortName: string,
  name: string,
  cancerTypes: Array<{ id: string, name: string }>,
  countries: string,
  membershipType: string,
  genomicDonors: number,
  submittedDonors: number,
  commitmentDonors: number,
};

export default (props: { programs: Array<ProgramsTableProgram> }) => {
  type TableProgramInternal = ProgramsTableProgram & { donorPercentage: number };
  type CellProps = { original: TableProgramInternal };
  const data: Array<TableProgramInternal> = props.programs.map(p => ({
    ...p,
    donorPercentage: p.submittedDonors / p.commitmentDonors,
  }));
  return (
    <Table
      data={data}
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
          accessor: 'donorPercentage',
          Cell: ({ original }: CellProps) => (
            <PercentageBar nom={original.submittedDonors} denom={original.commitmentDonors} />
          ),
        },
        {
          Header: 'Actions',
          sortable: false,
          width: 100,
          headerStyle: css`
            display: flex;
            justify-content: center;
          `,
          Cell: ({ original }: CellProps) => (
            <div
              css={css`
                display: flex;
                justify-content: space-around;
              `}
            >
              <Icon name="users" height={'20px'} width={'20px'} fill="accent2" />
              <Icon name="edit" height={'20px'} width={'20px'} fill="accent2" />
            </div>
          ),
        },
      ]}
    />
  );
};
