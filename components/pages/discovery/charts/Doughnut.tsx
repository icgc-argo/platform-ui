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

import { useTheme } from '@icgc-argo/uikit';
import Doughnut from 'charts/Doughnut/ui';
import { ChartContainer } from './Chart';
import { chartThemeFn } from './theme';
import { injectTheme } from './util';

const TEMP_DATA = [
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

    // temp data
    data: TEMP_DATA,
  };

  return (
    <ChartContainer>
      {/* <Charts.Doughnut field={field} consumerConfig={config} /> */}
      <Doughnut config={config} data={TEMP_DATA} />
    </ChartContainer>
  );
};

export default DoughnutChart;
