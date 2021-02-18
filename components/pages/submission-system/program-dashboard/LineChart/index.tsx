import React, { useEffect, useRef, useState } from 'react';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import LineChart from './chart';
import RangeControlBar from './RangeControlBar';

const LineGraphWrapper = ({ data }) => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');
  console.log({ activeRangeBtn })

  // 1. set state: which button is active 
  // 2. click buttons to set active button
  // 3. on click, change which data is live

  // useEffect(() => {

  // },[activeRangeBtn]);

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