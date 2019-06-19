import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import Typography from '../Typography';
import React from 'react';

import { INPUT_STATES } from '../theme/defaultTheme/input';

export const INPUT_SIZES = {
  SM: 'sm',
  LG: 'lg',
};

export const StyledInputWrapper = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  height: ${({ size = INPUT_SIZES.SM }) => {
    switch (size) {
      case INPUT_SIZES.SM:
        return '30px';
      case INPUT_SIZES.LG:
        return '36px';
      default:
        return '30px';
    }
  }};

  color: ${({ theme, disabled, error }) =>
    theme.input.textColors[disabled ? 'disabled' : 'default']};
  background-color: ${({ theme, disabled }) =>
    theme.input.colors[disabled ? 'disabled' : 'default']};
  font-size: ${({ theme, size }) => theme.input.fontSizes[size]};
  border-color: ${({ theme, inputState, error, disabled }) => {
    const state = error ? 'error' : disabled ? 'disabled' : inputState;
    return theme.input.borderColors[state];
  }};

  &:hover {
    border-color: ${({ theme, disabled, error }) => {
      if (disabled) return 'initial';
      else if (error) return theme.colors.error;
      else return theme.colors.secondary_1;
    }};
  }
  ${({ getOverrideCss, ...rest }) => (getOverrideCss ? getOverrideCss(rest) : '')}
`;

StyledInputWrapper.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  inputState: PropTypes.oneOf(Object.values(INPUT_STATES)),
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  getOverrideCss: PropTypes.func,
};

export const RadioCheckboxWrapper = styled('div')`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.radiocheckbox.borderColors.default};

  background-color: ${({ theme, disabled, checked }) =>
    theme.radiocheckbox.backgroundColors[disabled ? 'disabled' : checked ? 'checked' : 'default']};

  color: ${({ theme, disabled }) =>
    theme.radiocheckbox.textColors[disabled ? 'disabled' : 'default']};

  padding: 4px 6px 4px 8px;

  label {
    ${({ theme }) => css(theme.typography.paragraph)};
    position: relative;
    cursor: pointer;
    color: inherit;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const StyledGroup = styled('div')`
  div {
    margin-top: 2px;
  }
  div:first-child {
    margin: 0;
  }
`;

export const RadioCheckboxGroup = ({ onChange, children, hasError, isChecked, limit = 4 }) => {
  const ERROR_TEXT = 'Please fill out the required field.';

  const chunkedChildren = _.chunk(children, limit);

  const cloneChild = (child, i) =>
    React.cloneElement(child, {
      checked: isChecked(child.props.value),
      onChange: e => {
        onChange(e);
      },
      key: i,
    });

  return (
    <div>
      <Row
        css={css`
          margin-bottom: 6px;
        `}
      >
        <Col md={6} style={{ marginTop: '2px' }}>
          <StyledGroup>{chunkedChildren[0].map(cloneChild)}</StyledGroup>
        </Col>

        <Col md={6} style={{ marginTop: '2px' }}>
          <StyledGroup>{chunkedChildren[1].map(cloneChild)}</StyledGroup>
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
