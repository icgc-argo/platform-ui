import * as React from 'react';
import DefaultLayout from '../DefaultLayout';
import { ContentHeader, ContentBody } from 'uikit/PageLayout';
import Typography from 'uikit/Typography';
import { Row, Col } from 'react-grid-system';
import { css } from 'uikit';
import ApiTokenBox from './ApiTokenBox';
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

  // can/should the pollInterval be left in for testing on dev?
  const { data, loading } = useQuery<ProfileQueryData>(PROFILE, {
    pollInterval: 5000,
  });
  const isDacoApproved = get(data, ['self', 'isDacoApproved']);
  const apiToken = get(data, ['self', 'apiKey']);

  return (
    <DefaultLayout>
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
            <ApiTokenBox apiToken={apiToken} loading={loading} />
          </Column>
          <Column sm={12} md={6}>
            <ProgramAccessBox isDacoApproved={isDacoApproved} loading={loading} />
          </Column>
        </Row>
      </ContentBody>
    </DefaultLayout>
  );
}
