import { ReactNode } from 'react';
declare const FormCheckbox: ({
  checked,
  children,
  value,
  ...props
}: {
  checked?: boolean;
  children: ReactNode;
  disabled?: boolean;
  error?: boolean;
  onBlur?: (e: any) => any;
  onChange?: (e: any) => any;
  onFocus?: (e: any) => any;
  required?: boolean;
  value?: string;
}) => JSX.Element;
export default FormCheckbox;
