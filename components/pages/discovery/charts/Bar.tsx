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
import Charts from 'charts';
import { ChartContainer } from './Chart';
import { chartThemeFn } from './theme';
import { TooltipContainer } from './Tooltip';
import { injectTheme } from './util';

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

    tooltip: ({ data }) => {
      const { doc_count, key } = data;
      return (
        <TooltipContainer>
          <div>
            <div>{`${key}:`}</div>
            <div>{`${doc_count}: Donors`}</div>
          </div>
        </TooltipContainer>
      );
    },

    onClick: (data) => {
      console.log('data', data);
      alert('Chart clicked');
    },
  };

  return (
    <ChartContainer>
      <Charts.Bar field={field} consumerConfig={config} />
    </ChartContainer>
  );
};

export default BarChart;
