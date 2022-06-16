import React, { InputHTMLAttributes } from 'react';
import Option from './Option';
import { InputSize } from '../common';
declare type MultiSelectProps = {
  /**
   * Aria Label
   * @default 'search'
   */
  ['aria-label']: string;
  /**
   * Whether to allow user to add new value
   */
  allowNew?: boolean;
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
  error?: boolean | string;
  id?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Name of the Input
   */
  name?: string;
  /**
   * Handler of onBlur event
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Handler of onChange event
   */
  onChange: (
    e: React.SyntheticEvent & {
      target: {
        value: any;
        name: string;
      };
    },
    child?: any,
  ) => void;
  /**
   * Handler of onFocus event
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Placehoder of the input.
   * If given `false` or empty string, no placeholder is shown.
   * @default 'Select one' for single, else 'Add one or more...'
   */
  placeholder?: string | false;
  single?: boolean;
  /**
   * Changes the height of the input field.
   * Values:
   * 'sm'=32px,
   * 'lg'=38px.
   */
  size?: InputSize;
  /**
   * Value of the input
   */
  value: any;
};
declare const MultiSelect: ({
  'aria-label': ariaLabel,
  allowNew,
  children,
  disabled,
  error,
  id,
  inputProps,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  single,
  size,
  value,
}: MultiSelectProps) => JSX.Element;
export default MultiSelect;
export { Option };
