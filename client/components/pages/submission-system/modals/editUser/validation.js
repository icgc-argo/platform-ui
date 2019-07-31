import * as yup from 'yup';
import { role } from 'global/utils/form/validations';

const editUserSchema = yup.object().shape({
  role,
});

export default editUserSchema;
