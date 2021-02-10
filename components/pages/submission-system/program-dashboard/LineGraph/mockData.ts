import { startOfToday, format as formatDate, sub as subDate } from 'date-fns';

const mockDataStub = {
  clinical: [''],
  molecular: ['DNA Raw Reads', 'Alignment', 'Sanger VC', 'Mutect2', 'RNA Raw Reads', 'RNA-Seq1', 'RNA-Seq2'],
};
const committedDonors = 2000;
const getRandomDonors = () => Math.floor(Math.random() * committedDonors);
const mockDataArgs = {
  all: { days: 700, intervals: 7 },
  year: { days: 365, intervals: 7 },
  month: { days: 30, intervals: 7 },
  week: { days: 7, intervals: 7 },
};
type MockDataArg = keyof typeof mockDataArgs;

// move this to backend probably
const getDates = ({ days, intervals }: { days: number, intervals: number }) => {
  const today = startOfToday();
  return [...Array(intervals).keys()]
    .sort((a, b) => b - a)
    .map((x: number) => subDate(today, { days: Math.floor(days / intervals * x) }))
    .map((x: Date) => Number(formatDate(x, 't')));
};

export const makeMockData = (arg: MockDataArg) => {
  const dates = getDates(mockDataArgs[arg]);
  return Object.keys(mockDataStub).map(chartType => ({
    chartType,
    committedDonors,
    lines: mockDataStub[chartType].map((title: string) => ({
      title,
      points: dates.map(date => ({
        date,
        donors: getRandomDonors()
      }))
    }))
  }));
};
