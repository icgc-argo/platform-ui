import React from 'react';
import Modal from 'uikit/Modal';
import UserSection from '../addUser/userSection';
import { UserModel } from '../common';

const EditUserModal = ({}) => {
  return (
    <Modal
      title="Edit Users"
      actionButtonText="Save"
      cancelText="Cancel"
      onActionClick={x => x}
      actionDisabled={false}
    >
      <UserSection user={UserModel} errors={UserModel} />
    </Modal>
  );
};

export default EditUserModal;
