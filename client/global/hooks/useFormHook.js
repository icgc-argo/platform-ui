// @flow
import React, { useState } from 'react';
import { get, isArray, flattenDeep } from 'lodash';
import * as yup from 'yup';
type FormData = {
  key: string,
  val: mixed,
};

/**
 * Supports single forms only, {} not [{},{}]
 */
const useFormHook = ({
  initialFields,
  schema: formSchema,
  disabledFields = [],
}: {
  initialFields: {},
  schema: {
    validate: typeof yup.object,
  },
  disabledFields: [],
}) => {
  let initErrors = {};

  for (let [key, value] of Object.entries(initialFields)) {
    initErrors[key] = '';
  }

  const [form, setForm] = useState({ errors: initErrors, data: initialFields });
  const [touched, setTouched] = useState(false);
  const { errors, data } = form;

  const hasErrors = Object.values(errors).some(x => x);

  // set form data
  const setData = ({ key, val }: FormData) => {
    if (!touched) setTouched(true);

    setForm({
      ...form,
      data: { ...data, [key]: val },
    });
  };

  // set all errors
  const setErrors = ({ validationErrors }) =>
    setForm({
      ...form,
      errors: { ...errors },
    });

  // set single error
  const setError = ({ key, val }: FormData) => {
    setForm({
      ...form,
      errors: { ...errors, [key]: val },
    });
  };

  // validate a single field
  const validateField = async ({ key }: { key: string }) => {
    try {
      const value = await yup.reach(formSchema, key).validate(data[key]);
      setError({ key, val: '' });
    } catch (fieldError) {
      const message =
        isArray(fieldError.inner) && fieldError.inner.length > 1
          ? fieldError.inner[fieldError.inner.length - 1].message
          : fieldError.message;

      setError({ key, val: message });
    }
  };

  // validates entire form
  const validateForm = (): Promise<any> =>
    new Promise(async (resolve, reject) => {
      console.log('VALIDATE FORM', formSchema, data);
      try {
        const validData = await formSchema.validate(data, {
          //abortEarly: false,
          stripUnknown: true,
        });
        console.log('valid data', validData);
        resolve(validData);
      } catch (formErrors) {
        const validationErrors = get(formErrors, 'inner', []).reduce((output, error) => {
          output[error.path] = error.message;
          return output;
        }, {});
        console.log('errors', formErrors, validationErrors);
        setErrors({ validationErrors });
        reject(validationErrors);
      }
    });

  return {
    errors,
    data,
    setData,
    validateField,
    validateForm,
    touched,
    hasErrors,
  };
};

export default useFormHook;
