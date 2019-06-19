import React from 'react';
import PropTypes from 'prop-types';
import { RadioCheckboxWrapper, StyledGroup } from '../common';
import Checkbox from '../Checkbox';
import css from '@emotion/css';
import { Row, Col } from 'react-grid-system';
import Typography from '../../Typography';

const FormCheckbox = ({ id, name, value, label, children, checked, onChange, disabled, type }) => {
  const onClick = () => onChange(value);
  return (
    <RadioCheckboxWrapper disabled={disabled} checked={checked}>
      <Checkbox
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onClick}
        disabled={disabled}
      />
      <label
        css={css`
          margin-left: 24px;
        `}
        onClick={onClick}
      >
        {children}
      </label>
    </RadioCheckboxWrapper>
  );
};

const ERROR_TEXT = 'Please fill out the required field.';

export const CheckboxGroup = ({ onChange, children, selectedItems, hasError, limit = 4 }) => {
  const chunkedChildren = _.chunk(children, limit);
  return (
    <div>
      <Row
        css={css`
          margin-bottom: 6px;
        `}
      >
        <Col md={6} style={{ marginTop: '2px' }}>
          <StyledGroup>
            {chunkedChildren[0].map(child =>
              React.cloneElement(child, {
                checked: selectedItems.has(child.props.value),
                onChange: e => {
                  onChange(e);
                },
              }),
            )}
          </StyledGroup>
        </Col>

        <Col md={6} style={{ marginTop: '2px' }}>
          <StyledGroup>
            {chunkedChildren[1].map(child =>
              React.cloneElement(child, {
                checked: selectedItems.has(child.props.value),
                onChange: e => {
                  onChange(e);
                },
              }),
            )}
          </StyledGroup>
        </Col>
      </Row>
      {hasError ? (
        <Typography variant="caption" color="error">
          {ERROR_TEXT}
        </Typography>
      ) : null}
    </div>
  );
};

CheckboxGroup.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node),
  selectedItems: PropTypes.array,
  hasError: PropTypes.bool,
  /**
   * Number of items in alpha order column on normal display
   */
  limit: PropTypes.number,
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FormCheckbox;
