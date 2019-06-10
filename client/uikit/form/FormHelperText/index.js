import React from 'react';
import PropTypes from 'prop-types';
import FormControlContext from '../FormControl/FormControlContext';
import styled from '@emotion/styled';
import clsx from 'clsx';
import css from '@emotion/css';

const FormHelperText = React.forwardRef(function FormHelperText(props, ref) {
  const { component: Component = 'p', className: classNameProp, ...other } = props;

  const StyledComponent = styled(Component)`
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

  return (
    <FormControlContext.Consumer>
      {contextValue => (
        <StyledComponent
          ref={ref}
          className={clsx(_.pick(contextValue, ['error', 'disabled']), classNameProp)}
          {...other}
        />
      )}
    </FormControlContext.Consumer>
  );
});

FormHelperText.propTypes = {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The CSS class name of the wrapper element.
   */
  className: PropTypes.string,
};

export default FormHelperText;
