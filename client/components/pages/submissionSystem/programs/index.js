//@flow
import React from 'react';

import Typography from 'uikit/Typography';
import { Input } from 'uikit/form';
import { css } from 'uikit';
import { TableActionBar } from 'uikit/Table';
import Button from 'uikit/Button';
import { INPUT_PRESETS } from 'uikit/form/Input';
import { INPUT_STATES } from 'uikit/theme/defaultTheme/input';
import ProgramsTable from './ProgramsTable';
import SubmissionLayout from '../layout';
import { useQuery } from 'react-apollo-hooks';

import { ContentBox } from 'uikit/PageLayout';

// $FlowFixMe .gql file not supported
import { programsListQuery } from './queries.gql';

const TableFilterInput = props => (
  <Input
    aria-label="tableFilter"
    preset={INPUT_PRESETS.SEARCH}
    getOverrideCss={({ theme, inputState }) =>
      inputState === INPUT_STATES.default
        ? css`
            border-color: ${theme.colors.grey_2};
          `
        : ''
    }
    {...props}
  />
);

export default ({
  egoJwt,
  firstName,
  lastName,
  authorizedPrograms = [],
  logOut,
  pathname,
}: any) => {
  const { data: { programs = [] } = {}, loading, errors } = useQuery(programsListQuery);
  return (
    <SubmissionLayout
      pathname={pathname}
      logOut={logOut}
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <Typography
            variant="title"
            color="primary"
            css={css`
              margin: 0px;
            `}
          >
            All Programs
          </Typography>
          <Button onClick={console.log}>Create a program</Button>
        </div>
      }
    >
      <ContentBox
        css={css`
          padding-top: 0px;
        `}
      >
        <TableActionBar>
          {programs.length} results
          <TableFilterInput />
        </TableActionBar>
        <ProgramsTable
          loading={loading}
          programs={programs}
          onProgramUsersClick={console.log}
          onProgramEditClick={console.log}
        />
      </ContentBox>
    </SubmissionLayout>
  );
};
