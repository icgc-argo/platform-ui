import React from 'react';
import Typography from '../../Typography';
import PropTypes from 'prop-types';
import RadioCheckContext from './RadioCheckContext';

const RadioCheckboxGroup = ({ id, onChange, children, hasError, isChecked, className }) => {
  const ERROR_TEXT = 'Please fill out the required field.';

  const context = { isChecked, onChange };

  return (
    <div id={id} className={className}>
      <RadioCheckContext.Provider value={context}>
        {children}
        {hasError ? (
          <Typography variant="caption" color="error">
            {ERROR_TEXT}
          </Typography>
        ) : null}
      </RadioCheckContext.Provider>
    </div>
  );
};

export default RadioCheckboxGroup;

RadioCheckboxGroup.propTypes = {
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  hasError: PropTypes.bool,
  isChecked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  className: PropTypes.string,
};
