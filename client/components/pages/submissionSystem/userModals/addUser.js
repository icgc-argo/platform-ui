import React from 'react';
import Modal from 'uikit/modal';
import { Row, Col } from 'react-grid-system';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import { Input } from 'uikit/form';

const NewUserSection = styled('div')`
  padding: 12px 11px;
  border: solid 1px ${({ theme }) => theme.color.grey_2};
`;

const AddSection = styled('button')``;

const AddUserModal = ({}) => {
  const [pendingAddUsers, setPendingAddUsers] = React.useState([]);
  const [isValidated, setValidated] = React.useState(false);

  addUsers = users => console.log('users', users);

  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => addUsers(pendingAddUsers)}
      actionDisabled={isValidated}
    >
      <div>
        When you add users, they will receive an email inviting them to register. Note: the provided
        email address must be a Gmail or G Suite email address for login purposes.
      </div>

      {pendingAddUsers.map(addUser => (
        <NewUserSection>
          <Row>
            <Col md={6}>
              <InputLabel required>First Name</InputLabel>
              <Input />
              <InputLabel required>Email Address</InputLabel>
              <Input />
            </Col>
            <Col md={6}>
              <InputLabel required>Last Name</InputLabel>
              <Input />
              <InputLabel required>Role</InputLabel>
              <MultiSelect />
            </Col>
          </Row>
          <div>Delete</div>
        </NewUserSection>
      ))}
      <AddSectionButton />
    </Modal>
  );
};

export default AddUserModal;

/**
 * add another use => setValidated(false)
 */
