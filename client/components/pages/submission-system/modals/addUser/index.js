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

// $FlowFixMe .gql file not supported
import { INVITE_USER_MUTATION } from './mutations.gql';

const useFormHook = ({ initialFields, schema: formSchema }) => {
  const [form, setForm] = useState({ errors: [initialFields], data: [initialFields] });
  const [touched, setTouched] = useState(false);
  const { errors, data } = form;

  const hasErrors = errors
    .map(section => Object.values(section))
    .flat()
    .some(x => x);

  // set form data
  const setData = ({ key, val, index }) => {
    if (!touched) setTouched(true);

    setForm({
      ...form,
      data: data.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });
  };

  // set single error
  const setError = ({ key, val, index }) => {
    setForm({
      ...form,
      errors: errors.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });
  };

  // set all errors
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

  // validate a section
  const validateSection = async ({ index }) =>
    new Promise(async (resolve, reject) => {
      const section = data[index];
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
        reject(validationErrors);
      }
    });

  // validates entire form
  const validateForm = () =>
    Promise.all(
      data.map(
        (section, index) =>
          new Promise(async (resolve, reject) => await validateSection({ index })),
      ),
    );

  return {
    errors,
    data,
    setData,
    deleteSection,
    createSection,
    validateField,
    validateSection,
    validateForm,
    touched,
    hasErrors,
  };
};

const user = { firstName: '', lastName: '', email: '', role: '' };

const AddSection = styled(Button)`
  text-transform: uppercase;
  color: ${({ disabled, theme }) => (disabled ? '#d0d1d8' : theme.colors.accent2_dark)};
  margin-top: 14px;
`;

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
