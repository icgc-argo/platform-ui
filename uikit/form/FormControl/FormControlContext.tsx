import React from 'react';

const FormControlContext = React.createContext<{
  disabled?: boolean;
  error?: boolean;
}>({});

export default FormControlContext;
