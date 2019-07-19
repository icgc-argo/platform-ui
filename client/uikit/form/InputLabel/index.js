import React from 'react';
import PropTypes from 'prop-types';
import FormControlContext from '../FormControl/FormControlContext';
import { styled, css } from 'uikit';
import clsx from 'clsx';
import Icon from '../../Icon';
import _ from 'lodash';

const InputLabel = React.forwardRef(function InputLabel(props, ref) {
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
      className={clsx(_.pick(contextValue, ['error', 'disabled']), classNameProp)}
      {...other}
    >
      {children}
      {_.get(contextValue, 'required') && (
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

InputLabel.propTypes = {
  /**
   * The CSS class name of the wrapper element.
   */
  className: PropTypes.string,
};

export default InputLabel;
