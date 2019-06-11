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
type TableProgramInternal = ProgramsTableProgram & { donorPercentage: number };
type CellProps = { original: TableProgramInternal };

const InteractiveIcon = props => {
  const [hovvered, setHovered] = React.useState(false);
  return (
    <Icon
      height="20px"
      width="20px"
      css={css`
        cursor: pointer;
      `}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      fill={hovvered ? 'accent2_1' : 'accent2'}
      {...props}
    />
  );
};
InteractiveIcon.propTypes = Icon.propTypes;

export default (props: { programs: Array<ProgramsTableProgram> }) => {
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
          Cell: (props: CellProps) => (
            <div
              css={css`
                display: flex;
                justify-content: space-around;
              `}
            >
              <InteractiveIcon name="users" onClick={console.log} />
              <InteractiveIcon name="edit" onClick={console.log} />
            </div>
          ),
        },
      ]}
    />
  );
};
