import React from 'react';
import { InputSize } from '../common';
import { PopupPosition } from './styledComponents';
declare type OptionsType = {
  content: any;
  disabled?: boolean;
  value: any;
};
declare const Select: React.ComponentType<{
  ['aria-label']: string;
  options?: OptionsType[];
  size?: InputSize;
  error?: boolean;
  disabled?: boolean;
  eventOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  popupPosition?: PopupPosition;
  placeholder?: string;
  id?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  hintText?: string;
}>;
export default Select;
