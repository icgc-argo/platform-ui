import React from 'react';
import PropTypes from 'prop-types';
import FormControlContext from './FormControlContext';
import css from '@emotion/css';

const FormControl = React.forwardRef<
  HTMLElement,
  {
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
  }
>(function FormControl(
  {
    component: Component = 'div',
    children,
    error = false,
    disabled = false,
    required = false,
    ...other
  },
  ref,
) {
  const [focused, setFocused] = React.useState(false);

  const childContext = {
    disabled,
    error,
    required,
    focused,
    handleFocus: () => {
      setFocused(true);
      console.log('handle focus');
    },
    handleBlur: () => setFocused(false),
  };

  return (
    <FormControlContext.Provider value={childContext}>
      {React.createElement(Component, {
        ref: ref,
        ...other,
        css: css`
          margin-bottom: 10px;
        `,
      })}
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

export default FormControl;
