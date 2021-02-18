import React, { useEffect, useRef, useState } from 'react';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import LineChart from './chart';
import RangeControlBar from './RangeControlBar';

const rangeButtons = [
  {
    data: null,
    title: 'All',
    label: 'All',
  },
  {
    data: 365,
    title: '1Y',
    label: 'One year',
  },
  {
    data: 30,
    title: '1M',
    label: 'One month',
  },
  {
    data: 7,
    title: '1W',
    label: 'One week',
  }
];

const LineGraphWrapper = ({ data }) => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');

  // 1. set state: which button is active 
  // 2. click buttons to set active button
  // 3. on click, change which data is live

  // useEffect(() => {

  // },[activeRangeBtn]);

  return (
    <>
      <RangeControlBar
        activeBtn={activeRangeBtn}
        buttons={rangeButtons}
        handleBtnClick={setActiveRangeBtn}
        rangeArray={[0, 1]}
        />
      <div
        ref={lineChartRef}
        style={{ border: '1px solid pink', width: '100%', filter: `blur(${resizing ? 8 : 0}px)`}}
        >
        <LineChart
          data={data}
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

export default LineGraphWrapper;