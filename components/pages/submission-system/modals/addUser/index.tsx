import React, { useState } from 'react';
import { styled, css } from 'uikit';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import { UserSection, UserSectionProps } from '../styledComponents';
import useFormHook from 'global/hooks/useFormHook';
import { UserModel, userSchema } from '../common';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';

const AddUser = ({ id, formSubscriptions, removeSection, onUpdate, showDelete }) => {
  const form = useFormHook({ initialFields: UserModel, schema: userSchema });

  const { errors, data, setData, validateField, touched } = form;
  const validationErrors = errors as UserSectionProps['errors'];

  React.useEffect(() => {
    formSubscriptions[id] = form;
    onUpdate();
  });

  return (
    <UserSection
      key={id}
      user={data}
      onChange={(key, val) => {
        setData({ key, val });
      }}
      validateField={key => validateField({ key })}
      errors={validationErrors}
      onClickDelete={() => removeSection(id)}
      disabledFields={[]}
      showDelete={showDelete}
    />
  );
};

const AddSection = styled(Button)`
  text-transform: uppercase;
  color: ${({ disabled, theme }) => (disabled ? '#d0d1d8' : theme.colors.accent2_dark)};
  margin-top: 14px;
`;

const AddUserModal = ({
  onSubmit,
  dismissModal,
}: {
  onSubmit: (data: typeof UserModel[]) => any | void;
  dismissModal: () => any | void;
}) => {
  const [formIds, setFormIds] = React.useState([uniqueId()]);
  const [isLastSectionTouched, setIsLastSectionTouched] = React.useState(false);
  const [isFormTouched, setIsFormTouched] = React.useState(false);
  const [hasErrors, setHasErrors] = React.useState(false);
  const formSubscriptions = {};

  // check if form has been touched
  const touchCheck = () => {
    const formSubKeys = Object.keys(formSubscriptions);
    const isTouched = formSubKeys
      .map(key => formSubscriptions[key].touched)
      .reduce((acc, val) => acc || val, false);
    setIsFormTouched(isTouched);
  };

  // check for errors
  const errorCheck = () => {
    const formSubKeys = Object.keys(formSubscriptions);
    const validity = formSubKeys
      .map(key => formSubscriptions[key].hasErrors)
      .reduce((acc, val) => acc || val, false);
    setHasErrors(validity);
  };

  // check if last form section is touched
  const lastSectionTouchCheck = async () => {
    const formSubKeys = Object.keys(formSubscriptions);
    const lastSection = formSubscriptions[formSubKeys[formSubKeys.length - 1]];
    setIsLastSectionTouched(lastSection.touched);
  };

  // validate each individual form and fire onSubmit for each
  const submitForm = async () => {
    const allForms = Object.keys(formSubscriptions).map(async key => {
      const form = formSubscriptions[key];
      return form.validateForm(form.data);
    });
    Promise.all(allForms)
      .then(validData => {
        console.log('Validation succeeded, submitting all forms');
        onSubmit(validData);
      })
      .catch(err => console.log('Validation Failed', err));
  };

  // add user form
  const addSection = async () => {
    if (isLastSectionTouched) {
      const formSubKeys = Object.keys(formSubscriptions);
      const lastSection = formSubscriptions[formSubKeys[formSubKeys.length - 1]];
      try {
        await lastSection.validateForm();
        setFormIds(formIds.concat(uniqueId()));
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('error: last section cannot be added');
    }
  };

  // remove user form
  const removeSection = removeId => {
    if (formIds.length > 1) {
      setFormIds(formIds.filter(id => id !== removeId));
      delete formSubscriptions[removeId];
    }
  };

  return (
    <Modal
      title="Add Users"
      actionButtonId="modal-add-users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      {formIds.map((id, index) => (
        <AddUser
          key={id}
          id={id}
          formSubscriptions={formSubscriptions}
          removeSection={id => {
            removeSection(id);
          }}
          onUpdate={() => {
            touchCheck();
            errorCheck();
            lastSectionTouchCheck();
          }}
          showDelete={formIds.length > 1}
        />
      ))}
      <AddSection variant="text" disabled={!isLastSectionTouched || hasErrors}>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Icon
            name="plus_circle"
            fill={isLastSectionTouched && !hasErrors ? 'accent2' : '#cecfd3'}
            css={css`
              margin-right: 3px;
            `}
          />
          <Typography
            onClick={() => (isLastSectionTouched && !hasErrors ? addSection() : null)}
            variant="paragraph"
            component="span"
          >
            Add another
          </Typography>
        </div>
      </AddSection>
    </Modal>
  );
};

export default AddUserModal;
