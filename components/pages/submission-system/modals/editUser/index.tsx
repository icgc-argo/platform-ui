import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection, UserSectionProps } from '../styledComponents';
import { UserModel, userSchema } from '../common';
import useFormHook from 'global/hooks/useFormHook';

const EditUserModal = ({
  user,
  dismissModal,
  onSubmit,
}: {
  user: typeof UserModel;
  onSubmit: (data: typeof UserModel) => any | void;
  dismissModal: () => any | void;
}) => {
  const {
    errors,
    data: form,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
  } = useFormHook({ initialFields: user, schema: userSchema });
  const validationErrors = errors as UserSectionProps['errors'];

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
        onChange={(key, val) => {
          if (form[key] !== val) {
            return setData({ key, val });
          }
        }}
        validateField={key => validateField({ key })}
        errors={validationErrors}
        disabledFields={['email', 'firstName', 'lastName']}
        onClickDelete={null}
      />
      <br />
    </Modal>
  );
};

export default EditUserModal;
