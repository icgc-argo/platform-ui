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

type ToastConfig = { variant: string, title: React.Node, content: React.Node };
const useToastState = () => {
  const [toastStack, setToastStack] = React.useState<Array<ToastConfig & { id: string }>>([]);
  const addToast = (toast: ToastConfig) => {
    const id = String(Math.random());
    setToastStack(toastStack => [...toastStack, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 8000);
    return id;
  };
  const removeToast = (_id: string) => {
    setToastStack(toastStack => toastStack.filter(({ id }) => id !== _id));
    return _id;
  };

  return {
    toastStack,
    addToast,
    removeToast,
  };
};
const ToasterContext = React.createContext<$Call<typeof useToastState, any> | null>();

export const useToaster = () => React.useContext<any>(ToasterContext);

const SubmissionLayout = ({
  pathname,
  logOut,
  sideMenu = <SideMenu />,
  noSidebar = false,
  contentHeader,
  children,
  subtitle,
}: {
  pathname: string,
  logOut: any => any,
  noSidebar?: boolean,
  sideMenu?: React.Element<any>,
  contentHeader?: React.Element<any>,
  children?: React.Element<any>,
  subtitle?: string,
}) => {
  const toaster = useToastState();
  React.useEffect(() => {
    const interval = setInterval(() => {
      toaster.addToast({
        variant: TOAST_VARIANTS.SUCCESS,
        title: 'TOAST',
        content: `Lorem ipsum dolor amet jean shorts PBR&B la croix live-edge kitsch vice fanny pack. 90's shoreditch pickled photo booth four loko skateboard. Hashtag taiyaki tousled keytar activated charcoal affogato pork belly chia shaman biodiesel unicorn gentrify`,
      });
    }, 3000);
  }, []);
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
          css={css`
            position: fixed;
            z-index: 9999;
          `}
          ref={modalPortalRef}
        />
      </PageContainer>
      <div
        css={css`
          position: fixed;
          z-index: 9999;
          right: 0px;
          top: 80px;
        `}
        ref={modalPortalRef}
      >
        <div
          css={css`
            margin-right: 20px;
            margin-left: 20px;
          `}
        >
          <ToastStack toastConfigs={toaster.toastStack} onInteraction={console.log} />
        </div>
      </div>
    </ToasterContext.Provider>
  );
};

export default SubmissionLayout;
