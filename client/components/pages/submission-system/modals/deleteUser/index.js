// @flow
import React from 'react';
import Modal from 'uikit/Modal';
import { UserModel } from '../common';

const DeleteUserModal = ({
  user,
  dismissModal,
  onSubmit,
}: {
  user: typeof UserModel,
  onSubmit: () => any | void,
  dismissModal: (e: any | void) => any | void,
}) => {
  return (
    <Modal
      title="Remove User?"
      titleIconConfig={{ name: 'warning', fill: 'warning' }}
      actionButtonText="Remove User"
      buttonSize="sm"
      cancelText="Cancel"
      onActionClick={() => onSubmit()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      <div style={{ width: '245px' }}>
        Are you sure you want to remove{' '}
        <strong>{user ? `${user.firstName} ${user.lastName}` : ''}</strong> from the program?
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
