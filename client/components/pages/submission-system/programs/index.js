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
import { useRouter } from 'next/router';
import {
  CREATE_PROGRAM_PAGE_PATH,
  PROGRAM_SHORT_NAME_PATH,
  PROGRAM_MANAGE_PATH,
} from 'global/constants/pages';
import { isDccMember } from 'global/utils/egoJwt';
import PROGRAM_LIST_QUERY from './queries.gql';

export default ({
  egoJwt,
  firstName,
  lastName,
  authorizedPrograms = [],
  logOut,
  pathname,
}: any) => {
  const { data: { programs = [] } = {}, loading, errors } = useQuery(PROGRAM_LIST_QUERY);
  const sortedPrograms = orderBy(programs, 'name');
  const router = useRouter();
  const handleProgramUsersClick = ({ program }) => {
    router.push({
      pathname: PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, program.shortName),
      query: { tab: 'users' },
    });
  };
  const handleProgramProfileClick = ({ program }) => {
    router.push({
      pathname: PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, program.shortName),
      query: { tab: 'profile' },
    });
  };
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
          {isDccMember(egoJwt) && (
            <Link href={CREATE_PROGRAM_PAGE_PATH}>
              <Button>Create a program</Button>
            </Link>
          )}
        </div>
      }
    >
      <ContentBox
        id="programs-list-container"
        css={css`
          padding-top: 0px;
        `}
      >
        <TableActionBar>{programs.length} results</TableActionBar>
        <ProgramsTable
          loading={loading}
          programs={sortedPrograms}
          onProgramUsersClick={handleProgramUsersClick}
          onProgramEditClick={handleProgramProfileClick}
        />
      </ContentBox>
    </SubmissionLayout>
  );
};
