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

export default ({
  egoJwt,
  firstName,
  lastName,
  authorizedPrograms = [],
  logOut,
  pathname,
  programs = mockPrograms,
}: any) => {
  const tableColumns = [
    {
      Header: 'Program Name',
      accessor: 'name',
    },
    {
      Header: 'Short Name',
      accessor: 'shortName',
    },
    {
      Header: 'Country',
      accessor: 'countries',
    },
    {
      Header: 'Memebership',
      accessor: 'membershipType',
    },
  ];

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
              <Table
                data={programs}
                showPagination
                showPaginationTop
                showPaginationBottom
                columns={tableColumns}
              />
            </ContentBox>
          </ContentBody>
        </PageContent>
      </PageBody>
      <PageFooter />
    </PageContainer>
  );
};
