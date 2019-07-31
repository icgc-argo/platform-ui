import React from 'react';
import Modal from 'uikit/Modal';
import PropTypes from 'prop-types';

const ResendInviteModal = ({ user, dismissModal, onSubmit }) => {
  return (
    <Modal
      title="Resend Invitation?"
      actionButtonText="RESEND INVITATION"
      cancelText="CANCEL"
      buttonSize="sm"
      onActionClick={() => onSubmit()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      <div style={{ width: '322px' }}>
        Are you sure you want to resend the email invitation to{' '}
        <strong>{user ? `${user.firstName} ${user.lastName}` : ''}</strong>?
      </div>
    </Modal>
  );
};

ResendInviteModal.propTypes = {
  user: PropTypes.object.isRequired,
  dismissModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResendInviteModal;
