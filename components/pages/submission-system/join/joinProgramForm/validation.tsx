
import * as yup from 'yup';

export default yup.object().shape({
  institutions: yup
    .array()
    .default([])
    .required(),
  piFirstName: yup
    .string()
    .default('')
    .required(),
  piLastName: yup
    .string()
    .default('')
    .required(),
  department: yup
    .string()
    .default('')
    .required(),
});
