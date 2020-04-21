import React from 'react';
import Typography from 'uikit/Typography';
import FileTable from './FileTable';
import { FileRepositoryRecord } from './FileTable/types';
import { PageContainer, Collapsible } from 'uikit/PageLayout';
import NavBar from 'components/NavBar';
import Footer from '../../Footer';
import Head from '../head';
import { PageContent, PageBody, ContentBody } from 'uikit/PageLayout';
import SimpleBarChart from './SimpleBarChart';
import mockChartData from './SimpleBarChart/mockData';
import { SubMenu } from 'uikit/SubMenu';
import { useTheme } from 'uikit/ThemeProvider';
import Container from 'uikit/Container';
import { Row, Col, setConfiguration } from 'react-grid-system';
import Icon from 'uikit/Icon';
import { css, styled } from 'uikit';
import Facet from 'uikit/Facet';
import { MenuItem } from 'uikit/SubMenu';
import mockFacetData from './mockFacetData';
import { capitalize } from 'global/utils/stringUtils';
import { Input } from 'uikit/form';
import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from 'uikit/Button';
import { ThemeContext } from '@emotion/core';

const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;
setConfiguration({ gutterWidth: 9 });

const PaddedColumn = styled(Col)`
  padding-bottom: 8px;
`;

export const FacetRow = styled('div')`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey_2};
  justify-content: space-between;
`;

export const FacetContainer = styled('div')`
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.pageElement};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 58px);
  max-height: calc(100vh - 58px);
  overflow-y: auto;
`;

// TODO: implement search and upload functionality
const UploadIdsButton = () => {
  const disabled = false;
  return (
    <Button
      id="button-search-id-upload"
      isAsync
      isLoading={false}
      variant={BUTTON_VARIANTS.SECONDARY}
      size={BUTTON_SIZES.SM}
      onClick={() => null}
      disabled={disabled}
    >
      <input
        type="file"
        // ref={ref}
        accept=".tsv"
        onChange={e => null}
        css={css`
          display: none;
        `}
        // {...inputProps}
      />
      <Icon name="upload" height="12px" fill={disabled ? 'white' : 'accent2_dark'} />
      {' Upload a list of ids'}
    </Button>
  );
};

const FacetPanel = ({ theme, facets }) => {
  return (
    <SubMenu>
      <FacetRow>
        <Typography
          css={css`
            font-size: 16px;
            padding-left: 12px;
          `}
          color={theme.colors.primary}
        >
          Filters
        </Typography>
      </FacetRow>
      <FacetRow>
        <MenuItem
          css={css`
            flex: 1;
          `}
          content={'Search Files by ID'}
          chevronOnLeftSide
        >
          <Input
            css={css`
              margin: 8px;
            `}
            icon={<Icon name="search" />}
            aria-label={'Search'}
            placeholder="e.g. FL9998, DO9898..."
          />
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin: 8px;
            `}
          >
            <UploadIdsButton />
          </div>
        </MenuItem>
      </FacetRow>
      {facets.map(type => {
        return (
          <FacetRow key={type}>
            <Facet subMenuName={capitalize(type)} options={mockFacetData[type]} />
          </FacetRow>
        );
      })}
    </SubMenu>
  );
};

export default ({
  token,
  data,
  subtitle,
}: {
  token: string;
  data: FileRepositoryRecord[];
  subtitle?: string;
}) => {
  const { dataTypes } = mockChartData;
  const theme = useTheme();
  return (
    <PageContainer>
      <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
      <NavBar />
      <PageBody>
        <FacetContainer>
          <FacetPanel
            theme={theme}
            facets={[
              'program',
              'primary site',
              'age at diagnosis',
              'vital status',
              'gender',
              'experimental strategy',
              'data type',
            ]}
          />
          <Collapsible />
        </FacetContainer>

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
