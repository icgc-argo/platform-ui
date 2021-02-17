import React, { useRef, useState } from 'react';
import { format as formatDate } from 'date-fns';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import { makeMockData } from './mockData';
import LineChart from './chart';
import RangeControlBar from './RangeControlBar';

const rangeControlBarOptions = {
  buttons: [
    {
      title: 'All',
      label: 'All',
      data: null,
    },
    {
      title: 'One year',
      label: '1Y',
      data: 365,
    },
    {
      title: 'One month',
      label: '1M',
      data: 30,
    },
    {
      title: 'One week',
      label: '1W',
      data: 7,
    }
  ],
  range: { from: '02/22/2022', to: '02/29/2022' },
};

// replace with data import from API
const mockData = makeMockData('month');

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

  // console.log({ width })

  // 1. click buttons to set active button
  // 2. on click, change which data is live

  // useEffect(() => {

  // },[]);

  return (
    <>
      <RangeControlBar
        handleClick={() => {}}
        options={rangeControlBarOptions}
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