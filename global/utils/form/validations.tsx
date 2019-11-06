import yup from 'global/utils/validations';
import { PROGRAM_USER_ROLES, RoleKey } from 'global/constants/index';
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
  .oneOf(PROGRAM_USER_ROLES.map(type => type.value)) as yup.StringSchema<RoleKey>;
