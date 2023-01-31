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

import { TooltipData } from '.';
import { styled, useTheme } from '@icgc-argo/uikit';
import { getTooltipData, makeChartLineMeta } from './utils';
import { DataItem } from '../types';

const InfoBox = ({
  multiItemWidth,
  singleItemWidth,
  toolTipIndex,
  toolTipTextSize,
  verticalLineEnd,
  verticalLineStart,
  TextStyleGroup,
  xStart,
  xIsLeft,
  data,
}: {
  multiItemWidth: number;
  singleItemWidth: number;
  toolTipIndex: number | null;
  toolTipTextSize: number;
  verticalLineEnd: number;
  verticalLineStart: number | 0;
  TextStyleGroup;
  xStart: number;
  xIsLeft: boolean;
  data: DataItem[];
}) => {
  const theme = useTheme();

  const ToolTipStyleGroup = styled(TextStyleGroup)`
    fill: ${theme.colors.white};
    font-size: ${toolTipTextSize}px
    letter-spacing: 0.5px;
  `;

  const chartMeta = makeChartLineMeta(theme);
  const tooltipData: TooltipData[] = getTooltipData(data, chartMeta);

  const tooltipList = tooltipData[toolTipIndex];
  const isOneItem = tooltipList.length === 1; //size tooltip box for charts with single item
  const xPadding = 10;
  const yPadding = 20;
  const lineHeight = toolTipTextSize + 1;
  const boxWidth = isOneItem ? singleItemWidth : multiItemWidth;
  const xArrowPadding = 10;
  const xPosition = xIsLeft ? xStart - boxWidth - xArrowPadding : xStart + xArrowPadding;
  const xText = xPosition + xPadding;
  const xCircleTextGap = 10;
  const boxHeight = toolTipTextSize * tooltipList.length + yPadding * (isOneItem ? 1.2 : 1.5);
  // vertically center the box
  const yStart = (verticalLineEnd - verticalLineStart - boxHeight) / 2;
  const yText = yStart + yPadding;

  // arrow pointer
  const arrowWidth = 5;
  const polyPtOne = `${xIsLeft ? xStart : xPosition - xArrowPadding},${yStart + boxHeight / 2} `;
  const polyPtTwo = `${xIsLeft ? xStart - xArrowPadding : xPosition},${
    yStart + boxHeight / 2 + arrowWidth
  } `;
  const polyPtThree = `${xIsLeft ? xStart - xArrowPadding : xPosition},${
    yStart + boxHeight / 2 - arrowWidth
  }`;

  return (
    <g fill={theme.colors.grey} x={30} style={{ pointerEvents: 'none' }}>
      {/* vertical guiding line */}
      <line x1={xStart} y1={verticalLineEnd} x2={xStart} y2={verticalLineStart} stroke="black" />
      {/* arrow of tooltip */}
      <polygon points={polyPtOne + polyPtTwo + polyPtThree} />
      {/* tooltip box */}
      <rect rx="5" ry="5" x={xPosition} y={yStart} height={boxHeight} width={boxWidth} />
      {/* tooltip text */}
      <ToolTipStyleGroup>
        <text x={xText} y={yText}>
          {tooltipList.map((tooltipItem, idx) => {
            const isHeader = !tooltipItem.color;
            const lineY = yText + idx * lineHeight;
            return (
              <>
                {!isHeader && (
                  <tspan
                    x={xText}
                    y={lineY}
                    stroke="white"
                    strokeWidth={0.5}
                    fill={tooltipItem.color}
                    fontSize={'12px'}
                  >
                    {'\u25CF'} {/* circle */}
                  </tspan>
                )}
                <tspan
                  x={xText + (isHeader ? 0 : xCircleTextGap)}
                  y={lineY}
                  fontWeight={isHeader ? 'bold' : 'normal'}
                >
                  {!isOneItem && tooltipItem.name}
                  {!isHeader && `: ${tooltipItem.count}`}
                </tspan>
              </>
            );
          })}
        </text>
      </ToolTipStyleGroup>
    </g>
  );
};

export default InfoBox;
