import React from 'react';
declare const FormControl: React.ForwardRefExoticComponent<
  {
    className?: string;
    /**
     * The contents of the form control.
     */
    children?: React.ReactNodeArray | React.ReactNode;
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component?: keyof HTMLElementTagNameMap;
    /**
     * If `true`, the label should be displayed in an error state.
     */
    error?: boolean | string;
    /**
     * If `true`, the label will indicate that the input is required.
     */
    required?: boolean;
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
  } & React.RefAttributes<HTMLElement>
>;
export default FormControl;
