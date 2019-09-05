import * as yup from 'yup';
import { PROGRAM_USER_ROLES } from 'global/constants/index';
import { PROGRAM_MEMBERSHIP_TYPES } from 'global/constants/index';
import { requiredError, validEmail } from 'global/utils/form/error';

export const testGsuite = async email => {
  // await fetch......
  // console.log('gsuite test', email);
  return true;
};

export const firstName = yup
  .string()
  .label('First name')
  .trim()
  .required(requiredError('First Name'));

export const lastName = yup
  .string()
  .label('Last name')
  .trim()
  .required(requiredError('Last Name'));

export const email = yup
  .string()
  .email(validEmail)
  .label('Email')
  .trim()
  .test('is-gsuite', 'email is not gsuite', testGsuite)
  .required(requiredError('Email Address'));

export const role = yup
  .string()
  .label('Role')
  .oneOf(PROGRAM_USER_ROLES.map(type => type.value), requiredError('Role'));
