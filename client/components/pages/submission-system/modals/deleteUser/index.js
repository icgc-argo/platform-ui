import React from 'react';
import Modal from 'uikit/Modal';

const DeleteUserModal = ({ user, dismissModal, onSubmit }) => {
  const submitForm = async () => {
    try {
      const result = onSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title="Remove User?"
      titleIconConfig={{ name: 'warning', fill: 'warning' }}
      actionButtonText="Save"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      Are you sure you want to remove <strong>{user ? user.name : ''}</strong> from the program?
    </Modal>
  );
};

export default DeleteUserModal;
