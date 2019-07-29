import * as yup from 'yup';
import { PROGRAM_MEMBERSHIP_TYPES } from 'global/constants/index';
import { requiredError } from 'global/utils/form';

const testGsuite = async email => {
  // await fetch......
  console.log('gsuite test', email);
  return true;
};

const firstName = yup
  .string()
  .label('First name')
  .trim()
  .required(requiredError('First Name'));

const lastName = yup
  .string()
  .label('Last name')
  .trim()
  .required(requiredError('Last Name'));

const email = yup
  .string()
  .label('Email')
  .trim()
  .test('is-gsuite', 'email is not gsuite', testGsuite)
  .required(requiredError('Email Address'));

const role = yup
  .string()
  .label('Role')
  .oneOf(PROGRAM_MEMBERSHIP_TYPES.map(type => type.value), requiredError('Role'));

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
