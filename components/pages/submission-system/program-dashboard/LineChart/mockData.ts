import { startOfToday, format as formatDate, sub as subDate } from 'date-fns';

type MockDataArg = keyof typeof mockDataArgs;

const mockDataStub = {
  clinical: [''],
  molecular: ['DNA Raw Reads', 'Alignment', 'Sanger VC', 'Mutect2', 'RNA Raw Reads', 'RNA-Seq1', 'RNA-Seq2'],
};
const committedDonors = 2000;
const getRandomDonors = (count: number) => [...Array(count).keys()].map(k => Math.floor(Math.random() * committedDonors)).sort((a,b) => a - b);
const mockDataArgs = {
  all: { days: 700, intervals: 7 },
  year: { days: 365, intervals: 7 },
  month: { days: 30, intervals: 7 },
  week: { days: 7, intervals: 7 },
};

// move this to backend probably
const getDates = ({ days, intervals }: { days: number, intervals: number }) => {
  // const today = startOfToday();
  // use this to fake quarters on weekly/monthly view
  const today = new Date('Sun Apr 4 2021 00:00:00 GMT-0500 (Eastern Standard Time)');
  console.log({ today })
  return [...Array(intervals).keys()]
    .sort((a, b) => b - a)
    .map((x: number) => subDate(today, { days: Math.floor(days / intervals * x) }))
    .map((x: Date) => Number(formatDate(x, 't')));
};

export const makeMockData = (arg: MockDataArg) => {
  const dates = getDates(mockDataArgs[arg]);
  const donors = getRandomDonors(dates.length);
  return Object.keys(mockDataStub).map(chartType => ({
    chartType,
    committedDonors,
    lines: mockDataStub[chartType].map((title: string) => ({
      title,
      points: dates.map((date, i) => ({
        date,
        donors: donors[i]
      }))
    }))
  }));
};
