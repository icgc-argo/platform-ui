/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { useQuery } from '@apollo/client';
import { ComponentProps } from 'react';
import useFiltersContext from '../../hooks/useFiltersContext';
import { FileRepoFiltersType } from '../../utils/types';
import SimpleBarChart from '../SimpleBarChart';
import PROGRAMS_CHART_QUERY from './gql/PROGRAMS_CHART_QUERY';

type ProgramIdsChartData = {
  file: {
    aggregations: {
      program_ids: {
        buckets: {
          doc_count: number;
          key: string;
        }[];
      };
    };
  };
};
type ChartQueryInput = {
  filters: FileRepoFiltersType;
};

const ProgramBarChart = () => {
  const { filters, setFilterFromFieldAndValue } = useFiltersContext();
  const { data, loading } = useQuery<ProgramIdsChartData, ChartQueryInput>(PROGRAMS_CHART_QUERY, {
    variables: {
      filters,
    },
  });
  const handleBarClick = (value) => {
    setFilterFromFieldAndValue({ field: 'study_id', value });
  };

  const chartData: ComponentProps<typeof SimpleBarChart>['data'] = data
    ? data.file.aggregations.program_ids.buckets.map((bucket) => ({
        category: bucket.key,
        count: bucket.doc_count,
      }))
    : [];

  return (
    <SimpleBarChart loading={loading} data={chartData} type={'program'} onClick={handleBarClick} />
  );
};

export default ProgramBarChart;
