import { TextareaHTMLAttributes } from 'react';
import { TextareaProps } from './types';
declare const Textarea: {
  ({
    className,
    countDirection,
    countLimit,
    countPosition,
    countType,
    focused: propsFocused,
    onChange: propsOnChange,
    truncate,
    value,
    ...props
  }: TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element;
  displayName: string;
};
export default Textarea;
