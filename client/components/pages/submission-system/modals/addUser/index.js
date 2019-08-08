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
import isEmpty from 'lodash/isEmpty';

const AddUser = ({ id, formSubscriptions, removeSection, onUpdate, showDelete }) => {
  const form = useFormHook({ initialFields: UserModel, schema: addUserSchema });

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

  React.useEffect(() => {
    console.log('add user update');
    formSubscriptions[id] = form;
    onUpdate();
  });

  return (
    <UserSection
      key={id}
      user={data}
      onChange={(key, val) => {
        setData({ key, val });
        console.log('touched', touched);
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
  onSubmit: (data: typeof UserModel[]) => any | void,
  dismissModal: (e: any | void) => any | void,
}) => {
  const [formIds, setFormIds] = React.useState([uniqueId()]);
  const [isLastSectionTouched, setIsLastSectionTouched] = React.useState(false);
  const formSubscriptions = {};

  const checkLastSectionTouched = () => {
    console.log('checkLastSectionTouched', formSubscriptions);
    if (!isEmpty(formSubscriptions)) {
      const formSubKeys = Object.keys(formSubscriptions);
      const lastSection = formSubscriptions[formSubKeys[formSubKeys.length - 1]];
      setIsLastSectionTouched(lastSection.touched);
    } else return false;
  };

  const isFormTouched = (): boolean => false;

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
    if (formIds.length > 1) {
      setFormIds(formIds.filter(id => id !== removeId));
      delete formSubscriptions[removeId];
    }
  };

  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      //     actionDisabled={!touched || hasErrors}
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
            checkLastSectionTouched();
          }}
          onUpdate={() => {
            checkLastSectionTouched();
          }}
          showDelete={formIds.length > 1}
        />
      ))}
      <AddSection variant="text" disabled={!isLastSectionTouched}>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Icon
            name="plus_circle"
            fill={isLastSectionTouched ? 'accent2' : '#cecfd3'}
            css={css`
              margin-right: 3px;
            `}
          />
          <Typography
            onClick={() => (isLastSectionTouched ? addSection() : null)}
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
