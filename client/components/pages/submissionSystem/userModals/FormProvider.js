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
  // create field values array to map values (will update more than fieldTypes)
  console.log('fields', fields);
  const [fieldValues, setFieldValues] = React.useState(
    fields.map(({ key, value }) => ({ key, value })),
  );

  // create field types map to map components
  const [fieldTypes, setFieldTypes] = React.useState(
    keyBy(fields.map(({ key, component }) => ({ key, component })), 'key'),
  );

  // AddField - adds dynamic el to form
  const addField = field => {
    const key = uniqueId();
    const { value, component } = field;
    const fieldType = { key, component };
    const fieldValue = { key, value };
    setFieldValues([...fieldValues, fieldValue]);
    setFieldTypes({ ...fieldTypes, [key]: fieldType });
  };

  console.log('FormProvider', 'fieldValues', fieldValues, 'fieldTypes', fieldTypes);
  return (
    <FormContext.Provider value={{ fieldValues, setFieldValues, fieldTypes, addField }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;

/**
 * Add field allows dynamically adding fields to form
 */
export const AddField = ({ field, children }) => {
  // validate field?
  const context = React.useContext(FormContext);

  return <div onClick={() => context.addField(field)}>{children}</div>;
};
