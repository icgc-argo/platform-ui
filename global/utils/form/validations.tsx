import yup from 'global/utils/validations';
import {
  PROGRAM_USER_ROLES,
  RoleKey,
  CONTACT_CATEGORY_OPTIONS,
  ContactCategoryKey,
} from 'global/constants/index';
import { PROGRAM_MEMBERSHIP_TYPES } from 'global/constants/index';
import { requiredError, validEmail } from 'global/utils/form/error';

export const firstName = yup
  .string()
  .label('First name')
  .trim()
  .required();

export const lastName = yup
  .string()
  .label('Last name')
  .trim()
  .required();

export const email = yup
  .string()
  .email(validEmail)
  .label('Email')
  .trim()
  .required();

export const role = yup
  .string()
  .label('Role')
  // Drop down selector makes the value null if you do not select, the transform makes the null into a string to fix error messaging
  .transform((value, original) => (value === null ? '' : value))
  .oneOf(PROGRAM_USER_ROLES.map(type => type.value)) as yup.StringSchema<RoleKey>;

export const messageCategory = yup
  .string()
  .label('Assistance Type')
  .transform((value, original) => (value === null ? '' : value))
  .oneOf(CONTACT_CATEGORY_OPTIONS.map(type => type.value)) as yup.StringSchema<ContactCategoryKey>;

export const messageDescription = yup
  .string()
  .label('Your message')
  .trim()
  .required();

export const reCaptcha = yup
  .string()
  .trim()
  .label('reCaptcha')
  .transform((value, original) => (value === null ? '' : value))
  .required('Please complete the reCAPTCHA challenge.');
