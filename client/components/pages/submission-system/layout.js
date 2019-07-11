// @flow
import * as React from 'react';
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
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import Footer from 'uikit/Footer';

/**
 * TODO: `pathname` and `logOut` should just be available through context
 */
const SubmissionLayout = ({
  pathname,
  logOut,
  navBar = <NavBar path={pathname} logOut={logOut} />,
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
}: {
  pathname: string,
  logOut: any => any,
  noSidebar?: boolean,
  navBar?: React.Element<any>,
  sideMenu?: React.Element<any>,
  contentHeader?: React.Element<any>,
  children?: React.Element<any>,
  subtitle?: string,
}) => (
  <PageContainer>
    <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
    {navBar}
    <PageBody>
      {!noSidebar && <Panel>{sideMenu}</Panel>}
      <PageContent noSidebar={noSidebar}>
        {contentHeader && <ContentHeader>{contentHeader}</ContentHeader>}
        <ContentBody>{children}</ContentBody>
      </PageContent>
    </PageBody>
    <PageFooter>
      <Footer />
    </PageFooter>
  </PageContainer>
);

export default SubmissionLayout;
