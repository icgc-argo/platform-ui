// @flow
import React, { useState } from 'react';
import { styled, css } from 'uikit';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import { UserSection } from '../styledComponents';
import addUserSchema from './validation';
import useFormHook from 'global/hooks/useFormHook';
import { UserModel } from '../common';
import uniqueId from 'lodash/uniqueId';

const AddUser = ({ id, formSubscriptions, removeSection }) => {
  const form = useFormHook({ initialFields: UserModel, schema: addUserSchema });
  React.useEffect(() => {
    formSubscriptions[id] = form;
  });

  const {
    errors: validationErrors,
    data,
    setData,
    setError,
    validateField,
    validateForm,
    touched,
    hasErrors,
  } = form;

  return (
    <UserSection
      key={id}
      user={data}
      onChange={(key, val) => setData({ key, val })}
      validateField={key => validateField({ key })}
      errors={validationErrors}
      onClickDelete={() => removeSection(id)}
      disabledFields={[]}
      showDelete={true}
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
  onSubmit: (data: typeof UserModel[]) => any | void,
  dismissModal: (e: any | void) => any | void,
}) => {
  const [formIds, setFormIds] = React.useState([uniqueId()]);
  const formSubscriptions = {};
  const formSubKeys = Object.keys(formSubscriptions);

  const islastSectionTouched = () => false;
  //(): ({ vboolean =>
  //  formSubscriptions(Object.keys(formSubscriptions).length - 1).touched;

  const submitForm = async () => {
    const allForms = Object.keys(formSubscriptions).map(async key => {
      const form = formSubscriptions[key];
      const validData = await form.validateForm(form.data);
      const result = onSubmit(validData);
      return result;
    });
    Promise.all(allForms)
      .then(d => console.log('all forms sent'))
      .catch(err => console.log('form sending failed', err));
  };

  const addSection = async () => {
    try {
      // check if last section is blank

      // await validateSection({ index });
      setFormIds(formIds.concat(uniqueId()));
    } catch (e) {
      console.log('error: last section is empty', e);
    }
    console.log('add section');
  };

  const removeSection = removeId => {
    setFormIds(formIds.filter(id => id !== removeId));
  };

  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      // actionDisabled={!touched || hasErrors}
      onCancelClick={dismissModal}
      onCloseClick={dismissModal}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      {formIds.map(id => (
        <AddUser
          key={id}
          id={id}
          formSubscriptions={formSubscriptions}
          removeSection={id => removeSection(id)}
        />
      ))}
      <AddSection variant="text" disabled={!islastSectionTouched()}>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Icon
            name="plus_circle"
            fill={islastSectionTouched() ? 'accent2' : '#cecfd3'}
            css={css`
              margin-right: 3px;
            `}
          />
          <Typography
            onClick={() => (islastSectionTouched() ? addSection() : null)}
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
