import yup from 'global/utils/validations';

export default yup.object().shape({
  institutions: yup
    .array()
    .of(yup.string().trim())
    .label('Institutions')
    .required(),
  piFirstName: yup
    .string()
    .trim()
    .label('PI First Name')
    .required(),
  piLastName: yup
    .string()
    .trim()
    .label('PI Last Name')
    .required(),
  department: yup
    .string()
    .trim()
    .label('Department')
    .required(),
});
