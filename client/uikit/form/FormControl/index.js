import React from 'react';
import PropTypes from 'prop-types';
import FormControlContext from './FormControlContext';
import { css } from '../..';

const FormControl = React.forwardRef(function FormControl(
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
      <Component
        ref={ref}
        {...other}
        css={css`
          margin-bottom: 10px;
        `}
      >
        {children}
      </Component>
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

FormControl.propTypes = {
  /**
   * The contents of the form control.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
};

export default FormControl;
