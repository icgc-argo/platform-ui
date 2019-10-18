import * as React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'uikit';
import styled from '@emotion/styled';

import {
  PageContainer,
  Panel,
  PageBody,
  PageContent,
  ContentHeader,
  ContentBody,
  Sidebar,
  Collapsible,
} from 'uikit/PageLayout';
import clsx from 'clsx';
import Head from '../head';
import NavBar from 'components/NavBar';
import SideMenu from './SideMenu';
import Footer from '../../Footer';
import usePersistentState from 'global/hooks/usePersistentContext';
import debounce from 'lodash/debounce';
import hasIn from 'lodash/hasIn';

const SubmissionLayout = ({
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
}: {
  noSidebar?: boolean;
  sideMenu?: React.ReactNode | React.ReactNodeArray;
  contentHeader?: React.ReactNode | React.ReactNodeArray;
  children: React.ReactNode | React.ReactNodeArray;
  subtitle?: string;
}) => {
  const [sidemenuScrollTop, setSidemenuScrollTop] = usePersistentState('sidemenuScrollTop', 0);
  const debouncedSet = setter => debounce(setter, 100);
  const panelRef = React.useRef(null);

  const handleSidemenuScroll = e => {
    debouncedSet(setSidemenuScrollTop)(e.target.scrollTop);
  };

  // Only run on client side, don't run on server side
  if (hasIn(process, 'browser')) {
    React.useLayoutEffect(() => {
      if (panelRef.current) {
        panelRef.current.scrollTop = sidemenuScrollTop;
      }
    }, []);
  }

  return (
    <PageContainer>
      <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
      <NavBar />
      <PageBody className={clsx({ noSidebar })}>
        {!noSidebar && (
          <Sidebar>
            <Panel ref={panelRef}>{sideMenu}</Panel>
            <Collapsible />
          </Sidebar>
        )}
        <PageContent>
          {contentHeader && <ContentHeader>{contentHeader}</ContentHeader>}
          <ContentBody>{children}</ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default SubmissionLayout;
