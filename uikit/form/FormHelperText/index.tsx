import React from 'react';
import PropTypes from 'prop-types';
import FormControlContext from '../FormControl/FormControlContext';
import styled from '@emotion/styled';
import clsx from 'clsx';
import css from '@emotion/css';
import pick from 'lodash/pick';

const FormHelperText = React.forwardRef<
  any,
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
    children?: React.ReactElement;
  }
>(function FormHelperText(props, ref) {
  const { component: Component = 'p', className: classNameProp, children } = props;

  const StyledComponent = styled<any, any>(Component)`
    ${({ theme }) => css(theme.typography.caption)};
    margin: 3px 7px;
    line-height: 14px;

    &.error {
      color: ${({ theme }) => theme.colors.error};
    }

    &.disabled {
      display: none;
    }
  `;

  const contextValue = React.useContext(FormControlContext);

  return (
    <StyledComponent
      ref={ref}
      className={clsx(pick(contextValue, ['error', 'disabled']), classNameProp)}
    >
      {children}
    </StyledComponent>
  );
});

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
