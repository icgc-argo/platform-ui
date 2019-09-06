//@flow
import * as React from 'react';
import DefaultLayout from '../DefaultLayout';
import { ContentHeader, PageContent, ContentBody, PageBody } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css } from 'uikit';
import AccessKeyBox from './AccessKeyBox';
import ProgramAccessBox from './ProgramAccessBox';
import ProfileBox from './ProfileBox';

export function UserPage({ firstName, lastName }: { firstName: string, lastName: string }) {
  const Column = props => (
    <Col
      style={{
        padding: 10,
      }}
      {...props}
    />
  );
  return (
    <DefaultLayout>
      <PageBody noSidebar>
        <PageContent noSidebar>
          <ContentHeader>
            <Typography variant="title" color="primary">
              Profile & Tokens
            </Typography>
          </ContentHeader>
          <ContentBody
            css={css`
              padding: 10px;
            `}
          >
            <Row nogutter>
              <Column>
                <ProfileBox />
              </Column>
            </Row>
            <Row nogutter>
              <Column sm={12} md={6}>
                <AccessKeyBox />
              </Column>
              <Column sm={12} md={6}>
                <ProgramAccessBox />
              </Column>
            </Row>
          </ContentBody>
        </PageContent>
      </PageBody>
    </DefaultLayout>
  );
}
