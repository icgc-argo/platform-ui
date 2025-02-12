import { UikitTheme, useTheme } from '@icgc-argo/uikit';
import Bar, { BarChartConfig } from 'charts/Bar';
import { Chart } from 'charts/Chart';
import { injectTheme } from './util';

const chartThemeFn = (injectedTheme: UikitTheme): Pick<BarChartConfig, 'theme'> => ({
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

const BarChart = ({ field }) => {
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
      <Bar field={field} consumerConfig={config} />
    </Chart>
  );
};

export default BarChart;
