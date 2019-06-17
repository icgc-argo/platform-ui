//@flow
import React from 'react';
import get from 'lodash/get';

import Table from 'uikit/Table';
import { css } from 'uikit';
import PercentageBar from 'uikit/PercentageBar';
import Icon from 'uikit/Icon';
import Tooltip from 'uikit/TemporaryNameSpace';

type ArgoMembershipKey = 'FULL' | 'ASSOCIATE';
type ProgramsTableProgram = {
  id: string,
  shortName: string,
  name: string,
  cancerTypes: Array<{ id: string, name: string }>,
  countries: string | null,
  membershipType: ArgoMembershipKey,
  genomicDonors: number,
  submittedDonors: number,
  commitmentDonors: number,
};
type TableProgramInternal = ProgramsTableProgram & { donorPercentage: number };
type CellProps = { original: TableProgramInternal };

const MembershipDisplayName: { [key: ArgoMembershipKey]: string } = {
  FULL: 'ARGO Member',
  ASSOCIATE: 'ARGO Associate',
};

const InteractiveIcon = props => {
  const [hovvered, setHovered] = React.useState(false);
  return (
    <Icon
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

export default (tableProps: {
  programs: Array<ProgramsTableProgram>,
  onProgramUsersClick: ({ program: ProgramsTableProgram }) => void,
  onProgramEditClick: ({ program: ProgramsTableProgram }) => void,
}) => {
  const data: Array<TableProgramInternal> = tableProps.programs.map(p => ({
    ...p,
    donorPercentage: p.submittedDonors / p.commitmentDonors,
  }));
  const columns: Array<{
    Header: string,
    accessor?: $Keys<TableProgramInternal>,
    Cell?: CellProps => any,
    sortable?: boolean,
    width?: number,
    headerStyle?: {},
  }> = [
    {
      Header: 'Program Name',
      accessor: 'name',
    },
    {
      Header: 'Short Name',
      accessor: 'shortName',
    },
    {
      Header: 'Cancer Types',
      accessor: 'cancerTypes',
      Cell: ({ original: { cancerTypes } }) => (
        <div>
          {cancerTypes.map(({ name }, i) => (
            <div key={name}>
              {name} {i < cancerTypes.length - 1 && ','}
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: 'Countries',
      accessor: 'countries',
      Cell: ({ original: { countries } }) => {
        const list = (countries || '').split(',');
        return (
          <div>
            {list.map((country, i) => (
              <div key={country}>
                {country} {i < list.length - 1 && ','}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      Header: 'Memebership',
      accessor: 'membershipType',
      Cell: ({ original }) => MembershipDisplayName[original.membershipType],
    },
    {
      Header: 'Administrators',
    },
    {
      Header: 'Donor Status',
      accessor: 'donorPercentage',
      width: 200,
      Cell: ({ original }) => (
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
            align-items: center;
          `}
        >
          <Tooltip interactive position="bottom" html={<span>Manage users</span>}>
            <InteractiveIcon
              height="15px"
              width="15px"
              name="users"
              onClick={() => tableProps.onProgramUsersClick({ program: props.original })}
            />
          </Tooltip>
          <Tooltip interactive position="bottom" html={<span>Edit program</span>}>
            <InteractiveIcon
              height="15px"
              width="15px"
              name="edit"
              onClick={() => tableProps.onProgramEditClick({ program: props.original })}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  return <Table data={data} columns={columns} />;
};
