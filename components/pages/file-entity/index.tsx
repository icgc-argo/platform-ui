import { PageContainer, PageBody, ContentHeader, PageContent, ContentBody } from 'uikit/PageLayout';

import Head from '../head';

import NavBar from '../../NavBar';
import Footer from 'uikit/Footer';

import {
  dummyFileSummaryInfo,
  dummyDataAnalysisInfo,
  dummyAssociatedDonorsInfo,
  dummyFileRecords,
} from './dummyData';
import clsx from 'clsx';
import { FileTitleBar } from './FileTitleBar';
import FileCardsLayout from './FileCardsLayout';
import { FileEntityData } from './types';

const FileEntity = () => {
  /*~~~~~~~ dummy values ~~~~~~~~~ */
  const programShortName = 'BRCA-US';
  const fileId = 'FL9991';
  const isUserLoggedIn = false;

  const data: FileEntityData = {
    summary: dummyFileSummaryInfo,
    dataAnalysis: dummyDataAnalysisInfo,
    donorRecords: dummyAssociatedDonorsInfo,
    fileRecords: dummyFileRecords,
  };
  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar hideLinks />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          <ContentHeader>
            <FileTitleBar
              programShortName={programShortName}
              fileId={fileId}
              isUserLoggedIn={isUserLoggedIn}
            />
          </ContentHeader>

          <ContentBody>
            <FileCardsLayout fileData={data} />
          </ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default FileEntity;
