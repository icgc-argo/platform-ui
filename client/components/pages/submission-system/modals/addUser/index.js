import React, { useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import css from '@emotion/css';
import { UserSection } from '../styledComponents';
import { addUserSchema } from '../validations';
import useFormHook from '../useFormHook';

// $FlowFixMe .gql file not supported
import { INVITE_USER_MUTATION } from './mutations.gql';

const AddUserModal = ({}) => {
  const {
    errors: validationErrors,
    data: form,
    setData,
    setError,
    deleteSection,
    createSection,
    validateField,
    validateSection,
    validateForm,
    touched,
    hasErrors,
  } = useFormHook({ initialFields: user, schema: addUserSchema });

  const islastSectionTouched = Object.values(form[form.length - 1]).reduce(
    (acc, val) => acc || !!val,
    false,
  );

  const submitForm = async () => {
    try {
      validData = await validateForm();
      const result = await sendAddUser(validData);
    } catch (err) {
      console.log(err);
    }
  };

  const createUserInput = data => {
    const router = useRouter();
    const { shortName } = router.query;
    return {
      programShortName: shortName,
      userFirstName: data.firstName,
      userLastName: data.lastName,
      userEmail: data.email,
      userRole: data.role,
    };
  };

  const sendAddUser = validData =>
    useMutation(INVITE_USER_MUTATION, {
      variables: { user: createUserInput(validData) },
    });

  const addSection = async () => {
    // check if last section is blank
    const index = form.length - 1;
    try {
      await validateSection({ index });
      createSection(user);
    } catch (e) {
      console.log('error: last section is empty', e);
    }
  };

  const removeSection = index => {
    deleteSection(index);
  };

  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => submitForm()}
      actionDisabled={!touched || hasErrors}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      {form.map((data, currentIndex) => {
        return (
          <UserSection
            key={currentIndex}
            user={data}
            onChange={(key, val) => setData({ key, val, index: currentIndex })}
            validateField={key => validateField({ key, index: currentIndex })}
            errors={validationErrors[currentIndex]}
            deleteSelf={form.length > 1 ? () => removeSection(currentIndex) : null}
          />
        );
      })}
      <AddSection variant="text" disabled={!islastSectionTouched}>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Icon
            name="plus_circle"
            fill={islastSectionTouched ? 'accent2' : '#cecfd3'}
            css={css`
              margin-right: 3px;
            `}
          />
          <Typography
            onClick={() => (islastSectionTouched ? addSection() : null)}
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
