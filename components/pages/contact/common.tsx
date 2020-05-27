import yup from 'global/utils/validations';

export type ContactCategoryKey =
  | 'APPLYING_ACCESS'
  | 'DATA_DOWNLOAD'
  | 'DATA_SUBMISSION'
  | 'DATA_QUERY'
  | 'MEDIA_QUERY'
  | 'PUBLICATION_QUERY'
  | 'OTHER';

export const CONTACT_CATEGORY_OPTIONS: Array<{ content: string; value: ContactCategoryKey }> = [
  {
    content: 'Applying for Access to Controlled Data through DACO',
    value: 'APPLYING_ACCESS',
  },
  { content: 'Data Download', value: 'DATA_DOWNLOAD' },
  { content: 'Data Submission', value: 'DATA_SUBMISSION' },
  { content: 'Data or Analysis Query', value: 'DATA_QUERY' },
  { content: 'Media or Collaboration Inquiry', value: 'MEDIA_QUERY' },
  { content: 'Publication Inquiry', value: 'PUBLICATION_QUERY' },
  { content: 'Other', value: 'OTHER' },
];

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
