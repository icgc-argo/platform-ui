import React from 'react';
import Typography from 'uikit/dist/uikit/Typography';
import FileTable from './FileTable';
import { FileRepositoryRecord } from './FileTable/types';
import { PageContainer } from 'uikit/PageLayout';
import NavBar from 'components/NavBar';
import Footer from '../../Footer';
import Head from '../head';
import { PageContent, PageBody, ContentBody } from 'uikit/dist/uikit/PageLayout';
import SimpleBarChart, { FileRepoDataType } from './SimpleBarChart';
import mockData from './SimpleBarChart/mockData';
import { SubMenu } from 'uikit/SubMenu';
import { useTheme } from 'uikit/dist/uikit/ThemeProvider';
import Container from 'uikit/Container';
import { Row, Col, setConfiguration } from 'react-grid-system';
import Icon from 'uikit/Icon';
import { css, styled } from 'uikit';

const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

export default ({
  token,
  data,
  subtitle,
}: {
  token: string;
  data: FileRepositoryRecord[];
  subtitle?: string;
}) => {
  const { primarySiteData, fileTypeData, programData, dataTypes } = mockData;
  const theme = useTheme();
  return (
    <PageContainer>
      <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
      <NavBar />
      <PageBody>
        <SubMenu>
          <Typography color={theme.colors.primary}>Filters</Typography>
        </SubMenu>
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
                <SimpleBarChart
                  data={dataTypes['data type']}
                  type={'data type'}
                  totalDataSize={`${dataTypes['data type'].reduce(
                    (acc, item) => item.count + acc,
                    0,
                  )}`}
                  totalCount={dataTypes['data type'].length}
                />
              </PaddedColumn>
              <PaddedColumn xl={4} lg={6} md={12}>
                <SimpleBarChart
                  data={dataTypes['primary site']}
                  type={'primary site'}
                  totalDataSize={`${dataTypes['primary site'].reduce(
                    (acc, item) => item.count + acc,
                    0,
                  )}`}
                  totalCount={dataTypes['primary site'].length}
                />
              </PaddedColumn>
              <PaddedColumn xl={4} lg={6} md={12}>
                <SimpleBarChart
                  data={dataTypes['program']}
                  type={'program'}
                  totalCount={dataTypes['program'].length}
                />
              </PaddedColumn>
            </PaddedRow>
            <PaddedRow>
              <Col xl={12}>
                <FileTable fileRepoEntries={data} userLoggedIn={!!token} />
              </Col>
            </PaddedRow>
          </ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};
