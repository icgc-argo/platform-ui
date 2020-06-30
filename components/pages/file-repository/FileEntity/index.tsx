import { PageContainer, PageBody, ContentHeader, PageContent, ContentBody } from 'uikit/PageLayout';

import Head from '../../head';
import NavBar from '../../../NavBar';

import clsx from 'clsx';

import Footer from 'uikit/Footer';
import { css } from '@emotion/core';
import TitleBar from 'uikit/TitleBar';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Tooltip from 'uikit/Tooltip';
import styled from '@emotion/styled';
import AssociatedDonors from './AssociatedDonors';
import FileSummary from './FileSummary';
import DataAndAnalysis from './DataAndAnalysis';
import DownstreamAnalysis from './DownstreamAnalysis';

import {
  dummyFileSummaryInfo,
  dummyDataAnalysisInfo,
  dummyAssociatedDonorsInfo,
  dummyFileRecords,
} from './dummyData';

export const DownloadIcon = () => (
  <Icon
    css={css`
      padding-right: 4px;
    `}
    fill="white"
    name="download"
    height="12px"
  />
);

const FileEntity = () => {
  const theme = useTheme();

  /*~~~~~~~ dummy values ~~~~~~~~~ */
  const programShortName = 'BRCA-US';
  const fileId = 'FL9991';
  const isUserLoggedIn = false;

  const PaddedRow = styled(Row)`
    padding-bottom: 8px;
  `;

  const PaddedColumn = styled(Col)`
    padding-bottom: 8px;
  `;

  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar hideLinks />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          <ContentHeader>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: ${theme.colors.primary};
                width: 100%;
              `}
            >
              <div>
                <TitleBar>
                  <div>{programShortName}</div>
                  <div>File: {fileId}</div>
                </TitleBar>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                `}
              >
                <Tooltip
                  disabled={isUserLoggedIn}
                  unmountHTMLWhenHide
                  position="left"
                  interactive
                  html={
                    <div>
                      <span>Please log in to access controlled files</span>
                    </div>
                  }
                >
                  <Button
                    css={css`
                      margin-right: 8px;
                    `}
                    disabled={!isUserLoggedIn}
                  >
                    <DownloadIcon />
                    FILE
                  </Button>
                </Tooltip>

                <Button>
                  <DownloadIcon />
                  MANIFEST
                </Button>
              </div>
            </div>
          </ContentHeader>

          <ContentBody>
            <div
              css={css`
                margin: 0 5%;
              `}
            >
              <PaddedRow>
                <PaddedColumn md={6} sm={12}>
                  <FileSummary data={dummyFileSummaryInfo} />
                </PaddedColumn>
                <PaddedColumn md={6} sm={12}>
                  <DataAndAnalysis data={dummyDataAnalysisInfo} />
                </PaddedColumn>
              </PaddedRow>
              <PaddedRow>
                <PaddedColumn>
                  <AssociatedDonors donors={dummyAssociatedDonorsInfo} />
                </PaddedColumn>
              </PaddedRow>
              <PaddedRow>
                <PaddedColumn>
                  <DownstreamAnalysis data={dummyFileRecords} />
                </PaddedColumn>
              </PaddedRow>
            </div>
          </ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default FileEntity;
