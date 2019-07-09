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

// TODO: can i pass any data to this hook?
const useFormHook = initialFields => {
  const [form, setForm] = useState({ errors: [initialFields], data: [initialFields] });
  const { errors, data } = form;

  const addField = () => {
    console.log('add field');
    // setForm();
  };

  const setData = ({ key, val, index }) =>
    setForm({
      ...form,
      data: form.data.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });

  const deleteSection = deletedIndex => {
    const filterDeleted = (item, index) => index !== deletedIndex;
    setForm({
      errors: form.errors.filter(filterDeleted),
      data: form.data.filter(filterDeleted),
    });
  };

  const createSection = sectionFields => {
    setForm({
      errors: form.errors.concat(sectionFields),
      data: form.data.concat(sectionFields),
    });
  };

  return {
    errors,
    data,
    setData,
    deleteSection,
    createSection,
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

const AddUserModal = ({}) => {
  const [disabled, setDisabled] = React.useState(false);

  const user = { firstName: 'a', lastName: 'b', email: 'c', role: 'x' };

  const [isValidated, setIsValidated] = React.useState(false);
  //  const [formData, setFormData] = React.useState([user]);
  //  const [validationErrors, setValidationErrors] = React.useState([user]);

  const {
    errors: validationErrors,
    data: form,
    setData,
    setErrors,
    deleteSection,
    createSection,
  } = useFormHook(user);

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
  const validateField = async ({ key, data: formData, currentIndex }) => {
    const schema = yup.reach(AddUserSchema, key);
    let error = '';

    try {
      const value = await schema.validate(formData[key]);
    } catch (errors) {
      error = errors.message;
    }
    const validation = { ...validationErrors[currentIndex], [key]: error };

    setValidationErrors(
      validationErrors.map((error, index) => (index === currentIndex ? validation : error)),
    );

    // is valid?
    console.log('validate field', key, currentIndex, error, validationErrors);
  };

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
      //    const value = await AddUserSchema.validate(data);
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
            //   validateField={key => validateField({ key, data, currentIndex })}
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
