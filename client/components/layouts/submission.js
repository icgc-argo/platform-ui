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

const SubmissionLayout = ({ navBar, sideMenu, headerTitle, headerButton, children }) => (
  <PageContainer>
    {navBar}
    <PageBody>
      <Panel>{sideMenu}</Panel>
      <PageContent>
        <ContentHeader>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              width: 100%;
            `}
          >
            <Typography
              variant="title"
              color="primary"
              css={css`
                margin: 0px;
              `}
            >
              {headerTitle}
            </Typography>
            {headerButton}
          </div>
        </ContentHeader>
        <ContentBody>
          <ContentBox
            css={css`
              padding-top: 0px;
            `}
          >
            {children}
          </ContentBox>
        </ContentBody>
      </PageContent>
    </PageBody>
    <PageFooter />
  </PageContainer>
);

export default SubmissionLayout;
