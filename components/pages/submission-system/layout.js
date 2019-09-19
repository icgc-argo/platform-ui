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
import clsx from 'clsx';
import Head from '../head';
import NavBar from 'components/NavBar';
import SideMenu from './SideMenu';
import Footer from 'uikit/Footer';
import usePersistentState from 'global/hooks/usePersistentContext';
import debounce from 'lodash/debounce';

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
  const [sidemenuScrollTop, setSidemenuScrollTop] = usePersistentState('sidemenuScrollTop', 0);
  const debouncedSet = setter => debounce(setter, 50);
  const panelRef = React.useRef(null);

  const handleSidemenuScroll = e => {
    debouncedSet(setSidemenuScrollTop)(e.target.scrollTop);
  };

  React.useLayoutEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = sidemenuScrollTop;
    }
  }, []);

  return (
    <PageContainer>
      <Head title={subtitle ? `ICGC ARGO - ${subtitle}` : 'ICGC ARGO'} />
      <NavBar />
      <PageBody className={clsx({ noSidebar })}>
        {!noSidebar && (
          <Panel ref={panelRef} onScroll={handleSidemenuScroll}>
            {sideMenu}
          </Panel>
        )}
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
