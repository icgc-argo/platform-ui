import React from "react";

const getMax = (data, coord) => Math.max(...data.map(d => d[coord]));
const getMin = (data, coord) => Math.min(...data.map(d => d[coord]));

const STROKE_WIDTH = 1;
const FONT_SIZE = 10;
const FONT_FAMILY = 'Work Sans, sans-serif';
const COLOR = '#555';
const axisLabelStyle = {
  color: COLOR,
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
};
const BORDER_COLOR = '#bbb';
const QUARTERS_LINE_COLOR= '#c0dcf3';
const COMMITTED_LINE_COLOR = '#0774d3';

const LineChart = ({
  data,
  height,
  width,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  precision
}) => {
  // X is only used for positioning, should be 0 - {nPoints}
  const minX = getMin(data, 'x');
  const maxX = getMax(data, 'x');
  const minY = getMin(data, 'y');
  const maxY = getMax(data, 'y');

  const digits =
    parseFloat(maxY.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 1.5;
  const chartHeight = height - padding * 2;

  // X axis ticks, labels, and line/point positions
  // are 1/2 distance from the left and right
  const xDistance = chartWidth / data.length;
  const xStart = padding + (xDistance / 2);
  const getX = (index: number) => xStart + (xDistance * index);

  const points = data
    .map((element, i) => {
      const x = getX(i);
      const y =
        chartHeight - (element.y / maxY) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(' ');

  const Axis = ({ points }) => (
    <polyline fill="none" stroke={BORDER_COLOR} strokeWidth={STROKE_WIDTH} points={points} />
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

  const VerticalGuides = () => {
    // TODO: change this to quarter lines
    // const guideCount = numberOfVerticalGuides || data.length - 1;
    const guideCount = data.length - 1;

    const startY = padding;
    const endY = height - padding;

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount;

      const xCoordinate = padding + ratio * (width - padding * 1.5);

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={BORDER_COLOR}
            strokeWidth={STROKE_WIDTH}
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </React.Fragment>
      );
    });
  };

  const TicksXAxis = () => {
    const yStart = height - padding;
    const yEnd = yStart + (FONT_SIZE * 0.5);
    return (
      <g
        fill="none"
        stroke={BORDER_COLOR}
        strokeWidth={STROKE_WIDTH}
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
            stroke={BORDER_COLOR}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };

  const LabelsXAxis = () => {
    const yStart = height - padding + (FONT_SIZE * 1.75);
    return data.map((element, index) => {
      const x = getX(index);
      return (
        <text
          style={axisLabelStyle}
          textAnchor="middle"
          >
          {element.label.split(' ').map((word: string, wordIndex: number) => (
            <tspan x={x} y={yStart + wordIndex * (FONT_SIZE + 1)}>{word}</tspan>
          ))}
        </text>
      );
    });
  };

  const LabelsYAxis = () => {
    const PARTS = numberOfHorizontalGuides;
    return new Array(PARTS + 1).fill(0).map((_, index) => {
      const x = FONT_SIZE;
      const ratio = index / numberOfHorizontalGuides;

      const yCoordinate =
        chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={axisLabelStyle}
        >
          {parseFloat(maxY * (index / PARTS)).toFixed(precision)}
        </text>
      );
    });
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
    >
      <XAxis />
      <TicksXAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

      <polyline
        fill="none"
        stroke={COMMITTED_LINE_COLOR}
        strokeWidth={STROKE_WIDTH}
        points={points}
      />
    </svg>
  );
};

export default LineChart;
