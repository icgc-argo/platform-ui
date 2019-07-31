import React from 'react';
import Modal from 'uikit/Modal';
import PropTypes from 'prop-types';

const DeleteUserModal = ({ user, dismissModal, onSubmit }) => {
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

DeleteUserModal.propTypes = {
  user: PropTypes.object.isRequired,
  dismissModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DeleteUserModal;
