/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { css, Icon, Link, Table, TableV8, Typography } from '@icgc-argo/uikit';
import {
  PROGRAMS_LIST_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import useAuthContext from 'global/hooks/useAuthContext';
import {
  canReadProgramData,
  canWriteProgram,
  canWriteProgramData,
  getProgramMembershipAccessLevel,
  isDccMember,
} from 'global/utils/egoJwt';
import { capitalize } from 'lodash';
import NextLink from 'next/link';
import { createRef } from 'react';

import { Box } from '../common';
import DacoAccessStatusDisplay, { NoMemberAccess } from './DacoAccessStatusDisplay';
import { getConfig } from 'global/config';

const { FEATURE_REACT_TABLE_V8_ENABLED } = getConfig();

type T_ProgramTableProgram = {
  shortName: string;
  role: string;
  permissions: string;
  membershipType?: string;
};

interface Column {
  Header: string;
  accessor: string;
  maxWidth?: number;
  Cell?: any;
}

const ProgramTable = (props: { programs: Array<T_ProgramTableProgram> }) => {
  const { permissions } = useAuthContext();

  const ProgramNameCell = ({ original }: { original: T_ProgramTableProgram }) => (
    <NextLink
      href={
        isDccMember(permissions)
          ? PROGRAMS_LIST_PATH
          : PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, original.shortName)
      }
    >
      <Link>{original.shortName}</Link>
    </NextLink>
  );

  const containerRef = createRef<HTMLDivElement>();

  // react table v6
  const baseColumns: Column[] = [
    {
      Header: 'Program Name',
      accessor: 'shortName',
      maxWidth: 150,
      Cell: ProgramNameCell,
    },
    { Header: 'Role', accessor: 'role', maxWidth: 170 },
    { Header: 'Permissions', accessor: 'permissions' },
  ];

  const tableColumns_legacy = !isDccMember(permissions)
    ? [
        ...baseColumns.slice(0, 1),
        {
          Header: 'Membership Type',
          accessor: 'membershipType',
          Cell: (props) => capitalize(props.value),
        },
        ...baseColumns.slice(1),
      ]
    : baseColumns;

  // react table v8
  const tableColumns = [
    {
      accessorKey: 'shortName',
      cell: (info) => (
        <NextLink
          href={
            !isDccMember(permissions)
              ? PROGRAMS_LIST_PATH
              : PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, info.getValue())
          }
        >
          <Link>{info.getValue()}</Link>
        </NextLink>
      ),
      header: () => 'Program Name',
      id: 'shortName',
      // maxWidth: 150,
    },
    ...(isDccMember
      ? []
      : [
          {
            accessorKey: 'membershipType',
            cell: (info) => capitalize(info.renderValue()),
            header: () => 'Membership Type',
          },
        ]),
    {
      accessorKey: 'role',
      header: () => 'Role',
      id: 'role',
      // maxWidth: 170
    },
    { accessorKey: 'permissions', header: () => 'Permissions', id: 'permissions' },
  ];

  return (
    <div
      css={css`
        width: 100%;
      `}
      ref={containerRef}
    >
      {FEATURE_REACT_TABLE_V8_ENABLED ? (
        <TableV8
          columns={tableColumns}
          data={props.programs}
          withHeaders
          withSideBorders
          withResize
          withRowHighlight
          withStripes
        />
      ) : (
        <Table
          withOutsideBorder
          parentRef={containerRef}
          sortable={false}
          showPagination={false}
          data={props.programs}
          columns={tableColumns_legacy}
          getTdProps={(_, row, column) => ({ style: { whiteSpace: 'normal' } })}
        />
      )}
    </div>
  );
};

const PROGRAM_USER_ROLES_DISPLAY = {
  DCC: 'DCC Admin',
  PROGRAM_ADMIN: 'Program Admin',
  SUBMITTER: 'Data Submitter',
  COLLABORATOR: 'Collaborator',
};

const PROGRAM_USER_PERMISSIONS_DISPLAY = {
  DCC: 'Manage Programs, Submit Data, Download Data',
  PROGRAM_ADMIN: 'Submit Data, Download Data, Manage Users',
  SUBMITTER: 'Submit Data, Download Data',
  COLLABORATOR: 'Download Data',
};

const MEMBERSHIP_DISPLAY_NAME = {
  ASSOCIATE_PROGRAM_MEMBER: 'Associate Membership',
  FULL_PROGRAM_MEMBER: 'Full Membership',
  DCC_MEMBER: 'Full Membership',
};

const getProgramTableProgramFromEgoJwt = (
  permissions: string[],
  readablePrograms,
): T_ProgramTableProgram[] => {
  if (isDccMember(permissions)) {
    return [
      {
        shortName: 'All Programs',
        role: PROGRAM_USER_ROLES_DISPLAY.DCC,
        permissions: PROGRAM_USER_PERMISSIONS_DISPLAY.DCC,
      },
    ];
  } else {
    return readablePrograms.map(({ shortName, membershipType }) => {
      let role: string = '';
      let displayPermissions: string = '';

      if (canWriteProgram({ permissions, programId: shortName })) {
        role = PROGRAM_USER_ROLES_DISPLAY.PROGRAM_ADMIN;
        displayPermissions = PROGRAM_USER_PERMISSIONS_DISPLAY.PROGRAM_ADMIN;
      } else if (canWriteProgramData({ permissions, programId: shortName })) {
        role = PROGRAM_USER_ROLES_DISPLAY.SUBMITTER;
        displayPermissions = PROGRAM_USER_PERMISSIONS_DISPLAY.SUBMITTER;
      } else if (canReadProgramData({ permissions, programId: shortName })) {
        role = PROGRAM_USER_ROLES_DISPLAY.COLLABORATOR;
        displayPermissions = PROGRAM_USER_PERMISSIONS_DISPLAY.COLLABORATOR;
      }
      return {
        shortName,
        role,
        permissions: displayPermissions,
        membershipType,
      };
    });
  }
};

const ProgramAccessBox = ({
  isDacoApproved,
  readablePrograms,
  loading,
}: {
  isDacoApproved: boolean;
  readablePrograms: Array<{ shortName: string; membershipType: string }>;
  loading: boolean;
}) => {
  const { permissions } = useAuthContext();
  const programs =
    !loading && getProgramTableProgramFromEgoJwt(permissions || [], readablePrograms);

  return (
    <Box
      title="Program Access"
      iconName="programs"
      tag={
        !loading &&
        !isDccMember(permissions) &&
        MEMBERSHIP_DISPLAY_NAME[getProgramMembershipAccessLevel(permissions)]
      }
    >
      {loading ? (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          `}
        >
          <Icon name="spinner" height="13px" />
        </div>
      ) : (
        <div>
          <div
            css={css`
              margin-top: 14px;
            `}
          >
            <DacoAccessStatusDisplay approved={isDacoApproved} />
          </div>
          <Typography variant="subtitle2" color="secondary">
            My Memberships
          </Typography>
          {programs.length > 0 ? (
            <ProgramTable programs={programs} />
          ) : (
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <NoMemberAccess />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default ProgramAccessBox;
