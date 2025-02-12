/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
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
import { get } from 'lodash';
import { useEffect } from 'react';
import { useArrangerCharts } from './arranger';
import { BUCKETS_TO_BAR_CHART } from './config';
import { ChartConfig } from './types';

export type BarChartConfig = Partial<ResponsiveBarSvgProps<{}>> & {
  height?: number;
  width?: number;
};
type RequiredConfig = Required<Pick<BarChartConfig, 'data' | 'indexBy' | 'keys'>> & BarChartConfig;

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

/**
 *
 * @param field - Arranger field? (from aggs?)
 * @returns
 */
const BarChart = ({
  field,
  consumerConfig,
  onLoad,
  onError,
}: {
  field: string;
  consumerConfig?: ChartConfig;
  onLoad?: any;
  onError?: any;
}) => {
  const { data: rawData, loading, error } = useArrangerCharts({ field });
  console.log('data', rawData, 'loading', loading, 'error', error);

  useEffect(() => {
    if (error) {
      onError && onError(error);
    }
  }, [loading, error]);

  const dataConfig = {
    ...BUCKETS_TO_BAR_CHART,
    // TODO: correct data properties when using ArrangerV3 data fetcher
    data: get(rawData, `file.aggregations.${field}.buckets`, []).map(
      ({ __typename, ...rest }) => rest,
    ),
  };
  console.log('dc', dataConfig);
  return !loading && !error && <ResponsiveBar {...{ ...dataConfig, ...consumerConfig }} />;
};

export default BarChart;

/**
 * also pass data along to config incase labels need to be generated ie. donor__field__blah to Donor Field
 * ! provide sensible default, allow overwriting !
 * TODO: expose some meta so consumer can style eg. labels , bucket count etc
 */

//   const resolvedConfig = typeof config === 'function' ? config(baseConfig) : config;
