import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection, UserSectionProps } from '../styledComponents';
import { UserModel, userSchema } from '../common';
import useFormHook from 'global/hooks/useFormHook';

const EditUserModal = ({
  user,
  dismissModal,
  onSubmit,
  cannotChangeRole,
}: {
  user: typeof UserModel;
  onSubmit: (data: typeof UserModel) => any | void;
  dismissModal: () => any | void;
  cannotChangeRole?: boolean;
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
  if (!validationErrors.role && cannotChangeRole) {
    validationErrors.role = 'ADMIN';
  }
  const submitForm = async () => {
    try {
      const validData = await validateForm();
      const result = onSubmit(validData);
    } catch (err) {
      console.log(err);
    }
  };

  const disabledFields = ['email', 'firstName', 'lastName'];
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
        disabledFields={cannotChangeRole ? [...disabledFields, 'role'] : disabledFields}
        onClickDelete={null}
      />
      <br />
    </Modal>
  );
};

export default EditUserModal;
