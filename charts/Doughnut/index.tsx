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

import { gql } from '@apollo/client';
import generateChartComponent from 'charts/Chart';
import { BUCKETS_FOR_BAR_CHART } from 'charts/config';
import { Chart } from 'charts/types';
import { get } from 'lodash';
import { cancerTypeCodeMapping, createCategoryMap, createChartInput } from './data';
import DoughnutChart from './ui';

const generateQuery = ({ fieldName }) => gql`
  query ChartsFileCentricAgg($filters:JSON) {
    file {
      aggregations(
        filters: $filters 
        aggregations_filter_themselves: true
      ) {
        ${fieldName} {
          bucket_count
          buckets {
            doc_count
            key
          }
        }
      }
    }
  }
`;

// Regular Aggregation type => chart data
const transformToBarData =
  ({ fieldName }) =>
  (rawData) => {
    const cancerCodes = get(rawData, `file.aggregations.${fieldName}.buckets`, []);
    const categoryMap = createCategoryMap(cancerCodes, cancerTypeCodeMapping);
    const chartInput = createChartInput(categoryMap);
    return chartInput;
  };

// uses filters context
const Doughnut = (consumerProps: Chart & { fieldName: string; onClick: (e) => void }) => {
  const { fieldName } = consumerProps;
  return generateChartComponent({
    Component: DoughnutChart,
    options: {
      query: generateQuery({ fieldName }),
      dataTransformer: transformToBarData({ fieldName }),
    },
    internalConfig: { ...BUCKETS_FOR_BAR_CHART },
  })(consumerProps);
};

export default Doughnut;
