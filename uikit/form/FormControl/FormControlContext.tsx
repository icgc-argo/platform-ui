import React from 'react';

const FormControlContext = React.createContext<{
  disabled?: boolean;
  error?: string | boolean;

  required?: boolean;
  focused?: boolean;
  handleFocus?: () => void;
  handleBlur?: () => any;
}>({});

export default FormControlContext;
