import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection } from '../styledComponents';
import { UserModel } from '../common';
import useFormHook from '../useFormHook';
import { editUserSchema } from '../validations';

const ResendInviteModal = ({ user, dismissModal, onSubmit }) => {
  const {
    errors: validationErrors,
    data: form,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
  } = useFormHook({ initialFields: user, schema: editUserSchema });

  const submitForm = async () => {
    try {
      const validData = await validateForm();
      const result = onSubmit(validData);
    } catch (err) {
      console.log(err);
    }
  };

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
