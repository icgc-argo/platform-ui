import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withProps } from 'recompose';

import { StyledInputWrapper, INPUT_SIZES } from '../common';
import Typography from '../../Typography';
import { DropdownIcon, OptionsList, Option, HiddenSelect } from './styledComponents';
import useTheme from '../../utils/useTheme';

const Select = ({
  placeholder = '- Select an option -',
  value,
  onChange,
  disabled = false,
  size = INPUT_SIZES.SM,
  options = [],
  error = false,
  errorMessage = '',
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  const [isExpanded, setExpanded] = useState(false);

  const HiddenSelectRef = React.createRef();
  const ariaLabel = props['aria-label'];

  const selectedOption = options.find(
    ({ value: optionValue }) => String(optionValue) === String(value),
  );

  const isSomethingSelected = !!(value && selectedOption);

  const theme = useTheme();

  return (
    <div
      style={{ position: 'relative', ...(props.style || {}) }}
      onClick={() => {
        if (document.activeElement !== HiddenSelectRef.current) {
          HiddenSelectRef.current.focus();
        }
      }}
    >
      {/**
       * This HiddenSelect component exists to sync up the focus state with the browser's
       * native behavior as much as possible for improved accessibility
       **/}
      <HiddenSelect
        aria-label={ariaLabel}
        ref={HiddenSelectRef}
        value={value}
        onChange={e => {
          setActive('default');
          setExpanded(false);
          onChange(e.target.value);
        }}
        onFocus={() => {
          setActive('focus');
          setExpanded(true);
        }}
        onBlur={() => {
          setActive('default');
          setExpanded(false);
        }}
        disabled={disabled}
      >
        {options.map(({ content, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {content}
          </option>
        ))}
      </HiddenSelect>
      <StyledInputWrapper
        size={size}
        style={{ zIndex: 1 }}
        disabled={disabled}
        inputState={activeState}
        role="button"
        disabled={disabled}
      >
        <Typography
          variant="paragraph"
          disabled={disabled}
          color={
            disabled
              ? theme.input.textColors.disabled
              : isSomethingSelected || isExpanded
              ? 'black'
              : 'grey'
          }
          css={css`
            flex: 1;
            padding-left: 10px;
            line-height: 0;
          `}
        >
          {(value && selectedOption ? selectedOption.content : false) || placeholder}
        </Typography>
        <DropdownIcon disabled={disabled} theme={theme} />
      </StyledInputWrapper>
      {isExpanded && (
        <OptionsList role="listbox">
          {options.map(({ content, value: optionValue }) => (
            <Option key={optionValue} value={optionValue} onMouseDown={() => onChange(optionValue)}>
              {content}
            </Option>
          ))}
        </OptionsList>
      )}
    </div>
  );
};

Select.propTypes = {
  ['aria-label']: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    }),
  ),
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Select;
