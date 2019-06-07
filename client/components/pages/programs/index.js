//@flow
import React from 'react';
import get from 'lodash/get';
//$FlowFixMe
import css from '@emotion/css';
//$FlowFixMe
import styled from '@emotion/styled';

import Typography from 'uikit/Typography';
import Submenu, { MenuItem } from 'uikit/SubMenu';
import { Input } from 'uikit/form';
import NavBar from 'components/NavBar';
import {
  PageContainer,
  Panel,
  PageBody,
  PageContent,
  ContentHeader,
  ContentBody,
  ContentBox,
  PageFooter,
} from 'components/pages/pageLayoutComponents';
import { mockPrograms } from './mockData';
import Table from 'uikit/Table';
import SideMenu from './SideMenu';

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
      <NavBar
        css={css`
          flex: 1;
        `}
        path={pathname}
        logOut={logOut}
      />
      <PageBody>
        <Panel>
          <SideMenu programs={programs} initialShownItem={1} />
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
              <Typography
                css={css`
                  margin: 0px;
                `}
              >
                <Table
                  data={programs}
                  showPagination
                  showPaginationTop
                  showPaginationBottom
                  columns={tableColumns}
                />
              </Typography>
            </ContentBox>
          </ContentBody>
        </PageContent>
      </PageBody>
      <PageFooter />
    </PageContainer>
  );
};
