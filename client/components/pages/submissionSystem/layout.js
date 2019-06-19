import React from 'react';
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
import css from '@emotion/css';
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';

const SubmissionLayout = ({ navBar, sideMenu, contentHeader, children }) => (
  <PageContainer>
    {navBar}
    <PageBody>
      <Panel>{sideMenu}</Panel>
      <PageContent>
        <ContentHeader>{contentHeader}</ContentHeader>
        <ContentBody>{children}</ContentBody>
      </PageContent>
    </PageBody>
    <PageFooter />
  </PageContainer>
);

export default SubmissionLayout;
