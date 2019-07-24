import React from 'react';
import Modal from 'uikit/Modal';

const DeleteUserModal = ({ user, dismissModal, onSubmit }) => {
  return (
    <Modal
      title="Remove User?"
      titleIconConfig={{ name: 'warning', fill: 'warning' }}
      actionButtonText="Save"
      cancelText="Cancel"
      onActionClick={() => onSubmit()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      Are you sure you want to remove <strong>{user ? user.name : ''}</strong> from the program?
    </Modal>
  );
};

export default DeleteUserModal;
