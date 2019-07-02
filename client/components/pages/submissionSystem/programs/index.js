//@flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { orderBy } from 'lodash';

import Typography from 'uikit/Typography';
import { Input } from 'uikit/form';
import { css } from 'uikit';
import { TableActionBar } from 'uikit/Table';
import Button from 'uikit/Button';
import { INPUT_PRESETS } from 'uikit/form/Input';
import { INPUT_STATES } from 'uikit/theme/defaultTheme/input';
import { ContentBox } from 'uikit/PageLayout';
import ProgramsTable from './ProgramsTable';
import SubmissionLayout from '../layout';
import Link from 'next/link';

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
  const sortedPrograms = orderBy(programs, 'name');
  return (
    <SubmissionLayout
      subtitle="All Programs"
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
          <Link href="/create-program">
            <Button onClick={() => {}}>Create a program</Button>
          </Link>
        </div>
      }
    >
      <ContentBox
        id="programs-list-container"
        css={css`
          padding-top: 0px;
          padding-bottom: 0px;
        `}
      >
        <TableActionBar>
          {programs.length} results
          <TableFilterInput />
        </TableActionBar>
        <ProgramsTable
          loading={loading}
          programs={sortedPrograms}
          onProgramUsersClick={console.log}
          onProgramEditClick={console.log}
        />
      </ContentBox>
    </SubmissionLayout>
  );
};
