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
 *  essentially our external api plus checking
 *
 *
 * type to make Form resuable
 *
 */

/**
 * -validate dirty form state
 * -update dirty form state ( really children should do this, context)
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
 *
 * write some tests
 * new PR
 */
const Form = ({ setCleanFormData, setValidated }) => {
  const { fieldValues, setFieldValues, fieldTypes } = React.useContext(FormContext);
  console.log('fv', fieldValues, 'ft', fieldTypes);

  return (
    <div>
      {fieldValues.map(({ value, key }) => {
        // get form component
        const Component = fieldTypes[key].component;

        // update form el
        const updateForm = (currentKey, value) =>
          setFieldValues(
            fieldValues.map(field => (currentKey === field.key ? { ...field, value } : field)),
          );

        // updateForm expects the type of value mutataed given back to it
        return <Component formData={value} updateForm={value => updateForm(key, value)} />;
      })}
    </div>
  );
};
/**
 * return Component looks a lot like context.
 * can we just use FormProvider and not need Form?
 */

// hook or until  to generate
const field = {
  key: '',
  validator: '',
  component: '',
};

const fieldValues = {
  key: '',
  value: '',
};

/**
 * Once a component takes a formData and updateForm prop do what you will
 */

export default Form;
