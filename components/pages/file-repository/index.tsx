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
import { useQuery } from '@apollo/react-hooks';
import FILE_REPOSITORY_TABLE_QUERY from './FILE_REPOSITORY_TABLE_QUERY.gql';

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
  const { data, loading } = useQuery<any, any>(FILE_REPOSITORY_TABLE_QUERY, {
    variables: {
      first: 20,
      offset: 0,
      filters: {
        op: 'and',
        content: [],
      },
    },
  });

  const tableData = data.file.hits.edges.map(({ node }) => ({
    fileID: node.file.file_id,
    donorID: node.donors.hits.edges[0].node.donor_id,
    program: { shortName: node.study_id, fullName: node.study_id },
    dataType: node.data_type,
    strategy: node.analysis.experiment.library_strategy,
    format: node.file_type,
    size: node.file.size, //in bytes
    isDownloadable: false, // mocked, column will be temporarily hidden in https://github.com/icgc-argo/platform-ui/issues/1553
  }));

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
                  <FileTable
                    fileRepoEntries={tableData}
                    userLoggedIn={!!token}
                    isLoading={loading}
                  />
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
