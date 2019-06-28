import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import styled from '@emotion/styled';
import { keyBy } from 'lodash';

export const FormContext = React.createContext();

/**
 * - hold dirty form state
 * - using context because inputs might be deeply nested
 */
const FormProvider = ({ children, fields }) => {
  // dirty form state
  // get values from fields, unique keys
  const [fieldValues, setFieldValues] = React.useState(
    fields.map(f => ({ value: f.value, key: f.key })),
  );

  const fieldTypes = keyBy(fields.map(f => ({ component: f.component, key: f.key })), 'key');

  console.log('form providor', fieldValues, fieldTypes);
  return (
    <FormContext.Provider value={{ fieldValues, setFieldValues, fieldTypes }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
