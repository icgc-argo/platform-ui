import * as yup from 'yup';

const testGsuite = async email => {
  // await fetch......
  console.log('gsuite test', email);
  return true;
};

const addUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .label('First name')
    .trim()
    .required('Please fill in first name'),
  lastName: yup
    .string()
    .label('Last name')
    .trim()
    .required('Please fill in last name'),
  email: yup
    .string()
    .label('Email')
    .trim()
    .test('is-gsuite', 'email is not gsuite', testGsuite)
    .required('Please fill in email'),
  role: yup
    .string()
    .label('Role')
    .oneOf(['v1', 'v2'])
    .required(),
});

export default addUserSchema;
