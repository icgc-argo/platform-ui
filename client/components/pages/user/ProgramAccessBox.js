//@flow
import * as React from 'react';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css, styled } from 'uikit';
import Link from 'uikit/Link';
import AccessTokenBox from './AccessTokenBox';
import { Box } from './common';
import Table from 'uikit/Table';
import useAuthContext from 'global/hooks/useAuthContext';
import { getAuthorizedProgramScopes } from 'global/utils/egoJwt';

type T_ProgramTableProgram = { shortName: string, role: string, permissions: Array<string> };
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

const getProgramTableProgramFromEgoJwt = (egoJwt: string): T_ProgramTableProgram[] => {
  const readableProgramScopes = getAuthorizedProgramScopes(egoJwt || '');
  return [
    {
      shortName: 'PACA-AU',
      role: 'Program Administrator',
      permissions: ['Submit Data, Download Data, Manage Users'],
    },
    {
      shortName: 'PACA-ER',
      role: 'Program Administrator',
      permissions: ['Submit Data, Download Data, Manage Users'],
    },
    {
      shortName: 'PACA-GB',
      role: 'Program Administrator',
      permissions: ['Submit Data, Download Data, Manage Users'],
    },
    {
      shortName: 'PACA-CA',
      role: 'Program Administrator',
      permissions: ['Submit Data, Download Data, Manage Users'],
    },
  ];
};

export default function ProgramAccessBox() {
  const { token } = useAuthContext() || {};

  const programs = getProgramTableProgramFromEgoJwt(token || '');

  return (
    <Box title="Program Access">
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
