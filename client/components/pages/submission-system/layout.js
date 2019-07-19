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
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import Footer from 'uikit/Footer';
import Modal from 'uikit/Modal';

/**
 * TODO: `pathname` and `logOut` should just be available through context
 */
const modalPortalRef = React.createRef();

const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export const ModalPortal = ({ children }: { children: React.Node }) => {
  const ref = modalPortalRef.current;
  const mounted = useMounted();
  return ref
    ? ReactDOM.createPortal(
        <div
          css={css`
            position: absolute;
            height: 100vh;
            width: 100vw;
            z-index: 9999;
            transition: all 0.2s;
            opacity: ${mounted ? 1 : 0};
          `}
        >
          <Modal.Overlay>{children}</Modal.Overlay>
        </div>,
        ref,
      )
    : null;
};

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
}) => {
  return (
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
      <div
        css={css`
          position: absolute;
        `}
        ref={modalPortalRef}
      />
    </PageContainer>
  );
};

export default SubmissionLayout;
