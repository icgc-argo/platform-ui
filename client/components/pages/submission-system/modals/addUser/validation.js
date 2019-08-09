import * as yup from 'yup';
import { firstName, lastName, email, role } from 'global/utils/form/validations';

const addUserSchema = yup.object().shape({
  firstName,
  lastName,
  email,
  role,
});

export default addUserSchema;
