/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import useAuthContext from 'global/hooks/useAuthContext';
import { displayDate } from 'global/utils/common';
import React from 'react';
import { css } from 'uikit';
import MailTo from 'uikit/MailTo';
import Table, { TableColumnConfig } from 'uikit/Table';
import InteractiveIcon from 'uikit/Icon/InteractiveIcon';
import { RoleDisplayName, RoleKey } from '../modals/common';
import { adminRestrictionText } from './Users';

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
  isOnlyOneAdminLeft: boolean;
}) => {
  const { data: egoTokenData } = useAuthContext();
  const userEmail = egoTokenData ? egoTokenData.context.user.email : '';
  const isUserThemselves = (user: UsersTableUser) => user.email === userEmail;
  const isUserTheLastAdmin = (user: UsersTableUser) =>
    tableProps.isOnlyOneAdminLeft && user.role === 'ADMIN';
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
          <InteractiveIcon
            position="left"
            html={<span>Resend invitation</span>}
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
              isUserThemselves(props.original)
            }
          ></InteractiveIcon>
          <InteractiveIcon
            disabled={false}
            html={<span>Edit User</span>}
            position="left"
            height="20px"
            width="20px"
            name="edit"
            onClick={() => tableProps.onUserEditClick({ user: props.original })}
          />
          <InteractiveIcon
            unmountHTMLWhenHide
            position="left"
            html={
              <span>
                {isUserTheLastAdmin(props.original) ? adminRestrictionText : 'Remove User'}
              </span>
            }
            disabled={isUserTheLastAdmin(props.original) || isUserThemselves(props.original)}
            height="20px"
            width="20px"
            name="trash"
            onClick={() => tableProps.onUserDeleteClick({ user: props.original })}
          />
        </div>
      ),
    },
  ];
  const containerRef = React.createRef<HTMLDivElement>();

  return (
    <div
      css={css`
        width: 100%;
      `}
      ref={containerRef}
    >
      <Table
        parentRef={containerRef}
        data={tableProps.users}
        loading={tableProps.loading}
        columns={columns}
        pageSize={Number.MAX_SAFE_INTEGER}
        showPagination={false}
        style={{ maxHeight: '500px' }}
      />
    </div>
  );
};

export default UsersTable;
