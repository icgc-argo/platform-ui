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

const LineChart = ({ fields, interval }: { fields: string[]; interval: number }) => {
  const theme = useTheme();
  const [chartTheme] = injectTheme(theme)([chartThemeFn]);

  const config = {
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

    lineWidth: 1,
    pointSize: 6,
    enableGridX: false,
    enableGridY: false,

    colors: ['#EF4110', '#4596DE'],

    isInteractive: true,
    useMesh: true,
    enableCrosshair: false,
    tooltip: ({ point }) => {
      const {
        serieId,
        data: { x: files, y: months },
      } = point;
      return (
        <TooltipContainer>
          <div>
            {`Files: ${files}`}
            <br />
            {`Months: ${months}`}
          </div>
        </TooltipContainer>
      );
    },

    legends: [
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: -20,
        translateY: -10,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 34,
        itemHeight: 10,
        itemOpacity: 1,
        symbolSize: 6,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
      },
    ],

    theme: {
      ...chartTheme.theme,
      legends: {
        text: {
          fontSize: 6,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Charts.Line fields={fields} interval={interval} consumerConfig={config} />
    </ChartContainer>
  );
};

export default LineChart;
