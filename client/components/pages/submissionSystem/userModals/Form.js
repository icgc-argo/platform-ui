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
 * -update dirty form state
 * -make sure onChange is debounced
 * -update parent
 */

/**
 * form field
 * - field: User
 * - component: used to render
 * - value: ''
 * work for basic as well as composite, lot of detail in updater func
 */
const Form = ({ update, setValidated }) => {
  const { fieldValues, fieldTypes } = React.useContext(FormContext);
  console.log('fv', fieldValues, 'ft', fieldTypes);

  return (
    <div>
      {fieldValues.map(f => {
        const Component = fieldTypes[f.key].component;
        return <Component value={f.value} />;
      })}
    </div>
  );
};

//

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

export default Form;
