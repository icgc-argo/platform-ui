import React from 'react';
import InputLabel from 'uikit/form/InputLabel';
import MultiSelect from 'uikit/form/MultiSelect';
import Input from 'uikit/form/Input';
import FormControl from 'uikit/form/FormControl';
import styled from '@emotion/styled';
import { keyBy, uniqueId } from 'lodash';

export const FormContext = React.createContext();

/**
 * - hold dirty form state
 * - using context because inputs might be deeply nested
 */
const FormProvider = ({ children, fields }) => {
  // create field values array
  const keyedFields = fields.map(f => ({ ...f, key: uniqueId() }));
  const [fieldValues, setFieldValues] = React.useState(
    keyedFields.map(({ key, value }) => ({ value, key })),
  );

  // create field types map
  const fieldTypes = keyBy(keyedFields.map(({ component, key }) => ({ component, key })), 'key');

  return (
    <FormContext.Provider value={{ fieldValues, setFieldValues, fieldTypes }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
