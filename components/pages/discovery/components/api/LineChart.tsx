/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { LineSvgProps, ResponsiveLine, Serie } from '@nivo/line';
import { Chart } from './Chart';

// Serves primarily as a wrapper around the Nivo chart library implementation of Bar charts

// configs are partials to be composable
export type LineChartConfig = Partial<LineSvgProps> & {
  height?: number;
  width?: number;
};
type RequiredConfig = Required<Pick<LineChartConfig, 'data'>> & LineChartConfig;

// default
const baseConfig: LineChartConfig = {
  xScale: { type: 'linear' },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: true,
    reverse: false,
  },
  yFormat: ' >-.2f',
  axisTop: null,
  axisRight: null,
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendOffset: 0,
    legendPosition: 'middle',
    truncateTickAt: 0,
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendOffset: 0,
    truncateTickAt: 0,
  },
  enableGridX: false,
  enableGridY: false,
  lineWidth: 1,
  pointSize: 3,
  pointColor: { theme: 'background' },
  pointBorderWidth: 2,
  pointBorderColor: { from: 'serieColor' },
  pointLabel: 'data.yFormatted',
  pointLabelYOffset: -12,
  enableTouchCrosshair: true,
  legends: [
    {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: -10,
      translateY: 0,
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
};

/**
 * Create line chart config from consumer provided config
 *
 * @param config - See Nivo line chart config docs - must supply 'data', 'indexBy' and 'keys'
 * @returns A Nivo line chart configuration object
 */
function createLineConfig(consumerConfig: RequiredConfig): RequiredConfig {
  const config = { ...baseConfig, ...consumerConfig };
  return config;
}

/**
 * @link https://nivo.rocks/line/
 *
 * @param props
 * @param props.data - Data for chart
 * @param props.chartConfig - Nivo compotabible chart config
 *
 * Place in a flex parent
 * Provide an explicit height in chart config to have a scrollable chart
 * Defaults to response dimensions
 *
 * @returns LineChart component
 */

const LineChart = ({
  data,
  config,
}: {
  data: Serie[];
  config: RequiredConfig | ((baseConfig: LineChartConfig) => RequiredConfig);
}) => {
  const resolvedConfig = typeof config === 'function' ? config(baseConfig) : config;
  const finalConfig = createLineConfig({ ...resolvedConfig, data });

  return (
    <Chart height={config?.height}>
      <ResponsiveLine {...finalConfig} />
    </Chart>
  );
};
export default LineChart;
