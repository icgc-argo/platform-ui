import React from 'react';
import Typography from '../../Typography';
import PropTypes from 'prop-types';
import RadioCheckContext from './RadioCheckContext';

const RadioCheckboxGroup = ({ onChange, children, hasError, isChecked, style }) => {
  const ERROR_TEXT = 'Please fill out the required field.';

  const context = { isChecked, onChange };

  return (
    <div css={style}>
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
  selectedItems: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  hasError: PropTypes.bool,
  /**
   * Number of items in alpha order column on normal display
   */
  limit: PropTypes.number,
};
