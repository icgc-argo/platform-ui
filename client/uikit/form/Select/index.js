import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withProps } from 'recompose';

import { StyledInputWrapper } from '../common';
import Typography from '../../Typography';
import { DropdownIcon, OptionsList, Option, HiddenSelect } from './styledComponents';

const Select = ({
  placeholder = '- Select an option -',
  value,
  onChange,
  disabled,
  size = 'sm',
  options = [],
  error = false,
  errorMessage = '',
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  const [isExpanded, setExpanded] = useState(false);

  const HiddenSelectRef = React.createRef();
  const ariaLabel = props['aria-label'];

  const isSomethingSelected = !!(
    value && options.find(({ value: optionValue }) => optionValue === value).content
  );

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
      >
        <Typography
          variant="paragraph"
          disabled={disabled}
          color={isSomethingSelected || isExpanded ? 'black' : 'grey'}
          css={css`
            flex: 1;
            padding-left: 10px;
            line-height: 0;
          `}
        >
          {(value && options.find(({ value: optionValue }) => optionValue === value).content) ||
            placeholder}
        </Typography>
        <DropdownIcon name="chevron_down" />
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
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default Select;
