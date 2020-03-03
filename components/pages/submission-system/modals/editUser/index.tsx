import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection, UserSectionProps } from '../styledComponents';
import { UserModel, userSchema } from '../common';
import useFormHook from 'global/hooks/useFormHook';
import { adminRestrictionText } from '../../program-management/Users';

const EditUserModal = ({
  user,
  dismissModal,
  onSubmit,
  roleDisabled,
}: {
  user: typeof UserModel;
  onSubmit: (data: typeof UserModel) => any | void;
  dismissModal: () => any | void;
  roleDisabled?: boolean;
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

  type Field = keyof typeof UserModel;
  const disabledFields = [
    { fieldName: 'email' as Field },
    { fieldName: 'firstName' as Field },
    { fieldName: 'lastName' as Field },
    ...(roleDisabled
      ? [{ fieldName: 'role' as Field, explanationText: adminRestrictionText }]
      : []),
  ];

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
        disabledFields={disabledFields}
        onClickDelete={null}
      />
      <br />
    </Modal>
  );
};

export default EditUserModal;
