//@flow
import Link from 'next/link';
import React from 'react';
import urljoin from 'url-join';
import { css } from 'uikit';
import PercentageBar from 'uikit/PercentageBar';
import Table from 'uikit/Table';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import Tooltip from 'uikit/Tooltip';
import A from 'uikit/Link';
import { PROGRAM_DASHBOARD_PATH } from 'global/constants/pages';

type ArgoMembershipKey = 'FULL' | 'ASSOCIATE';
type ProgramsTableProgram = {
  shortName: string,
  name: string | null,
  cancerTypes: Array<string>,
  countries: string | null,
  membershipType: ArgoMembershipKey | null,
  genomicDonors: number | null,
  submittedDonors: number | null,
  commitmentDonors: number | null,
  administrators: string | null,
};
type TableProgramInternal = ProgramsTableProgram & { donorPercentage: number };
type CellProps = { original: TableProgramInternal };

const MembershipDisplayName: { [key: ArgoMembershipKey]: string } = {
  FULL: 'ARGO Member',
  ASSOCIATE: 'ARGO Associate',
};

export default (tableProps: {
  programs: Array<ProgramsTableProgram>,
  onProgramUsersClick: ({ program: ProgramsTableProgram }) => void,
  onProgramEditClick: ({ program: ProgramsTableProgram }) => void,
}) => {
  const data: Array<TableProgramInternal> = tableProps.programs.map(p => ({
    ...p,
    donorPercentage: (p.submittedDonors || 0) / (p.commitmentDonors || 1),
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
      Cell: ({ original }) => (
        <Link href={urljoin(PROGRAM_DASHBOARD_PATH, original.shortName)}>
          <A>{original.shortName}</A>
        </Link>
      ),
    },
    {
      Header: 'Cancer Types',
      accessor: 'cancerTypes',
      Cell: ({ original: { cancerTypes } }) => (
        <div>
          {cancerTypes.map((cancerType, i) => (
            <div key={cancerType}>
              {cancerType}
              {i < cancerTypes.length - 1 && ','}
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
                {country}
                {i < list.length - 1 && ','}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      Header: 'Memebership',
      accessor: 'membershipType',
      Cell: ({ original }) =>
        original.membershipType ? MembershipDisplayName[original.membershipType] : '',
    },
    {
      Header: 'Administrators',
      accessor: 'administrators',
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
      Cell: (props: CellProps) => (
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex: 1;
          `}
        >
          <Tooltip interactive position="bottom" html={<span>Manage users</span>}>
            <InteractiveIcon
              height="20px"
              width="20px"
              name="users"
              onClick={() => tableProps.onProgramUsersClick({ program: props.original })}
            />
          </Tooltip>
          <Tooltip interactive position="bottom" html={<span>Edit program</span>}>
            <InteractiveIcon
              height="20px"
              width="20px"
              name="edit"
              onClick={() => tableProps.onProgramEditClick({ program: props.original })}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  return <Table data={data} columns={columns} showPagination={false} />;
};
