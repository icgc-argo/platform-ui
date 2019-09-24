import { storiesOf } from '@storybook/react';
import React from 'react';
import css from '@emotion/css';

import AppBar, { MenuItem } from '../AppBar';
import Typography from '../Typography';
import Table from '../Table';
import {
  PageContainer,
  Panel,
  PageBody,
  PageContent,
  ContentHeader,
  ContentBody,
  ContentBox,
  PageFooter,
} from '.';

const PageLayoutStories = storiesOf(`${__dirname}`, module).add('Basic', () => (
  <PageContainer>
    <AppBar>
      <Typography color="white">AppBar</Typography>
    </AppBar>
    <PageBody>
      <Panel>
        <Typography>Panel</Typography>
      </Panel>
      <PageContent>
        <Typography>PageContent</Typography>
        <ContentHeader>
          <Typography>ContentHeader</Typography>
        </ContentHeader>
        <ContentBody>
          <Typography>ContentBody</Typography>
          <ContentBox>
            <Typography>ContentBox</Typography>
          </ContentBox>
        </ContentBody>
      </PageContent>
    </PageBody>
    <PageFooter>
      <Typography>PageFooter</Typography>
    </PageFooter>
  </PageContainer>
));

export default PageLayoutStories;
