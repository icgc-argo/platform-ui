import React from 'react';
import styled from '@emotion/styled';
import Modal from 'uikit/Modal';

const AddSection = styled('button')`
  text-transform: uppercase;
`;

/**
 * hooks, local form state
 */

const AddUserModal = ({}) => {
  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => console.log('on action click')}
      actionDisabled={false}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      <AddSection>Add another</AddSection>
    </Modal>
  );
};

export default AddUserModal;
