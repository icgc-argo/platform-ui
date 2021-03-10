import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from 'uikit/Button';
import { chartLineColors } from './utils';

const StyledLegend = styled('div')`
  position: relative;
`;

const StyledLegendBox = styled('div')`
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
  > div {
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
  label {
    display: flex;
    align-items: center;
  }
  .title {
    font-family: 'Work Sans', 'sans-serif';
    font-size: 12px;
    line-height: 20px;
    padding: 2px;
    /* margin-bottom: 3px; */
  }
  .color {
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

const Legend = ({ activeLines, handleLegend }) => {
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
      {isOpen && (
      <StyledLegendBox>
        <div>
          <div className="legend-title yellow">DNA-SEQ PIPELINE</div>
          {dna.map(x => (
            <label>
              <input type="checkbox" value={x} checked={activeLines.includes(x)} onClick={() => handleLegend(x)} />
              <span className="color" style={{background: chartLineColors[x]}}/>
              <span className="title">{x.includes('Raw Reads') ? 'Raw Reads' : x}</span>
            </label>
          ))}
        </div>
        <div>
          <div className="legend-title blue">RNA-SEQ PIPELINE</div>
          {rna.map(x => (
            <label>
              <input type="checkbox" value={x} checked={activeLines.includes(x)} onClick={() => handleLegend(x)} />
              <span className="color" style={{background: chartLineColors[x]}}/>
              <span className="title">{x.includes('Raw Reads') ? 'Raw Reads' : x}</span>
            </label>
          ))}
        </div>
      </StyledLegendBox>
      )}
    </StyledLegend>
  );
};

export default Legend;