import * as yup from 'yup';

const AddUserSchema = yup.object().shape({
  firstName: yup.string().required('Please fill in name'),
});

export default AddUserSchema;
