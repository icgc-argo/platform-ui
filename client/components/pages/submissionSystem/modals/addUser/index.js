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
    console.log('validate field', key, formData);
    if (key === 'firstName') {
      const schema = yup.reach(AddUserSchema, 'firstName');
      try {
        const value = await schema.validate(formData['firstName']);
        console.log('validating firstname', value);
      } catch (errors) {
        console.log('validation failed', errors);
        const validationError = { ...validationErrors[currentIndex], firstName: errors.message };
        setValidationErrors(
          validationErrors.map((error, index) =>
            index === currentIndex ? validationError : error,
          ),
        );
        return false;
      }
    }
  };

  const validateForm = () => {
    // YP full schema
  };

  const addSection = () => {
    //if(canAdd)
    setFormData(formData.concat(user));
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
      {formState.map((data, currentIndex) => {
        console.log('user', errors);
        return (
          <UserSection
            user={data}
            onChange={(key, val) =>
              setFormState(
                formState.map((field, i) => (i === currentIndex ? { [key]: val } : field)),
              )
            }
            validate={validateForm}
            errors={errors[currentIndex]}
            deleteSelf={() => deleteSection(currentIndex)}
            deleteAllowed={formState.length > 1}
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
