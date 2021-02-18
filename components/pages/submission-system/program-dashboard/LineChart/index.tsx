import React, { useRef, useState } from 'react';
import { format as formatDate } from 'date-fns';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import { makeMockData } from './mockData';
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

// replace with data import from API
const mockData = makeMockData('year');

const data = mockData[0].lines[0].points.map(({ date, donors }) => ({
  x: date,
  y: donors,
  // TODO: only show year for first instance
  label: formatDate(date*1000, 'd MMM yyyy'),
  // TODO: add line name to tooltip for molecular
  tooltip: [formatDate(date*1000, 'MMM d, yyyy'), `${donors} donors`],
}));

const LineGraphWrapper = () => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);
  const [lineChartData, setLineChartData] = useState(data);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');

  console.log({ activeRangeBtn })
  
  // 1. set state: which button is active 
  // 2. click buttons to set active button
  // 3. on click, change which data is live

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