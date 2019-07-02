import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import { keyBy, uniqueId } from 'lodash';

export const FormContext = React.createContext();

/**
 * - hold dirty form state
 * - using context because inputs might be deeply nested
 *
 * fieldValues = {key, value}
 * fieldTypes = {key, component}
 */
const FormProvider = ({ children, fields }) => {
  // create field values array
  console.log('fields', fields);
  const [fieldValues, setFieldValues] = React.useState(
    fields.map(({ key, value }) => ({ value, key })),
  );

  // create field types map
  const fieldTypes = keyBy(fields.map(({ component, key }) => ({ component, key })), 'key');

  console.log('FormProvider', 'fieldValues', fieldValues, 'fieldTypes', fieldTypes);
  return (
    <FormContext.Provider value={{ fieldValues, setFieldValues, fieldTypes }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
