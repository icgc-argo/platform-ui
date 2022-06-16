import React from 'react';
declare const RadioCheckboxGroup: React.ComponentType<{
  onChange?: (e: any) => void;
  hasError?: boolean;
  isChecked?: boolean | ((a: any) => boolean);
  id?: string;
  className?: string;
  disabled?: boolean;
}>;
export default RadioCheckboxGroup;
