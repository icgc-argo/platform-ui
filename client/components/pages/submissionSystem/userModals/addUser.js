import React from 'react';
import Modal from 'uikit/Modal';
import { Row, Col } from 'react-grid-system';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import styled from '@emotion/styled';
import FormControl from 'uikit/form/FormControl';
import PendingUsers from './UserSection';
import FormProvider, { FormContext } from './FormProvider';
import Form from './Form';
import UserSection from './UserSection';
import { uniqueId } from 'lodash';

const AddSection = styled('button')``;

// TODO: change to actual model that can be instantiated and validated
const pendingUserModel = Object.freeze({
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  role: 'role',
});

/**
 * TODO: validation
 * TODO: add docs
 * TODO: add debounce
 * TODO: add Flow
 * TODO: capitalisei component file name
 *
 */

const AddUserModal = ({}) => {
  const [pendingUsers, setPendingUsers] = React.useState(null);
  const [isValidated, setValidated] = React.useState(false);

  const addUsers = users => console.log('users', users);

  const updatePendingUser = ({ index, key, value }) => {
    console.log('updatePendingUser', 'index', index, 'key', key, 'value', value);
    const updatedPendingUsers = pendingUsers.map((user, i) =>
      i === index ? { ...user, [key]: value } : user,
    );
    setPendingUsers(updatedPendingUsers);
    console.log('pendingUsersBefore', updatedPendingUsers);
  };

  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => addUsers(pendingUsers)}
      actionDisabled={isValidated}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      <FormProvider fields={[{ key: uniqueId(), value: 'test', component: Inp }]}>
        <Form update={setPendingUsers} setValidated={setValidated} />
      </FormProvider>
    </Modal>
  );
};

const Inp = ({ value }) => <input value="value" />;

const User = {
  value: '',
  validator: x => x,
  component: UserSection,
  customUpdater: 1, // ???
};

export default AddUserModal;

/**
 * add another use => setValidated(false)
 */
