import * as yup from 'yup';

const AddUserSchema = yup.object().shape({
  firstName: yup.string().required('Please fill in first name'),
  lastName: yup.string().required('Please fill in last name'),
  email: yup.string().required('Please fill in email'),
});

export default AddUserSchema;
