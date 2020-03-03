import * as yup from 'yup';

const requiredMsg = '${label} is a required field.';

yup.setLocale({
  mixed: {
    required: requiredMsg,
    oneOf: requiredMsg,
  },
  string: {
    email: 'Please enter a valid email address.',
    url: 'Please enter a valid url.',
    min: '${label} must be at least ${min} characters.',
  },
  number: {
    lessThan: '${label} must be less than ${less}',
    moreThan: '${label} must be greater than ${more}',
    min: '${label} may be at least ${min}',
    max: '${label} may be at most ${max}',
  },
});

export default yup;
