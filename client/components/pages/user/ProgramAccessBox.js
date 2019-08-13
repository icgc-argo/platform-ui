//@flow
import * as React from 'react';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { css, styled } from 'uikit';
import Link from 'uikit/Link';
import AccessTokenBox from './AccessTokenBox';
import { Box } from './common';
import Table, { DefaultLoadingComponent } from 'uikit/Table';
import useAuthContext from 'global/hooks/useAuthContext';
import { isDccMember, getReadableProgramShortNames, canWriteProgram } from 'global/utils/egoJwt';
import Icon from 'uikit/Icon';
import USER_PROGRAM_LIST_QUERY from './USER_PROGRAM_LIST_QUERY.gql';

type T_ProgramTableProgram = $Exact<{
  shortName: string,
  role: string,
  permissions: string,
}>;
const ProgramTable = (props: { programs: Array<T_ProgramTableProgram>, loading: boolean }) => (
  <Table
    sortable={false}
    showPagination={false}
    data={props.programs}
    loading={props.loading}
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
  const readableProgramScopes = getReadableProgramShortNames(egoJwt || '');
  const output = readableProgramScopes.map(shortName => {
    const role = canWriteProgram({ egoJwt, programId: shortName })
      ? PROGRAM_USER_ROLES_DISPLAY.PROGRAM_ADMIN
      : '';
    return {
      shortName,
      role,
      permissions: 'Submit Data, Download Data, Manage Users',
    };
  });
  return output;
};

const DacoAccessStatusDisplay = ({ approved }: { approved: boolean }) => {
  /** @description: making these components so it's easier to extract out later if needs arises */
  const Container = styled('div')`
    display: flex;
    border: solid 1px ${({ theme }) => theme.colors.grey_2};
    padding: 8px;
    border-radius: 8px;
    & > :not(:last-child) {
      border-right: solid 1px ${({ theme }) => theme.colors.grey_2};
    }
  `;
  Container.Section = styled('div')`
    display: flex;
    align-items: center;
    &:not(:first-child) {
      padding-left: 8px;
      padding-right: 8px;
    }
    &:first-child {
      padding-right: 8px;
    }
    &:last-child {
      padding-left: 8px;
    }
  `;
  return (
    <Container>
      <Container.Section>
        <div
          css={css`
            margin-right: 8px;
            flex: 1;
            display: flex;
            align-items: center;
          `}
        >
          {approved ? (
            <Icon name="success" fill="success" height="30px" />
          ) : (
            <Icon name="times_circle" fill="error" height="30px" />
          )}
        </div>
        {approved ? (
          <Typography variant="data" color="success_dark">
            DACO <br />
            Approved
          </Typography>
        ) : (
          <Typography variant="data" color="error_dark">
            Not DACO <br />
            Approved
          </Typography>
        )}
      </Container.Section>
      <Container.Section>
        {approved ? (
          <Typography variant="label" component="div">
            You have access to download controlled data.{' '}
            <Link withChevron underline={false}>
              VIEW FILES
            </Link>
          </Typography>
        ) : (
          <Typography variant="label" component="div">
            To download controlled data, <Link>apply for DACO access.</Link>
          </Typography>
        )}
      </Container.Section>
    </Container>
  );
};

export default function ProgramAccessBox() {
  const { token } = useAuthContext() || {};
  const { data, loading: loadingPrograms, error } = useQuery(USER_PROGRAM_LIST_QUERY);
  let programs: T_ProgramTableProgram[];
  const isDcc = isDccMember(token);
  if (isDcc) {
    programs = loadingPrograms
      ? []
      : data.programs.map(
          ({ shortName }) =>
            ({
              shortName,
              role: PROGRAM_USER_ROLES_DISPLAY.DCC,
              permissions: PROGRAM_USER_PERMISSIONS_DISPLAY.DCC,
            }: T_ProgramTableProgram),
        );
  } else {
    programs = getProgramTableProgramFromEgoJwt(token || '');
  }

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
        <ProgramTable programs={programs} loading={loadingPrograms && isDcc} />
      </div>
    </Box>
  );
}
