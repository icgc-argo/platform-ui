import * as React from 'react';

export default () => {
  const [isModalShown, setModalShown] = React.useState(false);
  const [{ onConfirmed, onCancel }, setSignOffFlow] = React.useState({
    onConfirmed: () => setModalShown(false),
    onCancel: () => setModalShown(false),
  });

  const getUserConfirmation = (): Promise<boolean> =>
    new Promise(resolve => {
      setModalShown(true);
      setSignOffFlow({
        onConfirmed: () => {
          setModalShown(false);
          resolve(true);
        },
        onCancel: () => {
          setModalShown(false);
          resolve(false);
        },
      });
    });
  return {
    isModalShown,
    getUserConfirmation,
    onConfirmed,
    onCancel,
  };
};
