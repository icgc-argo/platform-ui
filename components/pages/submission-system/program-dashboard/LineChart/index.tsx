import React, { useRef } from 'react';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import LineChartEl from './LineChartEl';
import RangeControlBar from './RangeControlBar';

// TODO: when API is available, receive data from parent component as a prop.

const LineChart = ({ activeRangeBtn, data, setActiveRangeBtn }) => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);

  return data ? (
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
          data={data}
          hasQuarterLines
          height={240}
          horizontalGuides={4}
          precision={0}
          width={width}
          />
      </div>
    </>
  ): null;
}

export default LineChart;