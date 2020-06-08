import React from 'react';
import FileTable from './FileTable';
import { PageContainer } from 'uikit/PageLayout';
import NavBar from 'components/NavBar';
import Footer from '../../Footer';
import Head from '../head';
import { PageContent, PageBody, ContentBody } from 'uikit/PageLayout';
import { Row, Col, setConfiguration } from 'react-grid-system';
import { styled } from 'uikit';
import useAuthContext from 'global/hooks/useAuthContext';
import FacetPanel from './FacetPanel';
import FileBarChart from './FileBarChart';
import PrimarySiteBarChart from './PrimarySiteBarChart';
import ProgramBarChart from './ProgramBarChart';
import StatsCard from './StatsCard';

import { FiltersProvider } from './hooks/useFiltersContext';
import QueryBarContainer from './QueryBar/QueryBarContainer';

export const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

const RepositoryPage = ({ subtitle }: { subtitle?: string }) => {
  const { token } = useAuthContext();

  return (
    <FiltersProvider>
      <PageContainer>
        <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
        <NavBar />
        <PageBody sidebarColSize="250px">
          <FacetPanel />
          <PageContent>
            <ContentBody>
              <QueryBarContainer />
              <StatsCard />
              <PaddedRow justify="between">
                <PaddedColumn xl={4} lg={6} md={12}>
                  <FileBarChart />
                </PaddedColumn>
                <PaddedColumn xl={4} lg={6} md={12}>
                  <PrimarySiteBarChart />
                </PaddedColumn>
                <PaddedColumn xl={4} lg={6} md={12}>
                  <ProgramBarChart />
                </PaddedColumn>
              </PaddedRow>
              <PaddedRow>
                <Col xl={12}>
                  <FileTable userLoggedIn={!!token} />
                </Col>
              </PaddedRow>
            </ContentBody>
            <Footer />
          </PageContent>
        </PageBody>
      </PageContainer>
    </FiltersProvider>
  );
};

export default RepositoryPage;
