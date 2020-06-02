/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
  const { data: { programs = [] } = {}, loading } = useQuery(PROGRAMS_LIST_QUERY);
  const { data: { programs: programsWithUsers = [] } = {}, loading: loadingUser } = useQuery(
    PROGRAMS_USERS_QUERY,
  );

  if (programsWithUsers.length > 0) {
    programs.forEach(p => {
      const users = get(programsWithUsers.find(pp => p.shortName == pp.shortName), 'users', []);
      p.administrators = filter(users, { role: 'ADMIN' });
    });
  }

  const { token, permissions } = useAuthContext();
  const canCreate = React.useMemo(() => token && isDccMember(permissions), [token]);
  const sortedPrograms = orderBy(programs, 'name');
  const router = useRouter();
  const handleProgramUsersClick = ({ program }) => {
    router.push({
      pathname: PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, program.shortName),
      query: { activeTab: 'users' },
    });
  };
  const handleProgramProfileClick = ({ program }) => {
    router.push({
      pathname: PROGRAM_MANAGE_PATH.replace(PROGRAM_SHORT_NAME_PATH, program.shortName),
      query: { activeTab: 'profile' },
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
          {canCreate && (
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
          min-height: 300px;
        `}
        loading={loading}
      >
        <TableActionBar>
          {programs.length} results
          {/*   <TableFilterInput /> */}
        </TableActionBar>
        <ProgramsTable
          loading={loading}
          LoadingComponent={() => null}
          loadingUser={loadingUser}
          programs={sortedPrograms}
          onProgramUsersClick={handleProgramUsersClick}
          onProgramEditClick={handleProgramProfileClick}
        />
      </ContentBox>
    </SubmissionLayout>
  );
}
