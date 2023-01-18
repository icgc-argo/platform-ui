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

import { styled, UikitTheme, useTheme } from '@icgc-argo/uikit';
import { Box } from 'components/pages/user/common';
import {
  compareAsc,
  differenceInDays,
  eachQuarterOfInterval,
  format as formatDate,
  getQuarter,
  getYear,
  isAfter,
  isBefore,
} from 'date-fns';
import { filter, find, result } from 'lodash';
import { useState } from 'react';
import {
  ChartLine,
  ChartType,
  DataBucket,
  DataItem,
  DonorField,
  PointsCoordinates,
} from '../types';
import { makeChartLineMeta } from '../utils';
import { getMaxY } from './utils';

const getOptions = (theme: UikitTheme) => ({
  colors: {
    axisBorder: theme.colors.grey_1,
    chartLineDefault: theme.colors.accent2_dark,
    quarterBorder: theme.colors.secondary_2,
    text: theme.colors.primary_1,
    yAxisThresholdBorder: theme.colors.secondary,
  },
  chartStrokeWidth: 1,
  fontFamily: 'Work Sans, sans-serif',
  fontSize: 10,
  pointRadius: 2.5,
  quarterLineStrokeDashArray: '3, 2',
  strokeWidth: 0.5,
  xTickHeight: 5,
  yAxisThresholdDashArray: '8, 3',
  toolTipTextSize: 11,
});

const makePointsString = (points: PointsCoordinates) => {
  // offset positioning by 0.5 to sharpen straight, thin (0.5 strokeWidth) SVG lines
  const adjustedPoints = Object.entries(points).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value + 0.5,
    }),
    {} as PointsCoordinates,
  );
  return `${adjustedPoints.x1},${adjustedPoints.y1} ${adjustedPoints.x2},${adjustedPoints.y2}`;
};

const LineChart = ({
  activeLines,
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
  activeLines: string[];
  chartType: ChartType;
  data: DataItem[];
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
  const theme = useTheme();
  const options = getOptions(theme);

  const dataBuckets = data[0].buckets;
  const chartMeta = makeChartLineMeta(theme);
  const tooltipData = dataBuckets.reduce((acc, { date }) => {
    // array with title, count, colour
    // for each date
    const result = [
      ...acc,
      data.map((datum) => {
        const datumMeta = find(chartMeta, { field: datum.title });
        return {
          name: datumMeta.title,
          count: find(datum.buckets, { date: date }).donors,
          color: datumMeta.color,
          dataType: datumMeta.dataType,
        };
      }),
    ];
    return result;
  }, []);

  const TextStyleGroup = styled.g`
    fill: ${options.colors.text};
    font-family: ${options.fontFamily};
    font-size: ${options.fontSize}px;
  `;

  const ToolTipStyleGroup = styled(TextStyleGroup)`
    fill: ${theme.colors.white};
    font-size: ${options.toolTipTextSize}px
    letter-spacing: 0.5px;
  `;

  // setup Y axis
  // round up max Y value so it's a multiple of numberOfHorizontalGuides
  const roundForHorizontalGuides = (x: number) =>
    Math.ceil(x / numberOfHorizontalGuides) * numberOfHorizontalGuides;
  const maxY = roundForHorizontalGuides(Math.max(yAxisThreshold, getMaxY(data)));
  const yAxisDigits = parseFloat(maxY.toString()).toFixed(precision).length + 1;
  // 4-digit Y axis values push the chart lines down by 2 pixels.
  // this value adjusts their positioning.
  const maxYLength = maxY.toString().length;
  const yAxisAdjustment = maxYLength > 3 ? maxYLength - 2 : 0;

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
  const xTicksCount = dataBuckets.length;
  // distance between 2 ticks
  const xTickDistance = chartWidth / xTicksCount;
  // distance between farthest left & right ticks
  const xWidthAllTicks = (xTicksCount - 1) * xTickDistance;
  const xChartPadding = xTickDistance / 2;
  const xTicksStart = padding + xChartPadding;
  const getX = (index: number) => Math.floor(xTicksStart + xTickDistance * index);
  const xCoordinates = new Array(xTicksCount).fill(0).map((ticksValue: number, index: number) => {
    const tickX = getX(index);
    return tickX;
  });

  const horizontalLineStart = padding;
  const horizontalLineEnd = chartWidth + padding;
  const verticalLineStart = 0;
  const verticalLineEnd = height - padding;

  // setup dates
  // each data item has the same number of buckets
  // with the same dates
  const dataDates = dataBuckets.map((bucket: DataBucket) => new Date(bucket.date));
  const dataDayRange = {
    start: dataDates[0],
    end: dataDates[dataDates.length - 1],
  };
  const daysInData = differenceInDays(dataDayRange.end, dataDayRange.start);

  const makeChartLines = (theme: UikitTheme) =>
    data
      .filter((dataItem: DataItem) => activeLines.includes(dataItem.title) || data.length === 1)
      .map((dataItem: DataItem) => ({
        field: dataItem.title as DonorField,
        title: find(makeChartLineMeta(theme), { field: dataItem.title }).title,
        points: dataItem.buckets
          .map((dataBucket: DataBucket, i: number) => {
            const xCoordinate = getX(i);
            const yCoordinate =
              Math.floor(
                chartHeight -
                  topPadding / 2 -
                  (dataBucket.donors / maxY) * chartHeight +
                  padding / 2 +
                  3 -
                  yAxisAdjustment,
              ) + 0.5;
            // add 0.5 to make line sharp
            return `${xCoordinate},${yCoordinate}`;
          })
          .join(' '),
      }));

  // setup axis elements
  const Axis = ({ points }: { points: PointsCoordinates }) => (
    <polyline
      fill="none"
      points={makePointsString(points)}
      stroke={options.colors.axisBorder}
      strokeWidth={options.strokeWidth}
    />
  );

  const XAxis = () => (
    <Axis
      points={{
        x1: horizontalLineStart,
        x2: horizontalLineEnd,
        y1: verticalLineEnd,
        y2: verticalLineEnd,
      }}
    />
  );

  const YAxis = () => (
    <Axis
      points={{
        x1: horizontalLineStart,
        x2: horizontalLineStart,
        y1: verticalLineStart,
        y2: verticalLineEnd,
      }}
    />
  );

  const YAxisThresholdLine = () => {
    const yCoordinate =
      Math.floor(topPadding + ((maxY - yAxisThreshold || 0) / maxY) * chartHeight) + 1;

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
          points={makePointsString({
            x1: horizontalLineStart,
            x2: horizontalLineEnd,
            y1: yCoordinate,
            y2: yCoordinate,
          })}
          stroke={options.colors.yAxisThresholdBorder}
          strokeDasharray={options.yAxisThresholdDashArray}
          strokeWidth={options.strokeWidth}
        />
      </TextStyleGroup>
    );
  };

  const QuarterLines = () => {
    const quartersInRange = eachQuarterOfInterval(dataDayRange).filter(
      (quarter: Date) =>
        isAfter(quarter, dataDayRange.start) && isBefore(quarter, dataDayRange.end),
    );

    const quartersLines = quartersInRange.reduce((acc, curr: Date) => {
      // check if quarters fall on the same day as a tick.
      // this is to help with positioning - otherwise they'll be
      // ~2 pixels off due to SVG rendering.
      const quarterTickIndex = dataDates
        .filter((d: Date) => compareAsc(d, curr) === 0)
        .map((d: Date) => dataDates.indexOf(d))[0];

      const xCoordinate = Number(
        quarterTickIndex >= 0
          ? getX(quarterTickIndex)
          : xTicksStart +
              (differenceInDays(curr, dataDayRange.start) / daysInData) * xWidthAllTicks,
      );

      return [
        ...acc,
        {
          xCoordinate,
          tooltip: `${getYear(curr)} Q${getQuarter(curr)}`,
        },
      ];
    }, []);

    return (
      <g
        stroke={options.colors.quarterBorder}
        strokeDasharray={options.quarterLineStrokeDashArray}
        strokeWidth={options.strokeWidth}
      >
        {quartersLines.map(({ xCoordinate }: { xCoordinate: number }) => (
          <polyline
            key={xCoordinate}
            points={makePointsString({
              x1: xCoordinate,
              x2: xCoordinate,
              y1: verticalLineStart,
              y2: verticalLineEnd,
            })}
          />
        ))}
      </g>
    );
  };

  const TicksXAxis = () => {
    const yStart = height - padding;
    const yEnd = yStart + options.xTickHeight;
    return (
      <g fill="none" stroke={options.colors.axisBorder} strokeWidth={options.strokeWidth}>
        {xCoordinates.map((tickX) => {
          return (
            <polyline
              key={tickX}
              points={makePointsString({
                x1: tickX,
                x2: tickX,
                y1: yStart,
                y2: yEnd,
              })}
            />
          );
        })}
      </g>
    );
  };

  const HorizontalGuides = () => {
    return (
      <g fill="none" stroke={options.colors.axisBorder} strokeWidth={options.strokeWidth}>
        {new Array(numberOfHorizontalGuides).fill(0).map((guidesValue: number, index: number) => {
          const ratio = (index + 1) / numberOfHorizontalGuides;
          const yCoordinate = Math.floor(chartHeight - chartHeight * ratio + topPadding) + 1;
          return (
            <polyline
              key={yCoordinate}
              points={makePointsString({
                x1: horizontalLineStart,
                x2: horizontalLineEnd,
                y1: yCoordinate,
                y2: yCoordinate,
              })}
            />
          );
        })}
      </g>
    );
  };

  const LabelsXAxis = () => {
    const yStart = height - padding + options.fontSize * 1.6;
    const dateLabels = dataDates.map((date: Date) => formatDate(date, 'dd MMM yyyy'));

    return (
      <TextStyleGroup textAnchor="middle">
        {dateLabels.map((label: string, index: number) => {
          const xCoordinate = getX(index);
          return (
            <text key={xCoordinate}>
              {label.split(' ').map((word: string, wordIndex: number) => (
                <tspan
                  key={word + wordIndex}
                  x={xCoordinate}
                  y={yStart + wordIndex * (options.fontSize + 1)}
                >
                  {word}
                </tspan>
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
          transform={`translate(${options.fontSize - 2},${height / 2}) rotate(-90)`}
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
            <text key={index} textAnchor="end" x={xCoordinate} y={yCoordinate}>
              {parseFloat(labelStr).toFixed(precision).toLocaleString()}
            </text>
          );
        })}
      </TextStyleGroup>
    );
  };

  const ChartLines = () => {
    return (
      <g fill="none" strokeWidth={options.chartStrokeWidth}>
        {makeChartLines(theme).map((chartLine: ChartLine) => (
          <polyline
            key={chartLine.field}
            points={chartLine.points}
            stroke={
              find(makeChartLineMeta(theme), { field: chartLine.field }).color ||
              options.colors.chartLineDefault
            }
          />
        ))}
      </g>
    );
  };

  const ChartPoints = () => {
    return (
      <g>
        {makeChartLines(theme).map((chartLine: ChartLine) => {
          const pointsCoordinates = chartLine.points.split(' ').map((point: string) => {
            const [xCoordinate, yCoordinate] = point
              .split(',')
              .map((xyString: string) => Number(xyString));
            return { xCoordinate, yCoordinate };
          });
          return (
            <g
              fill={
                find(makeChartLineMeta(theme), { field: chartLine.field }).color ||
                options.colors.chartLineDefault
              }
              key={chartLine.field}
            >
              {pointsCoordinates.map((point) => (
                <circle
                  cx={point.xCoordinate}
                  cy={point.yCoordinate}
                  key={point.xCoordinate}
                  r={options.pointRadius}
                />
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  const [toolTipState, setToolTipState] = useState([]);
  const [toolTipIndex, setToolTipIndex] = useState<number | null>(null);

  const organizeTooltipText = () => {
    // TODO clean this up
    const rnaItems = filter(toolTipState, { dataType: 'RNA' });
    const dnaItems = filter(toolTipState, { dataType: 'DNA' });
    const clinicalItems = filter(toolTipState, { dataType: null });

    const result = [
      ...(rnaItems.length
        ? [
            {
              name: 'RNA',
              color: null,
              count: null,
            },
            ...rnaItems,
          ]
        : []),
      ...(dnaItems.length
        ? [
            {
              name: 'DNA',
              color: null,
              count: null,
            },
            ...dnaItems,
          ]
        : []),
      ...(clinicalItems.length
        ? [
            {
              ...clinicalItems[0], // clinical only has 1 item
              name: 'clinical',
            },
          ]
        : []),
    ];

    return result;
  };

  const InfoBox = () => {
    const tooltipList = organizeTooltipText();

    const xPadding = 10;
    const yPadding = 20;
    const xStart = xCoordinates[toolTipIndex];
    const xIsLeft =
      toolTipState.length > 1
        ? toolTipIndex >= Math.floor(toolTipState.length / 2)
        : toolTipIndex >= 3; //clinical chart only has 1 item: temp solution to make clinical chart flip properly
    const lineHeight = options.toolTipTextSize + 1;
    const boxWidth = 135;
    const xArrowPadding = 10;
    const xPosition = xIsLeft ? xStart - boxWidth - xArrowPadding : xStart + xArrowPadding;
    const xText = xPosition + xPadding;
    const xCircleTextGap = 10;
    const boxHeight = yPadding * 1.5 + options.toolTipTextSize * tooltipList.length;
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
        {/* vertical dotted guiding line */}
        <line
          x1={xStart}
          y1={verticalLineEnd}
          x2={xStart}
          y2={verticalLineStart}
          stroke="black"
          stroke-dasharray="4"
        />
        {/* arrow of tooltip */}
        <polygon points={polyPtOne + polyPtTwo + polyPtThree} />
        {/* tooltip box */}
        <rect rx="5" ry="5" x={xPosition} y={yStart} height={boxHeight} width={boxWidth} />
        {/* tooltip text */}
        <ToolTipStyleGroup>
          <text x={xText} y={yText}>
            {tooltipList.map((tooltipItem, idx) => (
              <>
                {/* circles */}
                <tspan x={xText} y={yText + idx * lineHeight} fill={tooltipItem.color}>
                  {tooltipItem.color && '\u25CF'}
                </tspan>
                {/* text */}
                <tspan x={xText + xCircleTextGap} y={yText + idx * lineHeight}>
                  {`${tooltipItem.name}`}: {tooltipItem.count}
                </tspan>
              </>
            ))}
          </text>
        </ToolTipStyleGroup>
      </g>
    );
  };

  // invisible box (keep track of mouse hovering)
  const HoverDetector = () => {
    return (
      <g fill-opacity="0" stroke="none">
        {xCoordinates.map((xCoordinate, idx) => (
          <rect
            onMouseEnter={() => {
              setToolTipState(tooltipData[idx]);
              setToolTipIndex(idx);
            }}
            onMouseLeave={() => {
              setToolTipState([]);
              setToolTipIndex(null);
            }}
            y={verticalLineStart}
            height={verticalLineEnd - verticalLineStart}
            x={horizontalLineStart + xTickDistance * idx}
            width={xTickDistance}
          />
        ))}
      </g>
    );
  };

  return (
    width && (
      <>
        <svg viewBox={`0 0 ${width} ${height}`}>
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
          <HoverDetector />
          {!!toolTipState.length && <InfoBox />}
        </svg>
      </>
    )
  );
};

export default LineChart;
