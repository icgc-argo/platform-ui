import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection } from '../styledComponents';
import { UserModel } from '../common';
import useFormHook from '../useFormHook';
import userSchema from '../validations';

const EditUserModal = ({}) => {
  const {
    errors: validationErrors,
    data: form,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
  } = useFormHook({ initialFields: UserModel, schema: userSchema });

  const submitForm = async () => {
    try {
      const validData = await validateForm();
      console.log(validData);
      // Send data
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
    >
      <UserSection
        user={form[0]}
        onChange={(key, val) => setData({ key, val })}
        validateField={key => validateField({ key })}
        errors={validationErrors[0]}
        disabledFields={['email']}
      />
    </Modal>
  );
};

export default EditUserModal;
