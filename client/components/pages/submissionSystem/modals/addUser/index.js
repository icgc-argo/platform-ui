import React, { useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import css from '@emotion/css';
import UserSection from './userSection';
import * as yup from 'yup';
import { get, isArray } from 'lodash';
import addUserSchema from './validations';

const useFormHook = ({ initialFields, schema: formSchema }) => {
  const [form, setForm] = useState({ errors: [initialFields], data: [initialFields] });
  const { errors, data } = form;

  // set form data
  const setData = ({ key, val, index }) =>
    setForm({
      ...form,
      data: data.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });

  const setError = ({ key, val, index }) => {
    console.log('set error', key, val, index);
    setForm({
      ...form,
      errors: errors.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });
  };

  const setErrors = ({ validationErrors, index }) =>
    setForm({
      ...form,
      errors: errors.map((field, i) => (i === index ? validationErrors : field)),
    });

  // delete a block of values
  const deleteSection = deletedIndex => {
    const filterDeleted = (item, index) => index !== deletedIndex;
    setForm({
      errors: errors.filter(filterDeleted),
      data: data.filter(filterDeleted),
    });
  };

  // create a block of values
  const createSection = sectionFields => {
    setForm({
      errors: errors.concat(sectionFields),
      data: data.concat(sectionFields),
    });
  };

  // validate a single field
  const validateField = async ({ key, index }) => {
    try {
      const value = await yup.reach(formSchema, key).validate(data[index][key]);
      setError({ key, val: '', index });
    } catch (fieldError) {
      const message =
        isArray(fieldError.inner) && fieldError.inner.length > 1
          ? fieldError.inner[fieldError.inner.length - 1].message
          : fieldError.message;

      setError({ key, val: message, index });
    }
  };

  const validateForm = () =>
    Promise.all(
      data.map(
        (section, index) =>
          new Promise(async (resolve, reject) => {
            try {
              const validData = await addUserSchema.validate(section, {
                abortEarly: false,
                stripUnknown: true,
              });
              resolve(validData);
            } catch (formErrors) {
              const validationErrors = get(formErrors, 'inner', []).reduce((output, error) => {
                output[error.path] = error.message;
                return output;
              }, {});

              setErrors({ validationErrors, index });
            }
          }),
      ),
    );

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

const user = { firstName: '', lastName: '', email: '', role: '' };

const AddUserModal = ({}) => {
  const [disabled, setDisabled] = React.useState(false);

  const [isValidated, setIsValidated] = React.useState(false);

  const {
    errors: validationErrors,
    data: form,
    setData,
    setError,
    deleteSection,
    createSection,
    validateField,
    validateForm,
  } = useFormHook({ initialFields: user, schema: addUserSchema });

  const submitForm = async () => {
    try {
      validData = await validateForm();
      console.log(validData);
      // Send data
    } catch (err) {
      console.log(err);
    }
  };

  const addSection = async () => {
    // check if last section is blank
    const data = form[form.length - 1];
    try {
      const value = await addUserSchema.validate(data);
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
            validateField={key => validateField({ key, index: currentIndex })}
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
