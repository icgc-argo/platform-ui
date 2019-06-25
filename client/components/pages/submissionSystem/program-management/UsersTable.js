//@flow
import React from 'react';

import { css } from 'uikit';
import Table from 'uikit/Table';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import Tooltip from 'uikit/Tooltip';

type RoleKey = 'ADMINISTRATOR' | 'DATA_SUBMITTER' | 'COLLABORATOR';

type StatusKey = 'APPROVED' | 'PENDING_INVITATION';

type UsersTableUser = {
  name: string,
  email: string,
  role: RoleKey,
  isDacoApproved: boolean,
  status: StatusKey,
  joinDate: string | null,
};

type CellProps = { original: UsersTableUser };

const RoleDisplayName: { [key: RoleKey]: string } = {
  ADMINISTRATOR: 'Administrator',
  DATA_SUBMITTER: 'Data Submitter',
  COLLABORATOR: 'Collaborator',
};

const StatusDisplayName: { [key: StatusKey]: string } = {
  APPROVED: 'Approved',
  PENDING_INVITATION: 'Pending Invitation',
};

const UsersTable = (tableProps: {
  users: Array<UsersTableUser>,
  onUsersEditClick: ({ user: UsersTableUser }) => void,
  onUsersDeleteClick: ({ user: UsersTableUser }) => void,
  onUsersResendInviteClick: ({ user: UsersTableUser }) => void,
}) => {
  const columns: Array<{
    Header: string,
    accessor?: $Keys<UsersTableUser>,
    Cell?: CellProps => any,
    sortable?: boolean,
    width?: number,
    headerStyle?: {},
  }> = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ original }) => (original.role ? RoleDisplayName[original.role] : ''),
    },
    {
      Header: 'Daco Approved',
      accessor: 'isDacoApproved',
      Cell: ({ original }) => (original.isDacoApproved ? 'Yes' : 'No'),
      headerStyle: { wordWrap: 'break-word', whiteSpace: 'pre-line' },
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ original }) => (original.status ? StatusDisplayName[original.status] : ''),
    },
    {
      Header: 'Joined On',
      accessor: 'joinDate',
    },
    {
      Header: 'Actions',
      sortable: false,
      headerStyle: { display: 'flex', justifyContent: 'center' },
      Cell: (props: CellProps) => (
        <div>
          <Tooltip interactive position="bottom" html={<span>Resend Invitation</span>}>
            <InteractiveIcon
              height="15px"
              width="15px"
              name="users"
              onClick={() => console.log('clicky clicky!')}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // TODO: Remove dummy data
  const data = [
    {
      name: 'Homer Simpson',
      email: 'test@email.com',
      role: 'ADMINISTRATOR',
      isDacoApproved: true,
      status: 'PENDING_INVITATION',
      joinDate: '03-02-2018',
    },
  ];

  return <Table data={data} columns={columns} />;
};

export default UsersTable;
