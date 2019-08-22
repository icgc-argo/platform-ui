// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'uikit';
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
import Head from '../head';
import NavBar from 'components/NavBar';
import SideMenu from './SideMenu';
import Footer from 'uikit/Footer';

const SubmissionLayout = ({
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
}: {
  noSidebar?: boolean,
  sideMenu?: React.Element<any>,
  contentHeader?: React.Element<any>,
  children: React.Node,
  subtitle?: string,
}) => {
  return (
    <PageContainer>
      <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
      <NavBar />
      <PageBody noSidebar={noSidebar}>
        {!noSidebar && <Panel>{sideMenu}</Panel>}
        <PageContent>
          {contentHeader && <ContentHeader>{contentHeader}</ContentHeader>}
          <ContentBody>{children}</ContentBody>
        </PageContent>
      </PageBody>
      <PageFooter>
        <Footer />
      </PageFooter>
    </PageContainer>
  );
};

export default SubmissionLayout;
