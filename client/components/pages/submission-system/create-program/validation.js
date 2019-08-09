import * as yup from 'yup';
import {
  PROGRAM_MEMBERSHIP_TYPES,
  COUNTRIES,
  RDC_NAMES,
  PRIMARY_SITES,
  CANCER_TYPES,
} from 'global/constants';
import { requiredError, mustHaveMoreThanZeroError } from 'global/utils/form/error';

/* Validation Schema for Create Program Form */

export default yup.object().shape({
  programName: yup
    .string()
    .label('Program Name')
    .trim()
    .required(requiredError('Program Name')),
  shortName: yup
    .string()
    .label('Short Name')
    .trim()
    .test('ends-in-country-code', 'Short Name must end with a valid country code.', value => {
      const providedCode = value.slice ? value.slice(-2) : null;
      return !!COUNTRIES.find(country => country.code === providedCode);
    })
    .matches(/-([A-Z][A-Z])$/, 'Short Name must end with a 2 character country code: "-XX"')
    .matches(/^[A-Z1-9]/, 'Short Name must begin with an uppercase letter or a number')
    .matches(
      /^[-_A-Z1-9]+$/,
      'Short Name can only contain uppercase letters, numbers, hyphens, and underscores',
    )
    .max(11)
    .min(6, 'Short Name must be at least 6 characters long, of the form XXX-XX')
    .required(requiredError('Short Name')),
  countries: yup
    .array()
    .of(yup.string().oneOf(COUNTRIES.map(country => country.name)))
    .min(1, mustHaveMoreThanZeroError('Countries'))
    .required(),
  cancerTypes: yup
    .array()
    .of(yup.string().oneOf(CANCER_TYPES))
    .min(1, mustHaveMoreThanZeroError('Cancer Types'))
    .required(),
  primarySites: yup
    .array()
    .of(yup.string().oneOf(PRIMARY_SITES))
    .label('Primary Sites')
    .min(1, mustHaveMoreThanZeroError('Primary Sites'))
    .required(),
  commitmentLevel: yup
    .number()
    .label('Commitment Level')
    .moreThan(0)
    .required(requiredError('Commitment Level')),
  institutions: yup
    .array()
    .of(yup.string())
    .label('Institutions')
    .min(1, mustHaveMoreThanZeroError('Institutions'))
    .required(),
  membershipType: yup
    .string()
    .label('Membership Type')
    .oneOf(PROGRAM_MEMBERSHIP_TYPES.map(type => type.value), requiredError('Membership Type'))
    .required(),
  website: yup
    .string()
    .label('Website')
    .trim()
    .url(),
  description: yup
    .string()
    .label('Description')
    .trim(),
  processingRegions: yup
    .array()
    .of(yup.string())
    .label('Processing Regions')
    .required()
    .min(1, mustHaveMoreThanZeroError('Processing Regions')),
  adminFirstName: yup
    .string()
    .label(`Administrator's First Name`)
    .trim()
    .required(requiredError(`Administrator's First Name`)),
  adminLastName: yup
    .string()
    .label(`Administrator's Last Name`)
    .trim()
    .required(requiredError(`Administrator's Last Name`)),
  adminEmail: yup
    .string()
    .label(`Administrator's Email`)
    .trim()
    .email()
    .required(requiredError(`Administrator's Email`)),
});

export const updateProgramSchema = yup.object().shape({
  programName: yup
    .string()
    .label('Program Name')
    .trim()
    .required(),
  shortName: yup
    .string()
    .label('Short Name')
    .trim()
    .test('ends-in-country-code', 'Short Name must end with a valid country code.', value => {
      const providedCode = value.slice ? value.slice(-2) : null;
      return !!COUNTRIES.find(country => country.code === providedCode);
    })
    .matches(/-([A-Z][A-Z])$/, 'Short Name must end with a 2 character country code: "-XX"')
    .matches(/^[A-Z1-9]/, 'Short Name must begin with an uppercase letter or a number')
    .matches(/^[-A-Z1-9]+$/, 'Short Name can only contain uppercase letters, numbers, and hyphens')
    .max(11)
    .required(),
  countries: yup
    .array()
    .of(yup.string().oneOf(COUNTRIES.map(country => country.name)))
    .label('Countries')
    .required()
    .min(1),
  cancerTypes: yup
    .array()
    .of(yup.string().oneOf(CANCER_TYPES))
    .label('Cancer Types')
    .required()
    .min(1),
  primarySites: yup
    .array()
    .of(yup.string().oneOf(PRIMARY_SITES))
    .label('Primary Sites')
    .required()
    .min(1),
  commitmentLevel: yup
    .number()
    .label('Commitment Level')
    .moreThan(0)
    .required(),
  institutions: yup
    .array()
    .of(yup.string())
    .label('Institutions')
    .required()
    .min(1),
  membershipType: yup
    .string()
    .label('Membership Type')
    .oneOf(PROGRAM_MEMBERSHIP_TYPES.map(type => type.value), 'Invalid Membership Type provided.')
    .required(),
  website: yup
    .string()
    .label('Website')
    .trim()
    .url(),
  description: yup
    .string()
    .label('Description')
    .trim(),
  processingRegions: yup
    .array()
    .of(yup.string())
    .label('Processing Regions')
    .required()
    .min(1),
});
