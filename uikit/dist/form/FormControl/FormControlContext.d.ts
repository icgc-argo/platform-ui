import React from 'react';
declare const FormControlContext: React.Context<{
  disabled?: boolean;
  error?: string | boolean;
  focused?: boolean;
  handleFocus?: () => any;
  handleBlur?: () => any;
  required?: boolean;
}>;
export default FormControlContext;
