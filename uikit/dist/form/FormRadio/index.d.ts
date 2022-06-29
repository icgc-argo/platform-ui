import React from 'react';
/**
 * FormRadio to be used with RadioCheckboxGroup
 */
declare const FormRadio: React.ComponentType<{
  id?: string;
  name?: string;
  value?: any;
  children: React.ReactNode;
  checked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  'aria-label'?: string;
}>;
export default FormRadio;
