//@flow
import React from 'react';

import Table from 'uikit/Table';

// TODO: These might be declared somewhere already
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

const RoleDisplayName: { [key: RoleKey]: string } = {
  ADMINISTRATOR: 'Administrator',
  DATA_SUBMITTER: 'Data Submitter',
  COLLABORATOR: 'Collaborator',
};

const StatusDisplayName: { [key: StatusKey]: string } = {
  APPROVED: 'Approved',
  PENDING_INVITATION: 'Pending Invitation',
};

const UsersTable = (tableProps: {}) => {};

export default UsersTable;
