import { startOfToday, format as formatDate, sub as subDate } from 'date-fns';

const mockDataStub = {
  clinical: [''],
  molecular: ['DNA Raw Reads', 'Alignment', 'Sanger VC', 'Mutect2', 'RNA Raw Reads', 'RNA-Seq1', 'RNA-Seq2'],
};
const committedDonors = 2000;
const intervals = 7;
const getRandomDonors = (count: number) => [...Array(count).keys()].map(k => Math.floor(Math.random() * committedDonors)).sort((a,b) => a - b);

// move this to backend probably
const getDates = (days: number) => {
  // const startDate = startOfToday();
  // use this to fake quarters on weekly/monthly view
  const startDate = new Date('2022-04-05T00:00:00');
  return [...Array(intervals).keys()]
    .sort((a, b) => b - a)
    .map((x: number) => subDate(startDate, { days: Math.floor(days / intervals * x) }))
    .map((x: Date) => Number(formatDate(x, 't')));
};

export const makeMockData = (days: number) => {
  const dates = getDates(days);
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
