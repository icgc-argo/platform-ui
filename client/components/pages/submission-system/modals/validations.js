import * as yup from 'yup';
import { PROGRAM_MEMBERSHIP_TYPES } from '../../../../global/constants/index';

const testGsuite = async email => {
  // await fetch......
  console.log('gsuite test', email);
  return true;
};

const firstName = yup
  .string()
  .label('First name')
  .trim()
  .required('Please fill in first name');

const lastName = yup
  .string()
  .label('Last name')
  .trim()
  .required('Please fill in last name');

const email = yup
  .string()
  .label('Email')
  .trim()
  .test('is-gsuite', 'email is not gsuite', testGsuite)
  .required('Please fill in email');

const role = yup
  .string()
  .label('Role')
  .oneOf(PROGRAM_MEMBERSHIP_TYPES.map(type => type.value), 'Invalid Membership Type provided.')
  .required();

export const addUserSchema = yup.object().shape({
  firstName,
  lastName,
  email,
  role,
});

export const editUserSchema = yup.object().shape({
  firstName,
  lastName,
  role,
});
