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
import NavBar from '../NavBar';
import SideMenu from './SideMenu';
import Footer from 'uikit/Footer';
import Modal from 'uikit/Modal';
import ToastStack from 'uikit/notifications/ToastStack';
import { TOAST_VARIANTS } from 'uikit/notifications/Toast';
import { NOTIFICATION_INTERACTION_EVENTS } from 'uikit/notifications/Notification';
import { ToasterContext, useToaster, useToastState } from './toaster';

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
            transition: all 0.2s;
            height: 100vh;
            width: 100vw;
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
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
}: {
  noSidebar?: boolean,
  sideMenu?: React.Element<any>,
  contentHeader?: React.Element<any>,
  children?: React.Element<any>,
  subtitle?: string,
}) => {
  const toaster = useToastState();
  return (
    <ToasterContext.Provider value={toaster}>
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
        <div
          className="toastStackContainer"
          css={css`
            position: fixed;
            z-index: 9999;
            right: 0px;
            top: 80px;
          `}
        >
          <div
            css={css`
              margin-right: 20px;
              margin-left: 20px;
            `}
          >
            <ToastStack toastConfigs={toaster.toastStack} onInteraction={toaster.onInteraction} />
          </div>
        </div>
        <div
          css={css`
            position: fixed;
            z-index: 9999;
          `}
          ref={modalPortalRef}
        />
      </PageContainer>
    </ToasterContext.Provider>
  );
};

export default SubmissionLayout;
