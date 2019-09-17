
import {
  CREATE_PROGRAM_PAGE_PATH,
  PROGRAM_MANAGE_PATH,
  PROGRAM_SHORT_NAME_PATH,
} from 'global/constants/pages';
import useAuthContext from 'global/hooks/useAuthContext';
import { isDccMember } from 'global/utils/egoJwt';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { css } from 'uikit';
import Button from 'uikit/Button';
import { Input } from 'uikit/form';
import { INPUT_PRESETS } from 'uikit/form/Input';
import { ContentBox } from 'uikit/PageLayout';
import { TableActionBar } from 'uikit/Table';
import { INPUT_STATES } from 'uikit/theme/defaultTheme/input';
import Typography from 'uikit/Typography';
import SubmissionLayout from '../layout';
import ProgramsTable from './ProgramsTable';
import PROGRAMS_LIST_QUERY from './PROGRAMS_LIST_QUERY.gql';
import PROGRAMS_USERS_QUERY from './PROGRAMS_USERS_QUERY.gql';
import DnaLoader from 'uikit/DnaLoader';
import get from 'lodash/get';

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

export default function Programs({ authorizedPrograms = [] }: any) {
  const { data: { programs = [] } = {}, loading, errors } = useQuery(PROGRAMS_LIST_QUERY);
  const { data: { programs: programsWithUsers = [] } = {}, loading: loadingUser } = useQuery(
    PROGRAMS_USERS_QUERY,
  );

  if (programsWithUsers.length > 0) {
    programs.forEach(p => {
      const users = get(programsWithUsers.find(pp => p.shortName == pp.shortName), 'users', []);
      p.administrators = filter(users, { role: 'ADMIN' });
    });
  }

  const authContext = useAuthContext() || {};
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
      contentHeader={
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
          `}
        >
          <Typography
            as="h1"
            variant="title"
            color="primary"
            css={css`
              margin: 0px;
            `}
          >
            All Programs
          </Typography>
          {authContext.token && isDccMember(authContext.token) && (
            <Link href={CREATE_PROGRAM_PAGE_PATH}>
              <Button id="primary-action-create-program">Create a program</Button>
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
        <TableActionBar>
          {programs.length} results
          {/*   <TableFilterInput /> */}
        </TableActionBar>
        <ProgramsTable
          loading={loading}
          loadingUser={loadingUser}
          programs={sortedPrograms}
          onProgramUsersClick={handleProgramUsersClick}
          onProgramEditClick={handleProgramProfileClick}
        />
      </ContentBox>
    </SubmissionLayout>
  );
}
