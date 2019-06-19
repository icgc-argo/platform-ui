//@flow
import React from 'react';
import get from 'lodash/get';

import Typography from 'uikit/Typography';
import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import {
  PageContainer,
  Panel,
  PageBody,
  PageContent,
  ContentHeader,
  ContentBody,
  ContentBox,
  PageFooter,
} from 'uikit/PageLayout';
import { css } from 'uikit';
import Table, { TableActionBar } from 'uikit/Table';
import Button from 'uikit/Button';
import PercentageBar from 'uikit/PercentageBar';
import { INPUT_PRESETS } from 'uikit/form/Input';
import { INPUT_STATES } from 'uikit/theme/defaultTheme/input';
import ProgramsTable from './ProgramsTable';
import { mockPrograms } from '../mockData';
import SubmissionLayout from '../layout';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { programsQuery } from './queries';

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
  const { data, loading, errors } = useQuery(programsQuery);
  const { programs = [] } = data;
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
