/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useState } from 'react';
import { find } from 'lodash';
import styled from '@emotion/styled';
import Icon from 'uikit/Icon';
import Button from 'uikit/Button';
import theme from 'uikit/theme/defaultTheme';
import Typography from 'uikit/Typography';
import { css } from 'uikit';
import { chartLineDict } from './utils';
import { ChartType } from './types';

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
  { handleLegendInput, isActive, title }:
    { handleLegendInput: any, isActive: boolean, title: string }
) => (
  <StyledLegendLabel>
    <input
      checked={isActive}
      onClick={() => handleLegendInput(title)}
      type="checkbox"
      value={title}
    />
    <span
      className="legend-input-color"
      css={css`
        background: ${find(chartLineDict, title).color};
      `}
    />
    <span className="legend-input-title">
      {title.includes('Raw Reads') ? 'Raw Reads' : title}
    </span>
  </StyledLegendLabel>
);

const Legend = (
  { chartType, activeLines, handleLegendInput }:
    { chartType: ChartType, activeLines: string[], handleLegendInput: any }
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
            {chartLineDict
              .filter(line => line.dataType === 'DNA' && line.chartType === chartType)
              .map((line => (
                <LegendInput
                  handleLegendInput={handleLegendInput}
                  isActive={activeLines.includes(line.title)}
                  key={line.title}
                  title={line.title}
                />
              )))}
          </div>
          {/* <div className="legend-column">
            <div className="legend-title blue">
              <Typography color="black" variant="caption" bold>RNA-SEQ PIPELINE</Typography>
            </div>
            {chartLineDict
              .filter(line => line.dataType === 'RNA' && line.chartType === chartType)
              .map((line => (
                <LegendInput
                  handleLegendInput={handleLegendInput}
                  isActive={activeLines.includes(line.title)}
                  key={line.title}
                  title={line.title}
                />
              )))}
          </div> */}
        </StyledLegend>
      )}
    </div>
  );
};

export default Legend;
