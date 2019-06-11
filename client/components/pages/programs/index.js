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
import { mockPrograms } from '../../mockData';
import Table from 'uikit/Table';

import NavBar from 'components/NavBar';
import SideMenu from 'components/SideMenu';
import { css } from 'uikit';
import PercentageBar from 'uikit/PercentageBar';
import ProgramsTable from './ProgramsTable';

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
    <PageContainer>
      <NavBar path={pathname} logOut={logOut} />
      <PageBody>
        <Panel>
          <SideMenu initialShownItem={1} />
        </Panel>
        <PageContent>
          <ContentHeader>
            <Typography
              variant="title"
              color="primary"
              css={css`
                margin: 0px;
              `}
            >
              All Programs
            </Typography>
          </ContentHeader>
          <ContentBody>
            <ContentBox>
              <ProgramsTable programs={programs} />
            </ContentBox>
          </ContentBody>
        </PageContent>
      </PageBody>
      <PageFooter />
    </PageContainer>
  );
};
