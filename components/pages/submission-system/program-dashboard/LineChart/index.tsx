import React, { useEffect, useRef, useState } from 'react';
import { format as formatDate } from 'date-fns';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import LineChartEl from './LineChartEl';
import RangeControlBar from './RangeControlBar';
import { makeMockData } from './mockData';

// TODO: when API is available, receive data from parent component as a prop.

const mockLineChartData = makeMockData(365);
const lineChartData = mockLineChartData[0].lines[0].points.map(({ date, donors }) => ({
  x: date,
  y: donors,
  // TODO: only show year for first instance
  label: formatDate(date*1000, 'd MMM yyyy'),
  // TODO: add line name to tooltip for molecular, e.g. "Raw Reads"
  tooltip: [formatDate(date*1000, 'MMM d, yyyy'), `${donors} donors`],
}));

const LineChart = () => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');
  // console.log({ activeRangeBtn })

  // 1. set state: which button is active 
  // 2. click buttons to set active button
  // 3. on click, change which data is live

  useEffect(() => {

  },[activeRangeBtn]);

  return (
    <>
      <RangeControlBar
        activeBtn={activeRangeBtn}
        handleBtnClick={setActiveRangeBtn}
        rangeArray={[0, 1]}
        />
      <div
        ref={lineChartRef}
        style={{ border: '1px solid pink', width: '100%', filter: `blur(${resizing ? 8 : 0}px)`}}
        >
        <LineChartEl
          data={lineChartData}
          hasQuarterLines
          height={240}
          horizontalGuides={4}
          precision={0}
          width={width}
          />
      </div>
    </>
  );
}

export default LineChart;