import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from 'uikit/Button';
import { chartLineColors } from './utils';

const StyledLegend = styled('div')`

`;

const Legend = ({ activeLines, setActiveLines }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledLegend>
      <Button
      variant="secondary"
      onClick={() => setIsOpen(!isOpen)}
      >
      Legend
      {' '}
      {isOpen ? '𝘅' : '❭'}
      </Button>
    </StyledLegend>
  );
};

export default Legend;