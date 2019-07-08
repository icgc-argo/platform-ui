import React from 'react';
import styled from '@emotion/styled';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import css from '@emotion/css';
import UserSection from './userSection';
import AddUserSchema from './formSchema';
import * as yup from 'yup';

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

  const user = { firstName: '', lastName: '', email: '' };

  const [isValidated, setIsValidated] = React.useState(false);
  const [formData, setFormData] = React.useState([user]);
  const [validationErrors, setValidationErrors] = React.useState([user]);

  const submitForm = formData => {
    // TODO: validate
    const result = sendCreateUser();
  };

  //  const sendCreateUser = useMutation(CREATE_PROGRAM_MUTATION, {
  //    variables: { program: createProgramInput(formData) },
  //  });

  //const [formData, setformData, validate, errors]

  const validateField = async ({ key, data: formData, currentIndex }) => {
    const schema = yup.reach(AddUserSchema, key);
    let error = '';

    try {
      const value = await schema.validate(formData[key]);
      console.log(`validating ${key}`, value);
    } catch (errors) {
      console.log('validation failed', errors);
      error = errors.message;
    }
    const validation = { ...validationErrors[currentIndex], [key]: error };

    setValidationErrors(
      validationErrors.map((error, index) => (index === currentIndex ? validation : error)),
    );
  };

  const validateForm = () => {
    // YP full schema
  };

  const addSection = async () => {
    // check if last section is blank
    const data = formData[formData.length - 1];
    try {
      const value = await AddUserSchema.validate(data);
      setFormData(formData.concat(user));
    } catch (e) {
      console.log('error: last section is empty');
    }
  };

  const deleteSection = index => {
    if (formData.length <= 1) return false;
    const newS = formData.filter((f, i) => i !== index);
    setFormData(newS);
  };

  return (
    <Modal
      title="Add Users"
      actionButtonText="Add Users"
      cancelText="Cancel"
      onActionClick={() => console.log('on action click')}
      actionDisabled={isValidated}
    >
      When you add users, they will receive an email inviting them to register. Note: the provided
      email address must be a Gmail or G Suite email address for login purposes.
      {formData.map((data, currentIndex) => {
        return (
          <UserSection
            user={data}
            onChange={(key, val) =>
              setFormData(
                formData.map((field, i) => (i === currentIndex ? { ...field, [key]: val } : field)),
              )
            }
            validateField={key => validateField({ key, data, currentIndex })}
            errors={validationErrors[currentIndex]}
            deleteSelf={() => deleteSection(currentIndex)}
            deleteAllowed={formData.length > 1}
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
