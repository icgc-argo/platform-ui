import clsx from 'clsx';
import NavBar from 'components/NavBar';
import usePersistentState from 'global/hooks/usePersistentContext';
import debounce from 'lodash/debounce';
import hasIn from 'lodash/hasIn';
import * as React from 'react';
import {
  Collapsible,
  ContentBody,
  ContentHeader,
  PageBody,
  PageContainer,
  PageContent,
  Panel,
  Sidebar,
} from 'uikit/PageLayout';
import Footer from '../../Footer';
import Head from '../head';
import SideMenu from './SideMenu';

const SubmissionLayout = ({
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
  ContentHeaderComponent = ContentHeader,
}: {
  noSidebar?: boolean;
  sideMenu?: React.ReactNode | React.ReactNodeArray;
  contentHeader?: React.ReactNode | React.ReactNodeArray;
  children: React.ReactNode | React.ReactNodeArray;
  subtitle?: string;
  ContentHeaderComponent?: typeof ContentHeader;
}) => {
  const [sidemenuScrollTop, setSidemenuScrollTop] = usePersistentState('sidemenuScrollTop', 0);
  const panelRef = React.useRef(null);

  const setScroll = debounce(setSidemenuScrollTop, 100);

  const handleSidemenuScroll = (e: any) => {
    setScroll(e.target.scrollTop);
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
            <Panel ref={panelRef} onScroll={handleSidemenuScroll}>
              {sideMenu}
            </Panel>
            <Collapsible />
          </Sidebar>
        )}
        <PageContent>
          {contentHeader && <ContentHeaderComponent>{contentHeader}</ContentHeaderComponent>}
          <ContentBody>{children}</ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
};

export default SubmissionLayout;

export function MinimalLayout({ children }) {
  return (
    <PageContainer>
      <Head title={'ICGC ARGO'} />
      <NavBar hideLinks />
      <PageBody className={clsx({ noSidebar: true })}>
        <PageContent>
          <ContentBody>{children}</ContentBody>
          <Footer />
        </PageContent>
      </PageBody>
    </PageContainer>
  );
}
