import React from 'react';
import PropTypes from 'prop-types';
import FormControlContext from '../FormControl/FormControlContext';
import styled from '@emotion/styled';
import clsx from 'clsx';
import css from '@emotion/css';
import Icon from '../../Icon';
import pick from 'lodash/pick';
import get from 'lodash/get';

const InputLabel = React.forwardRef<
  HTMLLabelElement,
  {
    /**
     * The CSS class name of the wrapper element.
     */
    className?: string;
    children?: React.ReactNode;
    htmlFor?: string;
  }
>(function InputLabel(props, ref) {
  const { className: classNameProp, children, ...other } = props;

  const Label = styled('label')`
    ${({ theme }) => css(theme.typography.label)};
    margin-top: 7px;
    &.disabled {
    }
  `;

  const AsteriskContainer = styled('span')``;

  const contextValue = React.useContext(FormControlContext);

  return (
    <Label
      ref={ref}
      className={clsx(pick(contextValue, ['error', 'disabled']), classNameProp)}
      {...other}
    >
      {children}
      {get(contextValue, 'required') && (
        <AsteriskContainer>
          <Icon
            css={css`
              margin-bottom: 5px;
              margin-left: 5px;
            `}
            width="6px"
            height="6px"
            name="asterisk"
            fill="#DF1B42"
          />
        </AsteriskContainer>
      )}
    </Label>
  );
});

InputLabel.displayName = 'InputLabel';

export default InputLabel;
