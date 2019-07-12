import React from 'react';
import Modal from 'uikit/Modal';
import UserSection from '../addUser/userSection';

const EditUserModal = ({}) => {
  return (
    <Modal
      title="Edit Users"
      actionButtonText="Save"
      cancelText="Cancel"
      onActionClick={x => x}
      actionDisabled={false}
    >
      <UserSection
        user={{ firstName: '', lastName: '', email: '', role: '' }}
        errors={{ firstName: '', lastName: '', email: '', role: '' }}
      />
    </Modal>
  );
};

export default EditUserModal;
