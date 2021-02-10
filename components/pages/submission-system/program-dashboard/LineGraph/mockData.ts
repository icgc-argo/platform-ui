import { startOfToday, format as formatDate, sub as subDate } from 'date-fns';

const mockDataStub = {
  clinical: [''],
  molecular: ['DNA Raw Reads', 'Alignment', 'Sanger VC', 'Mutect2', 'RNA Raw Reads', 'RNA-Seq1', 'RNA-Seq2'],
};
const committedDonors = 2000;
const getRandomDonors = () => Math.floor(Math.random() * committedDonors);

// move this to backend probably
const getDates = ({ days, intervals }: { days: number, intervals: number }) => {
  const today = startOfToday();
  return [...Array(intervals).keys()]
    .sort((a, b) => b - a)
    .map((x: number) => subDate(today, { days: Math.floor(days / intervals * x) }))
    .map((x: Date) => Number(formatDate(x, 't')));
};

export const makeMockData = ({ days, intervals }) => {
  const dates = getDates({ days, intervals });
  return Object.keys(mockDataStub).map(chartType => ({
    chartType,
    committedDonors,
    lines: mockDataStub[chartType].map(title => ({
      title,
      points: dates.map(date => ({
        date,
        donors: getRandomDonors()
      }))
    }))
  }))
};
