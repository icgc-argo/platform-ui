import { PageContainer, PageBody, ContentHeader, PageContent, ContentBody } from 'uikit/PageLayout';
import Head from '../head';
import NavBar from '../../NavBar';
import clsx from 'clsx';
import { FileTitleBar } from './FileTitleBar';
import FileCardsLayout from './FileCardsLayout';
import useEntityData from './useEntityData';
import Footer from '../../Footer';
import React from 'react';
import DnaLoader from 'uikit/DnaLoader';

const FileEntity = ({ fileId }) => {
  const { programShortName, data, loading } = useEntityData({ fileId });

  const isUserLoggedIn = false;

  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
              }}
            >
              <DnaLoader />
            </div>
          ) : (
            <>
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
            </>
          )}
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default FileEntity;
