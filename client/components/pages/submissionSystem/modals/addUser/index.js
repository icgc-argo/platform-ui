import React from 'react';
import styled from '@emotion/styled';
import Modal from 'uikit/Modal';
import Button from 'uikit/Button';
import Icon from 'uikit/Icon';
import Typography from 'uikit/Typography';
import css from '@emotion/css';
import UserSection from './userSection';
import { isValid } from 'date-fns';

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

/**
 * hooks, local form state
 */

const AddUserModal = ({}) => {
  const [disabled, setDisabled] = React.useState(false);

  const user = { fistName: '', lastName: '', email: '' };

  const [isValidated, setIsValidated] = React.useState(false);
  const [formState, setFormState] = React.useState([user]);
  const [errors, setErrors] = React.useState([user]);

  //const [formData, setFormState, validate, errors]

  /*
  const validate = (key, formData) => {
    const value = formData[key];
    if(val is blank)
    errors.firstName = value is blank
    else (invalid email) 
    errors.firstname = 'ivalid email'
  }*/

  const validateField = (key, formData) => {};

  const validateForm = () => {
    let errors = [];
    const reducer = (acc, currentVal) => acc && currentVal;
    const isValid = formState
      .map((field, index) => {
        errors = errors.concat({});
        console.log('field', field);
        const { firstName, lastName, email } = field;
        let isValid = true;
        if (firstName === '') {
          errors[index].firstName = 'String cant be blank';
          isValid = false;
        }

        if (lastName === '') {
          errors[index].lastName = 'Last name needs to be filled in';
          isValid = false;
        }

        if (email === '') {
          errors[index].email = 'email required';
          isValid = false;
        }

        return isValid;
      })
      .reduce(reducer);
    console.log('validate', isValid, errors);
    setErrors(errors);
    return isValid;
  };

  const addSection = () => {
    console.log('add section');
    //if(canAdd)
    setFormState(formState.concat(user));
  };

  const deleteSection = index => {
    if (formState.length <= 1) return false;
    const newS = formState.filter((f, i) => i !== index);
    console.log('remove section', index, newS);
    setFormState(newS);
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
