import { UikitTheme, useTheme } from '@icgc-argo/uikit';
import Charts from 'charts';
import { Chart } from './Chart';
import { injectTheme } from './util';

const chartThemeFn = (injectedTheme: UikitTheme) => ({
  theme: {
    text: {
      fontFamily: 'Work Sans,sans-serif',
    },
    axis: {
      legend: {
        text: { fontSize: 10, color: injectedTheme.colors.grey },
      },
      ticks: {
        text: {
          fontSize: 11,
          color: 'black',
        },
        line: {
          strokeWidth: 0,
        },
      },
      domain: {
        line: {
          stroke: injectedTheme.colors.grey_2,
          strokeWidth: 1,
        },
      },
    },
  },
});

const doughnutChartData = [
  {
    id: 'Biliary Tract',
    label: 'Biliary Tract',
    colour: '#D4A268',
    value: 68,
  },
  { id: 'Lung', label: 'Lung', colour: '#E66550', value: 24 },
  { id: 'Bladder', label: 'Bladder', colour: '#8B5E9F', value: 12 },
  { id: 'Prostate', label: 'Prostate', colour: '#B8CCE4', value: 3 },
  { id: 'Colorectal', label: 'Colorectal', colour: '#E789F', value: 927 },
  { id: 'Breast', label: 'Breast', colour: '#F2CBBD', value: 24 },
  { id: 'Uterine', label: 'Uterine', colour: '#4472C4', value: 66 },
  { id: 'Skin', label: 'Skin', colour: '#A8D08D', value: 77 },
  { id: 'Oral', label: 'Oral', colour: '#70C4C4', value: 87 },
  { id: 'Ovarian', label: 'Ovarian', colour: '#E371B2', value: 44 },
  { id: 'Brain', label: 'Brain', colour: '#70AD47', value: 23 },
  { id: 'Esophageal', label: 'Esophageal', colour: '#ED7D31', value: 11 },
  { id: 'Liver', label: 'Liver', colour: '#D64F42', value: 88 },
  { id: 'Thyroid', label: 'Thyroid', colour: '#4BACC6', value: 65 },
];

const DoughnutChart = ({ field }) => {
  const theme = useTheme();
  const [chartTheme] = injectTheme(theme)([chartThemeFn]);

  const config = {
    layout: 'horizontal',
    padding: 0.3,
    valueScale: { type: 'linear' },
    colors: { scheme: 'paired' },
    borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
    axisTop: null,
    axisRight: null,
    animate: false,
    enableGridX: false,
    enableGridY: false,
    enableLabel: false,
    axisBottom: {
      legend: 'Donors',
      legendPosition: 'middle',
      tickValues: 4,
      legendOffset: 34,
    },
    axisLeft: {
      legend: 'ID',
      legendPosition: 'middle',
      renderTick: () => null,
      legendOffset: -12,
    },
    margin: {
      top: 12,
      right: 24,
      left: 24,
      bottom: 56,
    },

    colorBy: 'indexValue',
    theme: chartTheme.theme,
  };

  return (
    <Chart>
      <Charts.Doughnut field={field} consumerConfig={config} />
    </Chart>
  );
};

export default DoughnutChart;
