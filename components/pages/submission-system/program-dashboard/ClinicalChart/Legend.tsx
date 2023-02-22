/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { Button, css, Icon, styled, Typography, UikitTheme, useTheme } from '@icgc-argo/uikit';
import { find } from 'lodash';
import { useState } from 'react';

import { ChartType, DonorField } from './types';
import { makeChartLineMeta } from './LineChart/utils';

const StyledLegend = styled('div')`
  background: ${({ theme }: { theme?: UikitTheme }) => theme.colors.white};
  border-radius: 4px;
  border: ${({ theme }: { theme?: UikitTheme }) => `1px solid ${theme.colors.grey_1}`};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  left: -225px;
  padding: 5px 3px;
  position: absolute;
  top: -155px;
  width: 300px;
  .legend-column {
    padding: 0 2px;
    width: 100%;
  }
  .legend-title {
    margin-bottom: 3px;
    text-align: center;
    &.yellow {
      background: ${({ theme }) => theme.colors.warning_4};
    }
    &.blue {
      background: ${({ theme }) => theme.colors.accent3_3};
    }
  }
`;

const StyledLegendLabel = styled('label')`
  align-items: center;
  display: flex;
  .legend-input-title {
    ${({ theme }: { theme?: UikitTheme }) => css(theme.typography.data as any)};
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

const LegendButton = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => (
  <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
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

const LegendInput = ({
  field,
  handleLegendInput,
  isActive,
  title,
}: {
  field: DonorField;
  handleLegendInput: any;
  isActive: boolean;
  title: string;
}) => {
  const theme = useTheme();
  return (
    <StyledLegendLabel>
      <input
        checked={isActive}
        onChange={() => handleLegendInput(field)}
        type="checkbox"
        value={field}
      />
      <span
        className="legend-input-color"
        css={css`
          background: ${find(makeChartLineMeta(theme), { field: field }).color};
        `}
      />
      <span className="legend-input-title">
        {title.includes('Raw Reads') ? 'Raw Reads' : title}
      </span>
    </StyledLegendLabel>
  );
};

const Legend = ({
  chartType,
  activeLines,
  handleLegendInput,
}: {
  chartType: ChartType;
  activeLines: string[];
  handleLegendInput: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <LegendButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <StyledLegend>
          <div className="legend-column">
            <div className="legend-title yellow">
              <Typography color="black" variant="caption" bold>
                DNA-SEQ PIPELINE
              </Typography>
            </div>
            {makeChartLineMeta(theme)
              .filter((line) => line.dataType === 'DNA' && line.chartType === chartType)
              .map((line) => (
                <LegendInput
                  field={line.field as DonorField}
                  handleLegendInput={handleLegendInput}
                  isActive={activeLines.includes(line.field)}
                  key={line.field}
                  title={line.title}
                />
              ))}
          </div>

          <div className="legend-column">
            <div className="legend-title blue">
              <Typography color="black" variant="caption" bold>
                RNA-SEQ PIPELINE
              </Typography>
            </div>
            {makeChartLineMeta(theme)
              .filter((line) => line.dataType === 'RNA' && line.chartType === chartType)
              .map((line) => (
                <LegendInput
                  field={line.field as DonorField}
                  handleLegendInput={handleLegendInput}
                  isActive={activeLines.includes(line.field)}
                  key={line.field}
                  title={line.title}
                />
              ))}
          </div>
        </StyledLegend>
      )}
    </div>
  );
};

export default Legend;
