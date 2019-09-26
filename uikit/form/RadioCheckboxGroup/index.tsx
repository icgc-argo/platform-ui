import React from 'react';
import Typography from '../../Typography';
import PropTypes from 'prop-types';
import RadioCheckContext from './RadioCheckContext';

const RadioCheckboxGroup: React.ComponentType<{
  onChange?: (e: any) => void;
  hasError?: boolean;
  isChecked?: boolean | ((a: any) => boolean);
  id?: string;
  className?: string;
}> = ({ id, className, onChange, children, hasError, isChecked }) => {
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
