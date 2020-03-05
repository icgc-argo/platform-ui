import React from 'react';
import Modal from 'uikit/Modal';
import { UserSection, UserSectionProps, UserField } from '../styledComponents';
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

  const disabledFields: Array<UserField> = [
    { fieldName: 'email' },
    { fieldName: 'firstName' },
    { fieldName: 'lastName' },
    ...(roleDisabled
      ? [{ fieldName: 'role', explanationText: adminRestrictionText } as UserField]
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
      {/* added extra margin at bottom to prevent scrolling from modal body, give role dropdown display room */}
      <div style={{ marginBottom: 40 }}>
        <UserSection
          user={form}
          onChange={(key, val) => setData({ key, val })}
          validateField={key => validateField({ key })}
          errors={validationErrors}
          disabledFields={disabledFields}
          onClickDelete={null}
        />
      </div>
      <br />
    </Modal>
  );
};

export default EditUserModal;
