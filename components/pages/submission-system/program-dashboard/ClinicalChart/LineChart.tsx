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

import React, { useEffect, useState } from 'react';
import { differenceInDays, eachQuarterOfInterval, getQuarter, getYear, isAfter, isBefore, compareAsc } from 'date-fns';
import { css, styled } from 'uikit';
import { chartLineColors, convertUnixEpochToJSEpoch, getMinMax } from './utils';
import { ChartLine, DataLine, DataObj, DataPoint } from './types';
import themeColors from 'uikit/theme/defaultTheme/colors';
import typography from 'uikit/theme/defaultTheme/typography';

const options = {
  colors: {
    axisBorder: themeColors.grey_1,
    chartLineDefault: themeColors.accent2_dark,
    quarterBorder: themeColors.secondary_2,
    text: themeColors.primary_1,
    yAxisThresholdBorder: themeColors.secondary,
  },
  chartStrokeWidth: 1,
  fontFamily: 'Work Sans, sans-serif',
  fontSize: 10,
  pointRadius: 2.5,
  quarterLineStrokeDashArray: '3, 2',
  strokeWidth: 0.5,
  xTickHeight: 5,
  yAxisThresholdDashArray: '8, 3',
};

const TextStyleGroup = styled.g`
  fill: ${options.colors.text};
  font-family: ${options.fontFamily};
  font-size: ${options.fontSize}px;
`;

const makePointsString = (points: number[]) => {
  // add 0.5 to sharpen straight, thin (0.5 strokeWidth) SVG lines
  const adjustedPoints = points.map((point: number) => point + 0.5);
  return `${adjustedPoints[0]},${adjustedPoints[1]} ${adjustedPoints[2]},${adjustedPoints[3]}`;
}

const LineChart = ({
  data,
  hasQuarterLines = false,
  hasYAxisThresholdLine = false,
  height,
  horizontalGuides: numberOfHorizontalGuides,
  precision,
  width,
  yAxisThreshold = 0,
  yAxisThresholdLabel,
  yAxisTitle,
}: { 
  data: DataObj;
  hasQuarterLines?: boolean;
  hasYAxisThresholdLine?: boolean;
  height: number;
  horizontalGuides: number;
  precision: number;
  width: number;
  yAxisThreshold?: number;
  yAxisThresholdLabel?: string;
  yAxisTitle: string;
}) => {
  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipX, setTooltipX] = useState(null);
  const [tooltipY, setTooltipY] = useState(null);

  // setup Y axis
  const maxY = Math.max(yAxisThreshold, getMinMax({ data, minMax: 'max', coord: 'y' }));
  const yAxisDigits = parseFloat(maxY.toString()).toFixed(precision).length + 1;

  // setup chart dimensions
  const padding = (options.fontSize + yAxisDigits) * 3;
  // padding applies to left, right, bottom
  const topPadding = options.fontSize * 1.5;
  // topPadding leaves room for yAxisThresholdLabel
  const chartWidth = width - padding;
  const chartHeight = height - padding - topPadding;

  // setup X axis
  // X axis ticks, labels, and line/point positions
  // are 1/2 tick distance from the left and right
  const dataPoints = data.lines[0].points;
  const xTicksCount = dataPoints.length;
  // distance between 2 ticks
  const xTickDistance = chartWidth / xTicksCount;
  // distance between farthest left & right ticks
  const xWidthAllTicks = (xTicksCount - 1) * xTickDistance;
  const xChartPadding = xTickDistance / 2;
  const xTicksStart = padding + xChartPadding;
  const getX = (index: number) => Math.floor(xTicksStart + (xTickDistance * index));

  const horizontalLineStart = padding;
  const horizontalLineEnd = chartWidth + padding;
  const verticalLineStart = 0;
  const verticalLineEnd = height - padding;

  // setup dates
  const datesUnixEpoch = dataPoints.map((p: DataPoint) => p.x);
  const datesJSEpoch = datesUnixEpoch.map((d: any) => new Date(convertUnixEpochToJSEpoch(d)));
  const day0 = datesJSEpoch[0];
  const dayLast = datesJSEpoch[datesJSEpoch.length-1];
  const daysInData = differenceInDays(dayLast, day0);
  const dataDayRange = {
    start: day0,
    end: dayLast,
  };

  const chartLines = data.lines
    .map((line: DataLine) => ({
      ...line,
      points: line.points
        .map((point: DataPoint, i: number) => {
          const xCoordinate = getX(i);
          const yCoordinate = Math.floor(chartHeight - topPadding / 2 - (Number(point.y) / maxY) * chartHeight + padding / 2);
          return `${xCoordinate},${yCoordinate}`;
        })
        .join(' ')
    }));
  
  const tooltipsData = data.lines
    .map((line: DataLine) => line.points
      .map((point: DataPoint) => point.tooltip));

  // setup axis elements
  const Axis = ({ points }: { points: number[] }) => (
    <polyline fill="none" stroke={options.colors.axisBorder} strokeWidth={options.strokeWidth} points={makePointsString(points)} />
  );

  const XAxis = () => (
    <Axis
      points={[
        horizontalLineStart,
        verticalLineEnd,
        horizontalLineEnd,
        verticalLineEnd
      ]}
    />
  );

  const YAxis = () => (
    <Axis points={[
      horizontalLineStart,
      verticalLineStart,
      horizontalLineStart,
      verticalLineEnd
    ]}
    />
  );

  const YAxisThresholdLine = () => {
    const yCoordinate = Math.floor(topPadding + ((maxY - yAxisThreshold || 0) / maxY) * chartHeight);

    return (
      <TextStyleGroup>
        {yAxisThresholdLabel && (
          <text
            x={horizontalLineStart + options.fontSize}
            y={Math.floor(yCoordinate - options.fontSize * 0.5)}
            >
            {yAxisThresholdLabel}
          </text>
        )}
      <polyline
        fill="none"
        points={makePointsString([
          horizontalLineStart,
          yCoordinate,
          horizontalLineEnd,
          yCoordinate
        ])}
        stroke={options.colors.yAxisThresholdBorder}
        strokeDasharray={options.yAxisThresholdDashArray}
        strokeWidth={options.strokeWidth}
        />
      </TextStyleGroup>
    );
  };

  const TooltipHoverBox = ({ children, height, text, width, x, y }: 
    { 
      children: React.ReactNode,
      text: string | string[],
      y: number, x: number, height: number, width: number,
    }) => {
    // TODO: expand this box
    // because the lines are 1px wide/tall
    // and it's hard to hover on things.
    // (add X, Y coordinates)

    const [isHover, setIsHover] = useState(false);

    const handleTooltipPosition = (e: any) => {
      if (isHover) {
        setTooltipY(e.offsetY);
        setTooltipX(e.offsetX);
      }
      setTooltipText(text);
    };

    useEffect(() => {
      window.addEventListener('mousemove', handleTooltipPosition);
      return () => window.removeEventListener('mousemove', handleTooltipPosition);
    },[]);

    return (
      <g
        height={height}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        width={width}
        x={x}
        y={y}
        >
        {children}
      </g>
    );
  };

  const StyledTooltip = styled('div')`
    ${css(typography.caption as any)}
    background: ${themeColors.primary_1};
    border-radius: 2px;
    color: ${themeColors.white};
    left: ${tooltipX}px;
    padding: 2px 4px;
    position: absolute;
    text-align: center;
    top: ${tooltipY}px;
    transform: translateX(-50%) translateY(-100%);
    width: auto;
    &:after {
      content:'';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      width: 0;
      height: 0;
      border-top: solid 5px ${themeColors.primary_1};
      border-left: solid 5px transparent;
      border-right: solid 5px transparent;
    }
  `;

  const TooltipHTML = () => {
    return (
      <StyledTooltip>
        {[].concat(tooltipText)
        .map((tooltipString: string, tooltipIndex: number) => (
          <div key={tooltipString+tooltipIndex}>{tooltipString}</div>
        ))}
      </StyledTooltip>
    );
  };

  const QuarterLines = () => {
    const quartersInRange = eachQuarterOfInterval(dataDayRange)
      .filter((quarter: Date) => isAfter(quarter, dataDayRange.start) &&
        isBefore(quarter, dataDayRange.end));
    
    const quartersLines = quartersInRange.reduce((acc, curr: Date) => {
      // check if quarters fall on the same day as a tick.
      // this is to help with positioning - otherwise they'll be
      // ~2 pixels off due to SVG rendering.
      const quarterTickIndex = datesJSEpoch
        .filter((d: Date) => compareAsc(d, curr) === 0)
        .map((d: Date) => datesJSEpoch.indexOf(d))[0];

      const xCoordinate = Number(quarterTickIndex >= 0
        ? getX(quarterTickIndex)
        : xTicksStart + (
            differenceInDays(curr, day0) / daysInData * xWidthAllTicks
          ));

      return ([
        ...acc,
        {
          xCoordinate,
          tooltip: `${getYear(curr)} Q${getQuarter(curr)}`,
        }
      ])
    },[]);

    return (
      <g
        stroke={options.colors.quarterBorder}
        strokeDasharray={options.quarterLineStrokeDashArray}
        strokeWidth={options.strokeWidth}
        >
          {quartersLines.map(({ tooltip, xCoordinate }: { tooltip: string, xCoordinate: number }) => (
            <TooltipHoverBox
              height={verticalLineEnd - verticalLineStart + 10}
              key={xCoordinate}
              text={tooltip}
              width={10}
              x={xCoordinate - 5}
              y={verticalLineStart - 5}
              >
              <polyline
                points={makePointsString([
                  xCoordinate,
                  verticalLineStart,
                  xCoordinate,
                  verticalLineEnd
                ])}
                />
            </TooltipHoverBox>
          ))}
      </g>
    );
  };

  const TicksXAxis = () => {
    const yStart = height - padding;
    const yEnd = yStart + options.xTickHeight;
    return (
      <g
        fill="none"
        stroke={options.colors.axisBorder}
        strokeWidth={options.strokeWidth}
        >
        {new Array(xTicksCount).fill(0).map((ticksValue: number, index: number) => {
          const tickX = getX(index);
          return (
            <polyline
              key={tickX}
              points={makePointsString([
                tickX,
                yStart,
                tickX,
                yEnd
              ])}
              />
          );
        })}
      </g>
    );
  };

  const HorizontalGuides = () => {
    return (
      <g
        fill="none"
        stroke={options.colors.axisBorder}
        strokeWidth={options.strokeWidth}
        >
        {new Array(numberOfHorizontalGuides).fill(0).map((guidesValue: number, index: number) => {
          const ratio = (index + 1) / numberOfHorizontalGuides;
          const yCoordinate = chartHeight - chartHeight * ratio + topPadding;
          return (
            <polyline key={yCoordinate} points={makePointsString([
              horizontalLineStart,
              yCoordinate,
              horizontalLineEnd,
              yCoordinate
            ])} />
          );
        })}
      </g>
    );
  };

  const LabelsXAxis = () => {
    const yStart = height - padding + (options.fontSize * 1.75);
    return (
      <TextStyleGroup
        textAnchor="middle"
        >
        {dataPoints.map((point: DataPoint, index: number) => {
          const xCoordinate = getX(index);
          return (
            <text key={xCoordinate}>
              {point.label.split(' ').map((word: string, wordIndex: number) => (
                <tspan key={word+wordIndex} x={xCoordinate} y={yStart + wordIndex * (options.fontSize + 2)}>{word}</tspan>
              ))}
            </text>
          );
        })}
      </TextStyleGroup>
    );
  };

  const LabelsYAxis = () => {
    return (
      <TextStyleGroup>
        <text
          textAnchor="middle"
          transform={`translate(${options.fontSize - 2},${height/2}) rotate(-90)`}
          x={0}
          y={0}
          >
          # {yAxisTitle}
        </text>
        {new Array(numberOfHorizontalGuides + 1).fill(0).map((axisValue: number, index: number) => {
          const xCoordinate = padding - options.fontSize + 6;
          const ratio = index / numberOfHorizontalGuides;
          const yCoordinate = chartHeight - chartHeight * ratio + topPadding + options.fontSize / 2;
          const labelStr = (maxY * (index / numberOfHorizontalGuides)).toString();
          return (
            <text
              key={index}
              textAnchor="end"
              x={xCoordinate}
              y={yCoordinate}
              >
              {parseFloat(labelStr).toFixed(precision)}
            </text>
          );
        })}
      </TextStyleGroup>
    );
  };

  const ChartLines = () => {
    return (
      <g
        fill="none"
        strokeWidth={options.chartStrokeWidth}
        >
        {chartLines.map((chartLine: ChartLine) => (
          <polyline
            key={chartLine.title}
            points={chartLine.points}
            stroke={chartLineColors[chartLine.title] || options.colors.chartLineDefault}
            />
        ))}
      </g>
    );
  };

  const ChartPoints = () => {
    return (
      <g>
        {chartLines.map((chartLine: ChartLine, chartLineIndex: number) => {
          const pointsCoordinates = chartLine.points.split(' ').map((point: string) => {
            const [x, y] = point.split(',').map((xyString: string) => Number(xyString));
            return { x, y };
          });
          return (
            <g
              fill={chartLineColors[chartLine.title] || options.colors.chartLineDefault}
              >
              {pointsCoordinates.map((point, pointIndex: number) => (
                <TooltipHoverBox
                  text={[chartLine.title, ...tooltipsData[chartLineIndex][pointIndex]]}
                  >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={options.pointRadius}
                    />
                </TooltipHoverBox>
              ))}
            </g>
          )
        })}
      </g>
    );
  };

  console.log({ tooltipText })
  return width && (
    <>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        >
        <XAxis />
        <TicksXAxis />
        <LabelsXAxis />
        <YAxis />
        <LabelsYAxis />
        {hasQuarterLines && <QuarterLines />}
        {hasYAxisThresholdLine && <YAxisThresholdLine />}
        <HorizontalGuides />
        <ChartLines />
        <ChartPoints />
      </svg>
      {tooltipText !== null && <TooltipHTML />}
    </>
  );
};

export default LineChart;
