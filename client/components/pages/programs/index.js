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
import NavBar from 'components/NavBar';
import SideMenu from 'components/SideMenu';
import { css } from 'uikit';
import Table, { TableActionBar } from 'uikit/Table';
import Button from 'uikit/Button';
import PercentageBar from 'uikit/PercentageBar';
import { INPUT_PRESETS } from 'uikit/form/Input';
import { INPUT_STATES } from 'uikit/theme/defaultTheme/input';
import ProgramsTable from './ProgramsTable';
import { mockPrograms } from '../../mockData';
import SubmissionLayout from '../../layouts/submission';

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
  programs = mockPrograms,
}: any) => {
  return (
    <SubmissionLayout
      navBar={<NavBar path={pathname} logOut={logOut} />}
      sideMenu={<SideMenu initialShownItem={1} />}
      headerTitle="All Programs"
      headerButton={<Button onClick={console.log}>Create a program</Button>}
    >
      <TableActionBar>
        {pathname.length} results
        <TableFilterInput />
      </TableActionBar>
      <ProgramsTable
        programs={programs}
        onProgramUsersClick={console.log}
        onProgramEditClick={console.log}
      />
    </SubmissionLayout>
  );
};
