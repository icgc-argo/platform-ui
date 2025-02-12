/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { css, UikitTheme, useTheme } from '@icgc-argo/uikit';

import { BarChartConfig } from 'charts/Bar';
import DoughnutChart from 'charts/DoughnutChart';
import LineChart, { LineChartConfig } from 'charts/LineChart';
import BarChart from './charts/Bar';
import { injectTheme } from './charts/util';
import Card from './components/Card';
import { commonStyles } from './components/common';
import RangeSelector from './components/Selector';

const colors = [
  '#78BB71',
  '#045093',
  '#7F55CC',
  '#4BCEE5',
  '#F95D31',
  '#24DBB4',
  '#DF1B42',
  '#FEA430',
  '#9BC7ED',
  '#A1A4B1',
  '#CBBBEA',
  '#FA8564',
  '#B7EBF4',
  '#A7F0E1',
  '#FCBEAC',
  '#FEE8CB',
];

const ChartContainer = ({ children }) => (
  <div
    css={css([
      commonStyles.block,
      {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '175px',
        gap: '10px',

        padding: '20px',

        '> div': {
          minWidth: '255px',
        },
      },
    ])}
  >
    {children}
  </div>
);

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
const Charts = () => {
  const theme = useTheme();
  const [chartTheme] = injectTheme(theme)([chartThemeFn]);

  const lineChartConfig: LineChartConfig = {
    axisBottom: {
      legend: 'Months',
      tickValues: 6,
      legendOffset: 34,
      legendPosition: 'middle',
    },
    axisLeft: {
      legend: 'Files',
      renderTick: () => null,
      legendOffset: -12,
      legendPosition: 'middle',
    },

    margin: {
      top: 12,
      right: 24,
      left: 24,
      bottom: 56,
    },

    colors: ['#EF4110', '#4596DE'],

    theme: {
      ...chartTheme.theme,
      legends: {
        text: {
          fontSize: 6,
        },
      },
    },
  };

  const lineChartData = [
    {
      id: 'private',
      color: '#EF4110',
      data: [
        {
          x: 1,
          y: 276,
        },
        {
          x: 7,
          y: 34,
        },
        {
          x: 9,
          y: 168,
        },
        {
          x: 12,
          y: 285,
        },
        {
          x: 18,
          y: 144,
        },
        {
          x: 19,
          y: 129,
        },
      ],
    },
    {
      id: 'published',
      color: '#4596DE',
      data: [
        {
          x: 3,
          y: 11,
        },
        {
          x: 4,
          y: 294,
        },
        {
          x: 6,
          y: 21,
        },
      ],
    },
  ];

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

  return (
    <ChartContainer>
      <Card title="Program ID" css={css({ gridColumnStart: 1, gridRowEnd: 'span 2' })}>
        <BarChart field="study_id" />
      </Card>

      <Card title="RDPC Node" css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}>
        <BarChart field="study_id" />
      </Card>

      <Card
        title="Track Embargo State"
        Selector={
          <RangeSelector
            data={[{ label: '3M' }, { label: '6M' }]}
            activeIndex={0}
            onClick={() => console.log('click')}
          />
        }
        css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}
      >
        <LineChart data={lineChartData} config={lineChartConfig} />
      </Card>

      <Card
        title="Cancer Type and Code"
        css={css({
          gridColumnStart: 3,
          gridColumnEnd: 5,
          gridRowStart: 1,
          gridRowEnd: 3,
        })}
      >
        <DoughnutChart data={doughnutChartData} config={{}} />
      </Card>

      <Card
        title="Primary Site"
        css={css({
          gridColumnStart: 1,
          gridColumnEnd: 3,
          gridRowStart: 3,
          gridRowEnd: 5,
        })}
      >
        <BarChart field="study_id" />
      </Card>

      <Card title="Age at Diagnosis">
        <BarChart field="study_id" />
      </Card>
      <Card title="Gender">
        <BarChart field="study_id" />
      </Card>
      <Card title="Vital Status">
        <BarChart field="study_id" />
      </Card>
      <Card title="Experimental Strategy">
        <BarChart field="study_id" />
      </Card>
    </ChartContainer>
  );
};

export default Charts;
