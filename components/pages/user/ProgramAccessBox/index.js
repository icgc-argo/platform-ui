//@flow
import * as React from 'react';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import uniq from 'lodash/uniq';
import { css, styled } from 'uikit';
import Link from 'uikit/Link';
import AccessTokenBox from '../AccessTokenBox';
import { Box } from '../common';
import Table, { DefaultLoadingComponent } from 'uikit/Table';
import useAuthContext from 'global/hooks/useAuthContext';
import {
  isDccMember,
  getReadableProgramShortNames,
  getReadableProgramDataNames,
  canWriteProgram,
  canWriteProgramData,
  canReadProgramData,
} from 'global/utils/egoJwt';
import Icon from 'uikit/Icon';
import DacoAccessStatusDisplay from './DacoAccessStatusDisplay';

type T_ProgramTableProgram = $Exact<{
  shortName: string,
  role: string,
  permissions: string,
}>;
const ProgramTable = (props: { programs: Array<T_ProgramTableProgram> }) => (
  <Table
    sortable={false}
    showPagination={false}
    data={props.programs}
    columns={
      ([
        { Header: 'Program Name', accessor: 'shortName', maxWidth: 150 },
        { Header: 'Role', accessor: 'role', maxWidth: 170 },
        { Header: 'Permissions', accessor: 'permissions' },
      ]: Array<{ accessor: $Keys<T_ProgramTableProgram> }>)
    }
  />
);

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

const getProgramTableProgramFromEgoJwt = (egoJwt: string): T_ProgramTableProgram[] => {
  if (isDccMember(egoJwt)) {
    return [
      {
        shortName: 'All Programs',
        role: PROGRAM_USER_ROLES_DISPLAY.DCC,
        permissions: PROGRAM_USER_PERMISSIONS_DISPLAY.DCC,
      },
    ];
  } else {
    const readableProgramShortNames = getReadableProgramShortNames(egoJwt);
    const readableProgramDataShortNames = getReadableProgramDataNames(egoJwt);
    return uniq([...readableProgramShortNames, ...readableProgramDataShortNames]).map(shortName => {
      let role: string = '';
      let permissions: string = '';
      if (canWriteProgram({ egoJwt, programId: shortName })) {
        role = PROGRAM_USER_ROLES_DISPLAY.PROGRAM_ADMIN;
        permissions = PROGRAM_USER_PERMISSIONS_DISPLAY.PROGRAM_ADMIN;
      } else if (canWriteProgramData({ egoJwt, programId: shortName })) {
        role = PROGRAM_USER_ROLES_DISPLAY.SUBMITTER;
        permissions = PROGRAM_USER_PERMISSIONS_DISPLAY.SUBMITTER;
      } else if (canReadProgramData({ egoJwt, programId: shortName })) {
        role = PROGRAM_USER_ROLES_DISPLAY.COLLABORATOR;
        permissions = PROGRAM_USER_PERMISSIONS_DISPLAY.COLLABORATOR;
      }
      return {
        shortName,
        role,
        permissions,
      };
    });
  }
};

export default function ProgramAccessBox() {
  const { token } = useAuthContext() || {};
  let programs = getProgramTableProgramFromEgoJwt(token || '');

  return (
    <Box title="Program Access" iconName="programs">
      <div
        css={css`
          margin-top: 14px;
        `}
      >
        <DacoAccessStatusDisplay approved={true} />
      </div>
      <div>
        <Typography variant="subtitle2" color="secondary">
          My Memberships
        </Typography>
      </div>
      <div>
        <ProgramTable programs={programs} />
      </div>
    </Box>
  );
}
