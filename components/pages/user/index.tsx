import * as React from 'react';
import DefaultLayout from '../DefaultLayout';
import { ContentHeader, PageContent, ContentBody, PageBody } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css } from 'uikit';
import AccessKeyBox from './AccessKeyBox';
import ProgramAccessBox from './ProgramAccessBox';
import ProfileBox from './ProfileBox';
import PROFILE from './gql/PROFILE.gql';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import { ProfileQueryData } from './types';

export function UserPage({ firstName, lastName }: { firstName: string; lastName: string }) {
  const Column = props => (
    <Col
      style={{
        padding: 10,
      }}
      {...props}
    />
  );

  const { data, loading } = useQuery<ProfileQueryData>(PROFILE);
  const self = get(data, 'self', {});

  return (
    <DefaultLayout>
      <PageBody className="noSidebar">
        <PageContent>
          <ContentHeader>
            <Typography variant="title" color="primary" as="h1">
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
                <AccessKeyBox accessKey={self.apiKey} loading={loading} />
              </Column>
              <Column sm={12} md={6}>
                <ProgramAccessBox isDacoApproved={self.isDacoApproved} loading={loading} />
              </Column>
            </Row>
          </ContentBody>
        </PageContent>
      </PageBody>
    </DefaultLayout>
  );
}
