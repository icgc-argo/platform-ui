import React, { useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Icon from 'uikit/Icon';
import Button from 'uikit/Button';
import { chartLineColors } from './utils';

const StyledLegend = styled('div')`
  position: absolute;
  top: -140px;
  left: -195px;
  display: flex;
  width: 270px;
  background: #fff;
  border: 1px solid #babcc2;
  border-radius: 4px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  padding: 5px 3px;
  .legend-column {
    width: 50%;
    padding: 0 2px;
  }
  .legend-title {
    color: #000;
    font-size: 11px;
    line-height: 14px;
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Work Sans', 'sans-serif';
    line-height: 20px;
    text-align: center;
    margin-bottom: 3px;
    &.yellow {
      background: #fef6ea;
    }
    &.blue {
      background: #d1f2f8;
    }
  }
`;

const StyledLegendLabel = styled('label')`
  display: flex;
  align-items: center;
  .legend-input-title {
    font-family: 'Work Sans', 'sans-serif';
    font-size: 12px;
    line-height: 20px;
    padding: 2px;
  }
  .legend-input-color {
    width: 7px;
    height: 7px;
    border-radius: 25px;
    display: block;
    margin: 0 3px 0 6px;
    line-height: 20px;
  }
`;

const dna = [
  'DNA Raw Reads',
  'Alignment',
  'Sanger VC',
  'Mutect2',
];

const rna = [
  'RNA Raw Reads',
  'RNA-Seq1',
  'RNA-Seq2'
];

const LegendButton = (
  { isOpen, setIsOpen }:
  { isOpen: boolean, setIsOpen: any }
) => (
  <Button
    variant="secondary"
    onClick={() => setIsOpen(!isOpen)}
    >
    Legend
    <Icon
      css={css`
        padding-left: 4px;
      `}
      name={isOpen ? 'times' : 'chevron_right'}
      fill="accent2_dark"
      height={'9px'}
      />
  </Button>
);

const LegendInput = (
  { activeLines, handleLegendInput, title }:
  { activeLines: string[], handleLegendInput: any, title: string }
) => (
  <StyledLegendLabel>
    <input
      checked={activeLines.includes(title)}
      onClick={() => handleLegendInput(title)}
      type="checkbox"
      value={title}
      />
    <span className="legend-input-color" style={{background: chartLineColors[title]}}/>
    <span className="legend-input-title">{title.includes('Raw Reads') ? 'Raw Reads' : title}</span>
  </StyledLegendLabel>
);

const Legend = (
  { activeLines, handleLegendInput }:
  { activeLines: string[], handleLegendInput: any }
) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div css={css`
      position: relative;
    `}>
      <LegendButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        />
      {isOpen && (
        <StyledLegend>
          <div className="legend-column">
            <div className="legend-title yellow">DNA-SEQ PIPELINE</div>
            {dna.map((title: string) => (
              <LegendInput
                activeLines={activeLines}
                handleLegendInput={handleLegendInput}
                key={title}
                title={title}
                />
            ))}
          </div>
          <div className="legend-column">
            <div className="legend-title blue">RNA-SEQ PIPELINE</div>
            {rna.map((title: string) => (
              <LegendInput
                activeLines={activeLines}
                handleLegendInput={handleLegendInput}
                key={title}
                title={title}
                />
            ))}
          </div>
        </StyledLegend>
      )}
    </div>
  );
};

export default Legend;
