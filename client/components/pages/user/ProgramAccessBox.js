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
import Icon from 'uikit/Icon';

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
  const programs = getProgramTableProgramFromEgoJwt(token || '');
  return (
    <Box title="Program Access">
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
