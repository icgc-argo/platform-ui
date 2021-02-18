export const getMinMax = (data, minMax, coord) => Math[minMax](...data.lines
  .map(line => line.points
    .map(point => point[coord])
  )
  .reduce((acc, curr) => ([...acc, ...curr]), []));
export const makeJSEpoch = (unixEpoch: number) => unixEpoch * 1000;

export const rangeButtons = [
  {
    data: 700,
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
