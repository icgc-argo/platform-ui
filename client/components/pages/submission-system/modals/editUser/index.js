// @flow
import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection } from '../styledComponents';
import { UserModel } from '../common';
import useFormHook from 'global/hooks/useFormHook';
import editUserSchema from './validation';

const EditUserModal = ({
  user,
  dismissModal,
  onSubmit,
}: {
  user: typeof UserModel,
  onSubmit: (data: typeof UserModel) => any | void,
  dismissModal: (e: any | void) => any | void,
}) => {
  const {
    errors: validationErrors,
    data: form,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
  } = useFormHook({ initialFields: user, schema: editUserSchema, disabledFields: [] });

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
      title="Edit Users"
      actionButtonText="Save"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      actionDisabled={!touched || hasErrors}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      <UserSection
        user={form}
        onChange={(key, val) => setData({ key, val })}
        validateField={key => validateField({ key })}
        errors={validationErrors}
        disabledFields={['email', 'firstName', 'lastName']}
      />
    </Modal>
  );
};

export default EditUserModal;
