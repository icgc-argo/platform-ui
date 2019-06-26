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
  sideMenu = <SideMenu initialShownItem={1} />,
  contentHeader,
  children,
}) => (
  <PageContainer>
    {navBar}
    <PageBody>
      <Panel>{sideMenu}</Panel>
      <PageContent>
        <ContentHeader>{contentHeader}</ContentHeader>
        <ContentBody>{children}</ContentBody>
      </PageContent>
    </PageBody>
    <PageFooter>
      <Footer />
    </PageFooter>
  </PageContainer>
);

export default SubmissionLayout;
