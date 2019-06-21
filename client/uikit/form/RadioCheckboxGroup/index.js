import React from 'react';
import Typography from '../../Typography';
import PropTypes from 'prop-types';
import RadioCheckContext from './RadioCheckContext';

export const RadioCheckboxGroup = ({ onChange, children, hasError, isChecked }) => {
  const ERROR_TEXT = 'Please fill out the required field.';

  const cloneChild = (child, i) =>
    React.cloneElement(child, {
      checked: isChecked(child.props.value),
      onChange: e => {
        onChange(e);
      },
      key: i,
    });

  const context = { checked: true, onChange };

  return (
    <div>
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
