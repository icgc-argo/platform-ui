import * as yup from 'yup';

const testGsuite = async email => {
  // await fetch......
  console.log('gsuite test', email);
  return true;
};

const AddUserSchema = yup.object().shape({
  firstName: yup.string().required('Please fill in first name'),
  lastName: yup.string().required('Please fill in last name'),
  email: yup
    .string()
    .required('Please fill in email')
    .test('is-gsuite', 'email is not gsuite', testGsuite),
});

export default AddUserSchema;
