import * as React from 'react';
import Typography from 'uikit/Typography';
import uniq from 'lodash/uniq';
import { css } from 'uikit';
import UikitLink from 'uikit/Link';
import { Box } from '../common';
import Table from 'uikit/Table';
import useAuthContext from 'global/hooks/useAuthContext';
import {
  isDccMember,
  getReadableProgramShortNames,
  getReadableProgramDataNames,
  canWriteProgram,
  canWriteProgramData,
  canReadProgramData,
  getPermissionsFromToken,
  getAuthorizedProgramScopes,
} from 'global/utils/egoJwt';
import DacoAccessStatusDisplay from './DacoAccessStatusDisplay';
import Link from 'next/link';
import {
  PROGRAMS_LIST_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import Icon from 'uikit/Icon';

type T_ProgramTableProgram = {
  shortName: string;
  role: string;
  permissions: string;
};
const ProgramTable = (props: { programs: Array<T_ProgramTableProgram> }) => {
  const { token, permissions } = useAuthContext();
  const ProgramNameCell = ({ original }: { original: T_ProgramTableProgram }) => (
    <Link
      href={
        isDccMember(permissions)
          ? PROGRAMS_LIST_PATH
          : PROGRAM_DASHBOARD_PATH.replace(PROGRAM_SHORT_NAME_PATH, original.shortName)
      }
    >
      <UikitLink>{original.shortName}</UikitLink>
    </Link>
  );
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
        sortable={false}
        showPagination={false}
        data={props.programs}
        columns={[
          {
            Header: 'Program Name',
            accessor: 'shortName',
            maxWidth: 150,
            Cell: ProgramNameCell,
          },
          { Header: 'Role', accessor: 'role', maxWidth: 170 },
          { Header: 'Permissions', accessor: 'permissions' },
        ]}
      />
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

const getProgramTableProgramFromEgoJwt = (permissions: string[]): T_ProgramTableProgram[] => {
  if (isDccMember(permissions)) {
    return [
      {
        shortName: 'All Programs',
        role: PROGRAM_USER_ROLES_DISPLAY.DCC,
        permissions: PROGRAM_USER_PERMISSIONS_DISPLAY.DCC,
      },
    ];
  } else {
    const scopes = getAuthorizedProgramScopes(permissions);

    const readableProgramShortNames = getReadableProgramShortNames(scopes);
    const readableProgramDataShortNames = getReadableProgramDataNames(permissions);
    return uniq([...readableProgramShortNames, ...readableProgramDataShortNames]).map(shortName => {
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
      };
    });
  }
};

const ProgramAccessBox = ({
  isDacoApproved,
  loading,
}: {
  isDacoApproved: boolean;
  loading: boolean;
}) => {
  const { token, permissions } = useAuthContext();
  const programs = getProgramTableProgramFromEgoJwt(permissions || []);

  return (
    <Box title="Program Access" iconName="programs">
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
          <div>
            <Typography variant="subtitle2" color="secondary">
              My Memberships
            </Typography>
          </div>
          <div>
            {programs.length > 0 ? (
              <ProgramTable programs={programs} />
            ) : (
              <div
                css={css`
                  margin-top: 10px;
                `}
              >
                <Typography variant="label" component="div">
                  No program memberships. You are not submitting data to any programs.
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default ProgramAccessBox;
