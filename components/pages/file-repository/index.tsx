import React from 'react';
import Typography from 'uikit/Typography';
import FileTable from './FileTable';
import { PageContainer } from 'uikit/PageLayout';
import NavBar from 'components/NavBar';
import Footer from '../../Footer';
import Head from '../head';
import { PageContent, PageBody, ContentBody } from 'uikit/PageLayout';
import Container from 'uikit/Container';
import { Row, Col, setConfiguration } from 'react-grid-system';
import Icon from 'uikit/Icon';
import { css, styled } from 'uikit';
import { dummyData } from 'components/pages/file-repository/FileTable/dummyData';
import useAuthContext from 'global/hooks/useAuthContext';
import FacetPanel from './FacetPanel';
import FileBarChart from './FileBarChart';
import DonorBarChart from './DonorBarChart';
import ProgramBarChart from './ProgramBarChart';

const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

export default ({ subtitle }: { subtitle?: string }) => {
  const { token } = useAuthContext();
  return (
    <PageContainer>
      <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
      <NavBar />
      <PageBody>
        <FacetPanel />
        <PageContent>
          <ContentBody>
            <PaddedRow justify="around">
              <Col xl={12}>
                <Container
                  css={css`
                    margin-bottom: 8px;
                    justify-content: start;
                    padding: 2px 10px;
                  `}
                >
                  <Typography>
                    <Icon
                      css={css`
                        vertical-align: middle;
                        margin-right: 10px;
                      `}
                      name="arrow_left"
                    />
                    Search the file repository by selecting filters
                  </Typography>
                </Container>
              </Col>
            </PaddedRow>

            <PaddedRow justify="between">
              <PaddedColumn xl={4} lg={6} md={12}>
                <FileBarChart />
              </PaddedColumn>
              <PaddedColumn xl={4} lg={6} md={12}>
                <DonorBarChart />
              </PaddedColumn>
              <PaddedColumn xl={4} lg={6} md={12}>
                <ProgramBarChart />
              </PaddedColumn>
            </PaddedRow>
            <PaddedRow>
              <Col xl={12}>
                <FileTable fileRepoEntries={dummyData} userLoggedIn={!!token} />
              </Col>
            </PaddedRow>
          </ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};
