import React from 'react';
import Modal from 'uikit/Modal';
import { Row, Col } from 'react-grid-system';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import styled from '@emotion/styled';
import FormControl from 'uikit/form/FormControl';
import PendingUsers from './UserSection';
// TODO: completely wrong place for AddField move to own section with Form
import FormProvider, { FormContext, AddField } from './FormProvider';
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

  const fields = []; /*
    {
      // need keys here, cant do it in form provider, need some object factory?
      key: uniqueId(),
      value: { firstName: '', lastName: '', email: '', role: '' },
      component: UserSection,
    },
  ];*/

  // form already validates itself, so just check if our local isFormValidated state is set to true
  const addUsers = users => console.log('users', users);

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
      <FormProvider fields={fields}>
        <Form setCleanFormData={setPendingUsers} setValidated={setValidated} />
        <AddField
          field={{
            value: { firstName: 'Oh damn i just got added', lastName: '', email: '', role: '' },
            component: UserSection,
          }}
        >
          Add another
        </AddField>
      </FormProvider>
    </Modal>
  );
};

const Inp = ({ formData, updateForm }) => (
  <input value={formData} onChange={e => updateForm(e.target.value)} />
);

const User = {
  value: '', // should be default value
  validator: x => x,
  component: UserSection,
  customUpdater: 1, // ???
};

export default AddUserModal;

/**
 * add another use => setValidated(false)
 */
