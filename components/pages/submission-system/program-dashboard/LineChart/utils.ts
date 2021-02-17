export const getMax = (data, coord) => Math.max(...data.map(d => d[coord]));
export const getMin = (data, coord) => Math.min(...data.map(d => d[coord]));
export const makeJSEpoch = (unixEpoch: number) => unixEpoch * 1000;
