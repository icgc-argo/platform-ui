import yup from 'global/utils/validations';
import { CANCER_TYPES, COUNTRIES, PRIMARY_SITES, PROGRAM_MEMBERSHIP_TYPES } from 'global/constants';

const baseValidations = yup.object().shape({
  programName: yup
    .string()
    .label('Program Name')
    .trim()
    .required(),
  shortName: yup
    .string()
    .label('Short Name')
    .trim()
    .test('ends-in-country-code', '${label} must end with a valid country code.', value => {
      const providedCode = value.slice ? value.slice(-2) : null;
      return !!COUNTRIES.find(country => country.code === providedCode);
    })
    .matches(/-([A-Z][A-Z])$/, '${label} must end with a 2 character country code: "-XX"')
    .matches(/^[A-Z0-9]/, '${label} must begin with an uppercase letter or a number')
    .matches(
      /^[A-Z0-9_-]+$/,
      '${label} can only contain uppercase letters, numbers, hyphens, and underscores',
    )
    .max(11)
    .min(6)
    .required(),
  countries: yup
    .array()
    .of(yup.string())
    .label('Countries')
    .required(),
  cancerTypes: yup
    .array()
    .of(yup.string())
    .label('Cancer Types')
    .required(),
  primarySites: yup
    .array()
    .of(yup.string())
    .label('Primary Sites')
    .required(),
  commitmentLevel: yup
    .number()
    .label('Commitment Level')
    .moreThan(0)
    .required(),
  institutions: yup
    .array()
    .of(yup.string())
    .label('Institutions')
    .required(),
  membershipType: yup
    .string()
    .label('Membership Type')
    .oneOf(PROGRAM_MEMBERSHIP_TYPES.map(type => type.value))
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
    .required(),
});

const adminValidations = yup.object().shape({
  adminFirstName: yup
    .string()
    .label(`Administrator's First Name`)
    .trim()
    .required(),
  adminLastName: yup
    .string()
    .label(`Administrator's Last Name`)
    .trim()
    .required(),
  adminEmail: yup
    .string()
    .label(`Administrator's Email`)
    .trim()
    .email()
    .required(),
});

export const createProgramSchema = baseValidations.concat(adminValidations);
export const updateProgramSchema = baseValidations;
