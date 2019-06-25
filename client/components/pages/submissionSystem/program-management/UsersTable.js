//@flow
import React from 'react';

import { css } from 'uikit';
import { SelectTable } from 'uikit/Table';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import Tooltip from 'uikit/Tooltip';
import Checkbox from 'uikit/form/Checkbox';

type RoleKey = 'ADMINISTRATOR' | 'DATA_SUBMITTER' | 'COLLABORATOR';

type StatusKey = 'APPROVED' | 'PENDING_INVITATION';

type UsersTableUser = {
  id: string,
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
  onUserEditClick: ({ user: UsersTableUser }) => void,
  onUserDeleteClick: ({ user: UsersTableUser }) => void,
  onUserResendInviteClick: ({ user: UsersTableUser }) => void,
}) => {
  const [selectedUsers, setSelectedUsers] = React.useState(new Set());
  const [selectAll, setSelectAll] = React.useState(false);

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
      width: 125,
      Cell: (props: CellProps) => (
        <div
          css={css`
            display: flex;
            justify-content: space-around;
          `}
        >
          <Tooltip interactive position="bottom" html={<span>Resend invitation</span>}>
            <InteractiveIcon
              height="15px"
              width="15px"
              name="mail"
              disabled
              onClick={() => tableProps.onUserResendInviteClick({ user: props.original })}
            />
          </Tooltip>
          <Tooltip interactive position="bottom" html={<span>Edit user</span>}>
            <InteractiveIcon
              height="15px"
              width="15px"
              name="edit"
              onClick={() => tableProps.onUserEditClick({ user: props.original })}
            />
          </Tooltip>
          <Tooltip interactive position="bottom" html={<span>Remove user</span>}>
            <InteractiveIcon
              height="15px"
              width="15px"
              name="trash"
              onClick={() => tableProps.onUserDeleteClick({ user: props.original })}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // TODO: Remove dummy data
  const data = [
    {
      id: '1',
      name: 'Homer Simpson',
      email: 'test@email.com',
      role: 'ADMINISTRATOR',
      isDacoApproved: true,
      status: 'PENDING_INVITATION',
      joinDate: '03-02-2018',
    },
    {
      id: '2',
      name: 'Bart Simpson',
      email: 'test@email.com',
      role: 'ADMINISTRATOR',
      isDacoApproved: true,
      status: 'PENDING_INVITATION',
      joinDate: '03-02-2018',
    },
    {
      id: '3',
      name: 'Lisa Simpson',
      email: 'test@email.com',
      role: 'ADMINISTRATOR',
      isDacoApproved: true,
      status: 'PENDING_INVITATION',
      joinDate: '03-02-2018',
    },
  ];

  const mySet = new Set([1, 2, 3, 3, 3]);
  console.log('myset', mySet);
  console.log('myset has', mySet.has(3));
  console.log('delete', mySet.delete(3), mySet.has(3));

  return (
    <SelectTable
      keyField={'id'}
      isSelected={id => {
        console.log('iselecleted()', id, selectedUsers, selectedUsers.has(id));
        selectedUsers.has(id);
      }}
      selectAll={selectAll}
      toggleAll={() => {
        const d = data.map(user => user.id);
        console.log('d', d);
        const newSelectedUsers = new Set(d);
        console.log('toggleAll() ', newSelectedUsers);
        setSelectedUsers(newSelectedUsers);
        setSelectAll(!selectAll);
      }}
      toggleSelection={id => {
        const noPrefixId = id.substring(7);
        console.log('toggle selection', noPrefixId);
        selectedUsers.has(noPrefixId)
          ? selectedUsers.delete(noPrefixId)
          : selectedUsers.add(noPrefixId);
        console.log('toggleSelectiomn() ', selectedUsers);
        setSelectedUsers(new Set([1]));
      }}
      selectType="checkbox"
      data={data}
      columns={columns}
      showPagination={false}
    />
  );
};

export default UsersTable;
