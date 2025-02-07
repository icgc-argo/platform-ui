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

import { ResponsiveBar, ResponsiveBarSvgProps } from '@nivo/bar';
import { Chart } from './Chart';

// Serves primarily as a wrapper around the Nivo chart library implementation of Bar charts

// configs are partials to be composable
export type BarChartConfig = Partial<ResponsiveBarSvgProps<{}>> & {
  height?: number;
  width?: number;
};
type RequiredConfig = Required<Pick<BarChartConfig, 'data' | 'indexBy' | 'keys'>> & BarChartConfig;

// default
const baseConfig: BarChartConfig = {
  layout: 'horizontal',
  keys: [],
  indexBy: '',
  padding: 0.3,
  valueScale: { type: 'linear' },
  colors: { scheme: 'paired' },
  borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
  axisTop: null,
  axisRight: null,
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: '',
    legendPosition: 'middle',
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: '',
    legendPosition: 'start',
  },
  animate: false,
  enableLabel: true,
  enableGridX: false,
  enableGridY: false,
  theme: {
    axis: {
      domain: {
        line: {
          stroke: '#777777',
          strokeWidth: 1,
        },
      },
    },
  },
};

/**
 * Create bar chart config from consumer provided config
 *
 * @param config - See Nivo bar chart config docs - must supply 'data', 'indexBy' and 'keys'
 * @returns A Nivo bar chart configuration object
 */
export function createBarConfig(consumerConfig: RequiredConfig): RequiredConfig {
  const config = { ...baseConfig, ...consumerConfig };
  return config;
}

/**
 * @link https://nivo.rocks/bar/
 *
 * @param props
 * @param props.data - Data for chart
 * @param props.chartConfig - Nivo compotabible chart config
 *
 * Place in a flex parent
 * Provide an explicit height in chart config to have a scrollable chart
 * Defaults to response dimensions
 *
 * @returns BarChart component
 */
const BarChart = ({
  data,
  config,
}: {
  data: Record<string, string | number>[];
  config: RequiredConfig | ((baseConfig: BarChartConfig) => RequiredConfig);
}) => {
  const resolvedConfig = typeof config === 'function' ? config(baseConfig) : config;
  const finalConfig = createBarConfig({ ...resolvedConfig, data });

  return (
    <Chart height={config?.height}>
      <ResponsiveBar {...finalConfig} />
    </Chart>
  );
};
export default BarChart;
