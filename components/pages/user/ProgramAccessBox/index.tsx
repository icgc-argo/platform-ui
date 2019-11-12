import * as React from 'react';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import uniq from 'lodash/uniq';
import { css, styled } from 'uikit';
import UikitLink from 'uikit/Link';
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
import Link from 'next/link';
import {
  PROGRAMS_LIST_PATH,
  PROGRAM_DASHBOARD_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import urlJoin from 'url-join';
import { getConfig } from 'global/config';

type T_ProgramTableProgram = {
  shortName: string;
  role: string;
  permissions: string;
};
const ProgramTable = (props: { programs: Array<T_ProgramTableProgram> }) => {
  const { token } = useAuthContext();
  const ProgramNameCell = ({ original }: { original: T_ProgramTableProgram }) => (
    <Link
      href={
        isDccMember(token)
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
  const { token } = useAuthContext();
  const programs = getProgramTableProgramFromEgoJwt(token || '');
  const tableParentProps = React.createRef<HTMLDivElement>();

  const { EGO_API_ROOT } = getConfig();

  React.useEffect(() => {
    const egoApi = urlJoin(EGO_API_ROOT, `/api/groups`);
    fetch(egoApi, {
      headers: { Authorization: `Bearer ${token || ''}` },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        const dacoGroupId = '';
        const cloudGroupId = '';
      })
      .catch(err => {
        console.warn('err: ', err);
      });
  });

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
    </Box>
  );
}
