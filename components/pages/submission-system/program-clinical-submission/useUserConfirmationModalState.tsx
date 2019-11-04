import * as React from 'react';
import Modal from 'uikit/Modal';

type ModalProps = React.ComponentProps<typeof Modal>;

export default (initialModalProps: ModalProps = {}) => {
  const [isModalShown, setModalShown] = React.useState(false);
  const [modalProps, setModalProps] = React.useState<ModalProps>(initialModalProps);
  const [{ onConfirmed, onCancel }, setSignOffFlow] = React.useState({
    onConfirmed: () => setModalShown(false),
    onCancel: () => setModalShown(false),
  });

  const getUserConfirmation = (modalProps: ModalProps = {}): Promise<boolean> =>
    new Promise(resolve => {
      const onConfirmed = () => {
        setModalShown(false);
        resolve(true);
      };
      const onCancel = () => {
        setModalShown(false);
        resolve(false);
      };
      setModalProps({
        ...modalProps,
        onCancelClick: e => {
          if (!!modalProps.onCancelClick) modalProps.onCancelClick(e);
          onCancel();
        },
        onCloseClick: e => {
          if (!!modalProps.onCancelClick) modalProps.onCancelClick(e);
          onCancel();
        },
        onActionClick: e => {
          if (!!modalProps.onActionClick) modalProps.onActionClick(e);
          onConfirmed();
        },
      });
      setModalShown(true);
      setSignOffFlow({
        onConfirmed,
        onCancel,
      });
    });
  return {
    isModalShown,
    getUserConfirmation,
    onConfirmed,
    onCancel,
    modalProps,
  };
};
