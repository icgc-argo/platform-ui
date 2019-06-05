import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../../Icon';
import { StyledInputWrapper } from '../common';
import Typography from '../../Typography';
import reactTableDefaultStyle from '../../Table/reactTableDefaultStyle';

const DropdownIcon = styled(Icon)`
  height: 10px;
  width: 10px;
  padding: 13px;
  border-left: solid 1px ${({ theme }) => theme.colors.grey_1};
`;

const OptionsList = styled('ol')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  border: solid 1px ${({ theme }) => theme.colors.grey_1};
  background: ${({ theme }) => theme.colors.white};
  min-width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
`;

const Option = styled('li')`
  list-style: none;
  min-width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_4};
    cursor: pointer;
  }
`;

const OffScreenSelect = styled('select')`
  opacity: 0px;
  position: absolute;
  left: -90000px;
`;

const Select = ({
  placeholder = '- Select an option -',
  value,
  onChange,
  type,
  disabled,
  size = 'sm',
  options = [],
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  const [isExpanded, setExpanded] = useState(false);

  const offScreenSelectRef = React.createRef();
  const onContainerClick = () => {
    if (document.activeElement !== offScreenSelectRef.current) {
      console.log('clicked');
      offScreenSelectRef.current.focus();
    }
  };
  const ariaLabel = props['aria-label'];

  return (
    <div style={{ position: 'relative', ...(props.style || {}) }} onClick={onContainerClick}>
      <OffScreenSelect
        aria-label={ariaLabel}
        ref={offScreenSelectRef}
        value={value}
        onChange={e => {
          setActive('default');
          setExpanded(false);
          onChange(e.target.value);
          console.log('onChange');
        }}
        onFocus={() => {
          setActive('focus');
          setExpanded(true);
          console.log('onFocus');
        }}
        onBlur={() => {
          setActive('default');
          setExpanded(false);
          console.log('onBlur');
        }}
      >
        {options.map(({ content, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {content}
          </option>
        ))}
      </OffScreenSelect>
      <OptionsList isExpanded={isExpanded} role="listbox">
        {options.map(({ content, value: optionValue }) => (
          <Option key={optionValue} onClick={() => onChange(optionValue)} role="option">
            <Typography variant="caption">{content}</Typography>
          </Option>
        ))}
      </OptionsList>
      <StyledInputWrapper
        style={{ zIndex: 1 }}
        disabled={disabled}
        size={size}
        inputState={activeState}
        role="button"
      >
        <Typography
          variant="caption"
          css={css`
            flex: 1;
            padding-left: 10px;
          `}
        >
          {(value && options.find(({ value: optionValue }) => optionValue === value).content) ||
            placeholder}
        </Typography>
        <DropdownIcon name="chevron_down" />
      </StyledInputWrapper>
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
};

export default Select;
