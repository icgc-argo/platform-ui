import React, { useState } from 'react';
import { get, isArray, flattenDeep } from 'lodash';
import * as yup from 'yup';

/**
 * Each form is broken down into sections and fields
 * eg. [{name: 'John', age: 45}, {name: 'Pat', age: 54}]
 */

// assumes passing single init values and not array
const useFormHook = ({ initialFields, schema: formSchema, disabledFields }) => {
  const initErrors = [initialFields].map(section => {
    const field = {};
    for (let [key, value] of Object.entries(section)) {
      field[key] = '';
    }
    return field;
  });

  const [form, setForm] = useState({ errors: initErrors, data: [initialFields] });
  const [touched, setTouched] = useState(false);
  const { errors, data } = form;

  const hasErrors = flattenDeep(errors.map(section => Object.values(section))).some(x => x);

  // set form data
  const setData = ({ key, val, index = 0 }) => {
    if (!touched) setTouched(true);

    setForm({
      ...form,
      data: data.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });
  };

  // set single error
  const setError = ({ key, val, index = 0 }) => {
    setForm({
      ...form,
      errors: errors.map((field, i) => (i === index ? { ...field, [key]: val } : field)),
    });
  };

  // set all errors
  const setErrors = ({ validationErrors, index }) =>
    setForm({
      ...form,
      errors: errors.map((field, i) => (i === index ? validationErrors : field)),
    });

  // delete a block of values
  const deleteSection = deletedIndex => {
    const filterDeleted = (item, index) => index !== deletedIndex;
    setForm({
      errors: errors.filter(filterDeleted),
      data: data.filter(filterDeleted),
    });
  };

  // create a block of values
  const createSection = sectionFields => {
    setForm({
      errors: errors.concat(sectionFields),
      data: data.concat(sectionFields),
    });
  };

  // validate a single field
  const validateField = async ({ key, index = 0 }) => {
    try {
      const value = await yup.reach(formSchema, key).validate(data[index][key]);
      setError({ key, val: '', index });
    } catch (fieldError) {
      const message =
        isArray(fieldError.inner) && fieldError.inner.length > 1
          ? fieldError.inner[fieldError.inner.length - 1].message
          : fieldError.message;

      setError({ key, val: message, index });
    }
  };

  // validate a section
  const validateSection = async ({ index }) =>
    new Promise(async (resolve, reject) => {
      const section = data[index];

      try {
        const validData = await formSchema.validate(section, {
          abortEarly: false,
          stripUnknown: true,
        });
        resolve(validData);
      } catch (formErrors) {
        const validationErrors = get(formErrors, 'inner', []).reduce((output, error) => {
          output[error.path] = error.message;
          return output;
        }, {});

        setErrors({ validationErrors, index });
        reject(validationErrors);
      }
    });

  // validates entire form
  const validateForm = () =>
    Promise.all(
      data.map(
        (section, index) =>
          new Promise(async (resolve, reject) => {
            try {
              const validData = await validateSection({ index });
              resolve(validData);
            } catch (e) {
              reject();
            }
          }),
      ),
    );

  return {
    errors,
    data,
    setData,
    deleteSection,
    createSection,
    validateField,
    validateSection,
    validateForm,
    touched,
    hasErrors,
  };
};

export default useFormHook;
