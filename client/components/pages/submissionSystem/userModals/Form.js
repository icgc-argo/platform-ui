import React from 'react';
import { FormContext } from './FormProvider';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import styled from '@emotion/styled';
import FormControl from 'uikit/form/FormControl';
import UserSection from './UserSection';

// TODO: some kind aof form obejcts with validation

/**
 * Form to add and edit users
 * setValidated => allow other components to know when validate
 * update => to set our validated state outside component (most forms post) // TODO FormSender?
 *  essentially our external api plus validation
 *
 *
 * type to make Form resuable
 *
 */

/**
 * -validate dirty form state
 * -update dirty form state ( really  children  do this via context)
 * -make sure onChange is debounced
 * -update parent only when clean and validated
 */

/**
 * form field
 * - field: User
 * - component: used to render
 * - value: ''
 *
 *
 *
 *
 * work for basic as well as composite, lot of detail in updater func
 * memoize!!!!!!!!!!!!!
 *
 * any form input once it uses changeForm and form data
 *
 */
const Form = ({ setCleanFormData, setValidated }) => {
  const { fieldValues, setFieldValues, fieldTypes } = React.useContext(FormContext);
  console.log('Form', 'fv', fieldValues, 'ft', fieldTypes);

  // update form el
  const updateForm = (currentKey, value) => {
    console.log('update form', currentKey, value);
    // TODO: validate for parent
    // TODO: pass error down to inputs to deal with err msg + styling
    setFieldValues(
      fieldValues.map(field => (currentKey === field.key ? { ...field, value } : field)),
    );
  };

  return (
    <div>
      {fieldValues.map(({ value, key }) => {
        // get form component and validator
        const { component: Component, validator } = fieldTypes[key];

        // updateForm expects the type of value mutataed given back to it
        return (
          <Component formData={value} updateForm={value => updateForm(key, value, validator)} />
        );
      })}
    </div>
  );
};

// hook or until  to generate
const field = {
  key: '',
  validator: '', // YUP do it here or someplace else?
  component: '',
};

const fieldValues = {
  key: '',
  value: '',
  isValid: false,
};

/**
 * Once a component takes a formData and updateForm prop do what you will
 */

export default Form;

/**
 * So a form element will receive key, value and if the value is valid based on its valdiator - oof wordy
 *default validate on submit
 **/
