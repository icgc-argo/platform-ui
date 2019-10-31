import Link from 'next/link';
import React from 'react';
import { css } from 'uikit';
import PercentageBar from 'uikit/PercentageBar';
import Table from 'uikit/Table';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import Tooltip from 'uikit/Tooltip';
import A from 'uikit/Link';
import { PROGRAM_DASHBOARD_PATH, PROGRAM_SHORT_NAME_PATH } from 'global/constants/pages';
import { TableColumnConfig } from 'uikit/Table';
import get from 'lodash/get';

type ArgoMembershipKey = 'FULL' | 'ASSOCIATE';
type ProgramsTableProgram = {
  shortName: string;
  name: string | null;
  cancerTypes: Array<string>;
  countries: Array<string> | null;
  membershipType: ArgoMembershipKey | null;
  genomicDonors: number | null;
  submittedDonors: number | null;
  commitmentDonors: number | null;
  administrators: Array<any>;
};
type TableProgramInternal = ProgramsTableProgram & { donorPercentage: number };
type CellProps = { original: TableProgramInternal };

const MembershipDisplayName: { [key in ArgoMembershipKey]: string } = {
  FULL: 'FULL',
  ASSOCIATE: 'ASSOCIATE',
};

export default function ProgramsTable(tableProps: {
  programs: Array<ProgramsTableProgram>;
  onProgramUsersClick: ({ program: ProgramsTableProgram }) => void;
  onProgramEditClick: ({ program: ProgramsTableProgram }) => void;
  loading: boolean;
  loadingUser: boolean;
  LoadingComponent: React.ReactType;
}) {
  const data: Array<TableProgramInternal> = tableProps.programs.map(p => ({
    ...p,
    donorPercentage: (p.submittedDonors || 0) / (p.commitmentDonors || 1),
  }));
  const columns: Array<TableColumnConfig<TableProgramInternal>> = [
    {
      Header: 'Short Name',
      accessor: 'shortName',
      Cell: ({ original }) => (
        <Link
          href={PROGRAM_DASHBOARD_PATH}
          as={PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, original.shortName)}
        >
          <A>{original.shortName}</A>
        </Link>
      ),
    },
    {
      Header: 'Program Name',
      accessor: 'name',
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
        const list = countries || [];
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
      Header: 'Membership',
      accessor: 'membershipType',
      Cell: ({ original }) =>
        original.membershipType ? MembershipDisplayName[original.membershipType] : '',
    },
    {
      Header: 'Administrators',
      accessor: 'administrators',
      Cell: ({ original }) => {
        if (tableProps.loadingUser) {
          return <>Loading</>;
        }
        return get(original, 'administrators', []).map((admin, idx) => (
          <A
            key={admin.email}
            href={`mailto: ${admin.email}`}
            css={css`
              margin-right: 0.5em;
            `}
          >
            {admin.firstName + ' ' + admin.lastName}
            {idx != original.administrators.length - 1 && ','}
          </A>
        ));
      },
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
  return (
    <Table
      parentRef={React.createRef()}
      data={data}
      columns={columns}
      showPagination={false}
      loading={tableProps.loading}
      pageSize={100}
      LoadingComponent={tableProps.LoadingComponent}
    />
  );
}
