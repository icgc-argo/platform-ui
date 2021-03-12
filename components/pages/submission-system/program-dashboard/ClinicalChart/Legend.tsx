import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from 'uikit/Icon';
import Button from 'uikit/Button';
import theme from 'uikit/theme/defaultTheme';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { chartLineColors } from './utils';

const StyledLegend = styled('div')`
  background: ${theme.colors.white};
  border-radius: 4px;
  border: 1px solid ${theme.colors.grey_1};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  left: -195px;
  padding: 5px 3px;
  position: absolute;
  top: -140px;
  width: 270px;
  .legend-column {
    padding: 0 2px;
    width: 50%;
  }
  .legend-title {
    margin-bottom: 3px;
    text-align: center;
    &.yellow {
      background: ${theme.colors.warning_4};
    }
    &.blue {
      background: ${theme.colors.accent3_3};
    }
  }
`;

const StyledLegendLabel = styled('label')`
  align-items: center;
  display: flex;
  .legend-input-title {
    ${({ theme }) => css(theme.typography.data)};
    line-height: 20px;
    padding: 2px;
  }
  .legend-input-color {
    border-radius: 25px;
    display: block;
    height: 7px;
    line-height: 20px;
    margin: 0 3px 0 6px;
    width: 7px;
  }
`;

const dnaTitles = [
  'DNA Raw Reads',
  'Alignment',
  'Sanger VC',
  'Mutect2',
];

const rnaTitles = [
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
    <span
      className="legend-input-color"
      css={css`
        background: ${chartLineColors[title]};
      `}
      />
    <span className="legend-input-title">
      {title.includes('Raw Reads') ? 'Raw Reads' : title}
    </span>
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
            <div className="legend-title blue">
              <Typography color="black" variant="caption" bold>DNA PIPELINE</Typography>
            </div>
            {dnaTitles.map((title: string) => (
              <LegendInput
                activeLines={activeLines}
                handleLegendInput={handleLegendInput}
                key={title}
                title={title}
                />
            ))}
          </div>
          <div className="legend-column">
            <div className="legend-title blue">
              <Typography color="black" variant="caption" bold>RNA-SEQ PIPELINE</Typography>
            </div>
            {rnaTitles.map((title: string) => (
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
