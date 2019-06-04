import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Icon from '../../Icon';
import { StyledInputWrapper } from '../common';

const DropdownIcon = styled(Icon)`
  height: 10px;
  width: 10px;
  padding: 13px;
`;

const Options = styled('ul')`
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  border: 1px solid grey;

  li:hover {
    background-color: green;
    cursor: pointer;
  }
`;

const Select = ({ placeholder, value, onChange, type, disabled, size = 'sm' }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [activeState, setActive] = useState('default');

  return (
    <div>
      <StyledInputWrapper
        onFocus={() => setActive('focus')}
        onBlur={() => setActive('default')}
        onClick={() => setExpanded(!isExpanded)}
        disabled={disabled}
        size={size}
        inputState={activeState}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          - Select an option -
        </div>
        <DropdownIcon name="chevron_down" />
      </StyledInputWrapper>
      <Options isExpanded={isExpanded}>
        <li>Value 1</li>
        <li>Value 2</li>
      </Options>
    </div>
  );
};

Select.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default Select;
