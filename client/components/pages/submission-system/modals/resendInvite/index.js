import React from 'react';
import Modal from 'uikit/Modal';
import { UserModel } from '../common';

const ResendInviteModal = ({
  user,
  dismissModal,
  onSubmit,
}: {
  user: UserModel,
  onSubmit: (data: typeof UserModel) => any | void,
  dismissModal: (e: any | void) => any | void,
}) => {
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

export default ResendInviteModal;
