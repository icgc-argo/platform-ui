import React from 'react';
import { addDays, differenceInDays, eachQuarterOfInterval, getQuarter, getYear, isAfter, isBefore, isDate, subDays, fromUnixTime, compareAsc } from 'date-fns';
import * as u from './utils';

const options = {
  colors: {
    text: '#555',
    axisBorder: '#888',
    quarterBorder: 'green',
    committedBorder: '#0774d3'
  },
  fontFamily: 'Work Sans, sans-serif',
  fontSize: 10,
  strokeWidth: 0.5,
  xTickHeight: 5,
};

const styles = {
  axisLabel: {
    color: options.colors.text,
    fontFamily: options.fontFamily,
    fontSize: options.fontSize,
  }
};

const LineChartEl = ({
  data,
  hasQuarterLines = false,
  height,
  horizontalGuides: numberOfHorizontalGuides,
  precision,
  width,
}) => {
  if (!data) return;
  const maxY = u.getMax(data, 'y');
  const yAxisDigits =
    parseFloat(maxY.toString()).toFixed(precision).length + 1;

  const padding = (options.fontSize + yAxisDigits) * 3;
  const chartWidth = width - padding * 1.5;
  const chartHeight = height - padding * 2;

  // X axis ticks, labels, and line/point positions
  // are 1/2 tick distance from the left and right
  const xTickDistance = chartWidth / data.length;
  // distance between farthest left & right ticks
  const xWidthAllTicks = (data.length - 1) * xTickDistance;
  const xChartPadding = xTickDistance / 2;
  const xTicksStart = padding + xChartPadding;
  const getX = (index: number) => Math.floor(xTicksStart + (xTickDistance * index));

  const dates = data.map(d => new Date(u.makeJSEpoch(d.x)));
  const day0 = u.makeJSEpoch(data[0].x);
  const dayLast = u.makeJSEpoch(data[data.length-1].x);
  const daysInData = differenceInDays(dayLast, day0);
  const dataDayRange = {
    start: day0,
    end: dayLast,
  };

  const points = data
    .map((element, i) => {
      const x = getX(i);
      const y =
        chartHeight - (element.y / maxY) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(' ');

  const Axis = ({ points }) => (
    <polyline fill="none" stroke={options.colors.axisBorder} strokeWidth={options.strokeWidth} points={points} />
  );

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding / 2},${height -
        padding}`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );

  const QuarterLines = () => {
    const startY = padding;
    const endY = height - padding;

    const quartersInRange = eachQuarterOfInterval(dataDayRange)
      .filter(quarter => isAfter(quarter, dataDayRange.start) &&
        isBefore(quarter, dataDayRange.end));
    
    const quartersLines = quartersInRange.reduce((acc, curr) => {
      // perfectly position quarters that are on the same day as a tick.
      const quarterTickIndex = dates
        .filter((d: Date) => compareAsc(d, curr) === 0)
        .map((d: Date) => dates.indexOf(d))[0];

      const x = quarterTickIndex >= 0
        ? getX(quarterTickIndex)
        : xTicksStart + (
            differenceInDays(curr, day0) / daysInData * xWidthAllTicks
          );

      return ([
        ...acc,
        {
          x,
          tooltip: `${getYear(curr)} Q${getQuarter(curr)}`,
        }
      ])
    },[]);

    return (
      <g
        stroke={options.colors.quarterBorder}
        strokeWidth={options.strokeWidth}
        strokeDasharray="5, 5"
        >
          {quartersLines.map(line => (
            <polyline
              key={line.x}
              points={`${line.x},${startY} ${line.x},${endY}`}
              />
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
        {new Array(data.length).fill(0).map((_, index) => {
          const tickX = getX(index);
          return (
            <polyline
              key={_}
              points={`${tickX},${yStart} ${tickX},${yEnd}`}
              />
          );
        })}
      </g>
    );
  };

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width - padding / 2;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const ratio = (index + 1) / numberOfHorizontalGuides;
      const yCoordinate = chartHeight - chartHeight * ratio + padding;
      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={options.colors.axisBorder}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };

  const LabelsXAxis = () => {
    const yStart = height - padding + (options.fontSize * 1.75);
    return data.map((element, index) => {
      const x = getX(index);
      return (
        <text
          style={styles.axisLabel}
          textAnchor="middle"
          >
          {element.label.split(' ').map((word: string, wordIndex: number) => (
            <tspan x={x} y={yStart + wordIndex * (options.fontSize + 1)}>{word}</tspan>
          ))}
        </text>
      );
    });
  };

  const LabelsYAxis = () => {
    const PARTS = numberOfHorizontalGuides;
    return new Array(PARTS + 1).fill(0).map((_, index) => {
      const x = options.fontSize;
      const ratio = index / numberOfHorizontalGuides;

      const yCoordinate =
        chartHeight - chartHeight * ratio + padding + options.fontSize / 2;
      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={styles.axisLabel}
        >
          {parseFloat(maxY * (index / PARTS)).toFixed(precision)}
        </text>
      );
    });
  };

  return width && (
    <svg
      viewBox={`0 0 ${width} ${height}`}
    >
      <XAxis />
      <TicksXAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />
      {hasQuarterLines && <QuarterLines />}
      <HorizontalGuides />

      <polyline
        fill="none"
        stroke={options.colors.committedBorder}
        strokeWidth={options.strokeWidth}
        points={points}
      />
    </svg>
  );
};

export default LineChartEl;
