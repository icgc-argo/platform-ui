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
  const [selectedUsers, setSelectedUsers] = React.useState(['2']);
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

  const keyFieldProp = 'id';

  return (
    <SelectTable
      keyField={keyFieldProp}
      isSelected={keyField => selectedUsers.includes(keyField)}
      selectAll={selectAll}
      toggleAll={() => {
        setSelectedUsers(selectAll ? [] : tableProps.users.map(data => data[keyFieldProp]));
        setSelectAll(!selectAll);
      }}
      toggleSelection={prefixedKeyField => {
        console.log('toggle selection', prefixedKeyField);
        /**
         * keyField comes in prefixed with 'select-'
         * solution on github by author is to use the new alpha as he's not supporting v6 anymore
         * */
        const normalisedKeyField = prefixedKeyField.substring(7);

        const newSelection = selectedUsers.includes(normalisedKeyField)
          ? selectedUsers.filter(keyField => keyField !== normalisedKeyField)
          : selectedUsers.concat(normalisedKeyField);
        setSelectedUsers(newSelection);
      }}
      selectType="checkbox"
      data={tableProps.users}
      columns={columns}
      showPagination={false}
    />
  );
};

export default UsersTable;
