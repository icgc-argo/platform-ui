import React from 'react';
import Typography from '../../Typography';
import PropTypes from 'prop-types';
import RadioCheckContext from './RadioCheckContext';

const RadioCheckboxGroup = ({ onChange, children, hasError, isChecked, className }) => {
  const ERROR_TEXT = 'Please fill out the required field.';

  const context = { isChecked, onChange };

  return (
    <div className={className}>
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
  children: PropTypes.arrayOf(PropTypes.node),
  hasError: PropTypes.bool,
  isChecked: PropTypes.bool,
  className: PropTypes.string,
};
