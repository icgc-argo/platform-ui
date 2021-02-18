export const getMax = (data, coord) => Math.max(...data.map(d => d[coord]));
export const getMin = (data, coord) => Math.min(...data.map(d => d[coord]));
export const makeJSEpoch = (unixEpoch: number) => unixEpoch * 1000;

export const rangeButtons = [
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