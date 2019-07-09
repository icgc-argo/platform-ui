import React, { useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import css from '@emotion/css';
import UserSection from './userSection';
import AddUserSchema from './formSchema';
import * as yup from 'yup';
import { get } from 'lodash';

const useFormHook = ({ initialFields, schema: formSchema }) => {
  const [form, setForm] = useState({ errors: [initialFields], data: [initialFields] });
  const { errors, data } = form;

  // set form data
  const setData = ({ key, val, index }) =>
    setForm({
      ...form,
      data: form.data.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });

  const setErrors = () => console.log('seterrors');

  // delete a block of values
  const deleteSection = deletedIndex => {
    const filterDeleted = (item, index) => index !== deletedIndex;
    setForm({
      errors: form.errors.filter(filterDeleted),
      data: form.data.filter(filterDeleted),
    });
  };

  // create a block of values
  const createSection = sectionFields => {
    setForm({
      errors: form.errors.concat(sectionFields),
      data: form.data.concat(sectionFields),
    });
  };

  // validate a single field
  const validateField = async ({ key, sectionIndex }) => {
    try {
      const value = await yup.reach(formSchema, key).validate(form[key]);
    } catch (fieldError) {
      console.log('field error', fieldError);
      if (fieldError.inner) {
        console.log('eh');
      }
      const message = fieldError.inner
        ? fieldError.inner[fieldError.inner.length - 1].message
        : fieldError.message;
      console.log('mes', message);
      setErrors(errors.map((error, index) => (index === sectionIndex ? validationErrors : error)));
    }
  };

  const validateForm = () => console.log('validate form');

  return {
    errors,
    data,
    setData,
    deleteSection,
    createSection,
    validateField,
    validateForm,
  };
};

// TODO: width is spanning all the way acaross? maybe use button?
// styled(spin) ${theme.typographg.paragray}
const AddSection = styled('div')`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${({ disabled, theme }) => (disabled ? '#d0d1d8' : theme.colors.accent2_dark)};
  margin-top: 14px;

  &:hover {
    cursor: pointer;
  }
`;

const createUserInput = formData => ({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
});

const user = { firstName: '', lastName: '', email: '', role: '' };

const AddUserModal = ({}) => {
  const [disabled, setDisabled] = React.useState(false);

  const [isValidated, setIsValidated] = React.useState(false);

  const {
    errors: validationErrors,
    data: form,
    setData,
    setErrors,
    deleteSection,
    createSection,
    validateField,
    validateForm,
  } = useFormHook({ initialFields: user, schema: AddUserSchema });

  console.log('hook data', validationErrors, form);

  const submitForm = async () => {
    const isFormValid = await validateForm();
    console.log('validate form', isFormValid);

    if (isFormValid) {
      console.log('form is valid');
      //const result = sendCreateUser();
    } else {
      console.log('form invalid', validationErrors);
    }
  };

  /*
    const validation = { ...validationErrors[currentIndex], [key]: error };

    setValidationErrors(
      validationErrors.map((error, index) => (index === currentIndex ? validation : error)),
    );

    // is valid?
    console.log('validate field', key, currentIndex, error, validationErrors);
  };

  /*

  const validateForm = () =>
    new Promise(async (resolve, reject) => {
      let isFormValid = true;
      formData.forEach((section, index) =>
        Object.keys(section).forEach(key => {
          const isFieldValid = validateField({ key, data: section, currentIndex: index });
          isFormValid = isFormValid && isFieldValid;
        }),
      );
      resolve(isFormValid);
    });
*/

  const addSection = async () => {
    // check if last section is blank
    const data = form[form.length - 1];
    try {
      const value = await AddUserSchema.validate(data);
      createSection(user);
    } catch (e) {
      console.log('error: last section is empty');
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
      actionDisabled={isValidated}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      {form.map((data, currentIndex) => {
        return (
          <UserSection
            key={currentIndex}
            user={data}
            onChange={(key, val) => setData({ key, val, index: currentIndex })}
            validateField={key => validateField({ key, currentIndex })}
            errors={validationErrors[currentIndex]}
            deleteSelf={form.length > 1 ? () => removeSection(currentIndex) : null}
          />
        );
      })}
      <AddSection variant="text" disabled={disabled}>
        <Icon
          name="plus_circle"
          fill={disabled ? '#cecfd3' : 'accent2'}
          css={css`
            margin-right: 3px;
          `}
        />
        <Typography onClick={() => addSection()} variant="paragraph" component="span">
          Add another
        </Typography>
      </AddSection>
    </Modal>
  );
};

export default AddUserModal;
