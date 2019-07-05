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
import Typography from 'uikit/Typography';
import Button from 'uikit/Button';
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import Footer from 'uikit/Footer';
import { css } from 'uikit';

/**
 * TODO: `pathname` and `logOut` should just be available through context
 */
const SubmissionLayout = ({
  pathname,
  logOut,
  navBar = <NavBar path={pathname} logOut={logOut} />,
  sideMenu = <SideMenu initialShownItem={1} />,
  noSidebar = false,
  contentHeader,
  children,
}: {
  pathname: string,
  logOut: any => any,
  noSidebar?: boolean,
  navBar?: React.Element<any>,
  sideMenu?: React.Element<any>,
  contentHeader?: React.Element<any>,
  children?: React.Element<any>,
}) => (
  <PageContainer>
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
