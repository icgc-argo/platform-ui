import React from 'react';
declare const FormHelperText: React.ForwardRefExoticComponent<
  {
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component?: keyof HTMLElementTagNameMap;
    /**
     * The CSS class name of the wrapper element.
     */
    className?: string;
    children?: React.ReactNode | React.ReactNodeArray;
    /**
     * Allows turning this component into an error-dependent message.
     * Hides it when no errors are present. Else,
     */
    onErrorOnly?: boolean;
  } & React.RefAttributes<any>
>;
export default FormHelperText;
