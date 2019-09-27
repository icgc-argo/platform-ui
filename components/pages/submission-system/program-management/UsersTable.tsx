import useAuthContext from 'global/hooks/useAuthContext';
import { displayDate } from 'global/utils/common';
import React from 'react';
import { css } from 'uikit';
import MailTo from 'uikit/MailTo';
import Table, { TableColumnConfig } from 'uikit/Table';
import InteractiveIcon from 'uikit/Table/InteractiveIcon';
import Tooltip from 'uikit/Tooltip';
import { RoleDisplayName, RoleKey } from '../modals/common';

type StatusKey = 'ACCEPTED' | 'PENDING' | 'EXPIRED';

type UsersTableUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: RoleKey;
  isDacoApproved: boolean | null;
  inviteStatus: StatusKey | null;
  inviteAcceptedAt: Date | null;
};

type CellProps = { original: UsersTableUser };

const APPROVED_DISPLAY_STATUS = 'Approved';
const StatusDisplayName: { [key in StatusKey]: string } = {
  ACCEPTED: APPROVED_DISPLAY_STATUS,
  PENDING: 'Pending Invitation',
  EXPIRED: 'Invitation Expired',
};

const UsersTable = (tableProps: {
  users: Array<UsersTableUser>;
  onUserEditClick: ({ user: UsersTableUser }) => void;
  onUserDeleteClick: ({ user: UsersTableUser }) => void;
  onUserResendInviteClick: ({ user: UsersTableUser }) => void;
  loading: boolean;
}) => {
  const { data: egoTokenData } = useAuthContext();
  const userEmail = egoTokenData ? egoTokenData.context.user.email : '';

  const columns: Array<TableColumnConfig<UsersTableUser>> = [
    {
      Header: 'Name',
      accessor: 'firstName',
      Cell: ({ original: { firstName, lastName } }) => `${firstName} ${lastName}`,
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ original }) =>
        original.email ? <MailTo link={original.email}>{original.email}</MailTo> : '',
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
      accessor: 'inviteStatus',
      Cell: ({ original }) =>
        original.inviteStatus ? StatusDisplayName[original.inviteStatus] : APPROVED_DISPLAY_STATUS,
    },
    {
      Header: 'Joined On',
      accessor: 'inviteAcceptedAt',
      Cell: ({ original }) =>
        original.inviteAcceptedAt ? displayDate(original.inviteAcceptedAt) : '',
    },
    {
      Header: 'Actions',
      sortable: false,
      headerStyle: { display: 'flex', justifyContent: 'center' },
      width: 125,
      Cell: (props: CellProps) => (
        <div
          css={css`
            flex: 1;
            display: flex;
            justify-content: space-around;
          `}
        >
          <Tooltip unmountHTMLWhenHide position="left" html={<span>Resend invitation</span>}>
            <InteractiveIcon
              height="20px"
              width="20px"
              name="mail"
              onClick={() => tableProps.onUserResendInviteClick({ user: props.original })}
              disabled={
                // Disable if:
                // already accepted
                props.original.inviteStatus === 'ACCEPTED' ||
                // OR added without invitation (shows as Accepted)
                props.original.inviteStatus === null ||
                // OR the site user is the user in this row
                userEmail === props.original.email
              }
            />
          </Tooltip>
          <Tooltip unmountHTMLWhenHide position="left" html={<span>Edit user</span>}>
            <InteractiveIcon
              height="20px"
              width="20px"
              name="edit"
              onClick={() => tableProps.onUserEditClick({ user: props.original })}
            />
          </Tooltip>
          <Tooltip unmountHTMLWhenHide position="left" html={<span>Remove user</span>}>
            <InteractiveIcon
              height="20px"
              width="20px"
              name="trash"
              onClick={() => tableProps.onUserDeleteClick({ user: props.original })}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      data={tableProps.users}
      loading={tableProps.loading}
      columns={columns}
      pageSize={Number.MAX_SAFE_INTEGER}
      showPagination={false}
      style={{ maxHeight: '500px' }}
    />
  );
};

export default UsersTable;
