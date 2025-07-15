/*
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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

import { css } from '@icgc-argo/uikit';
// @ts-expect-error no type info from lib yet
import { Barchart } from '@overture-stack/arranger-charts';
import { SQONType, useArrangerData } from '@overture-stack/arranger-components';

import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import useFiltersContext from '../file-repository/hooks/useFiltersContext';
import DoughnutChart from './charts/Doughnut';
import Card from './components/Card';
import { commonStyles } from './components/common';

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

const ChartsLayout = () => {
  const { setSQON } = useArrangerData();

  const chartFilter = (esDocumentField: string) => {
    const { setFilterFromFieldAndValue } = useFiltersContext();
    return (filterValue) => {
      const value = { field: esDocumentField, value: filterValue };
      const filter = setFilterFromFieldAndValue(value);
      setSQON(toArrangerV3Filter(filter) as SQONType);
    };
  };

  // field name: filter for field
  const chartFilters = {
    gender: chartFilter('gender'),
    study_id: chartFilter('study_id'),
    age_at_diagnosis: chartFilter('age_at_diagnosis'),
    primary_site: chartFilter('primary_site'),
    vital_status: chartFilter('vital_status'),
    analyses__experiment__experimental_strategy: chartFilter(
      'analyses__experiment__experimental_strategy',
    ),
  };

  return (
    <ChartContainer>
      <Card title="Program ID" css={css({ gridColumnStart: 1, gridRowEnd: 'span 2' })}>
        <Barchart
          fieldName="study_id"
          theme={{
            onClick: (config) => {
              chartFilters.study_id(config.data.key);
            },
            axisLeft: { legend: 'ID' },
            axisBottom: { legend: 'Donors' },
          }}
        />
      </Card>

      <Card title="RDPC Node" css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}>
        <Barchart
          fieldName="study_id"
          theme={{
            axisLeft: { legend: 'Cities' },
            axisBottom: { legend: 'Donors' },
            onDataLoad: (data) => {
              // Arranger Charts currently only supports aggregations, so we have to total the buckets for a total count
              // fieldName doesn't matter as the totals add up in any aggregation
              const totalCount = data.reduce((acc, current) => {
                return acc + current.doc_count;
              }, 0);
              return [{ doc_count: totalCount, key: 'Toronto' }];
            },
          }}
        />
      </Card>

      <Card title="Age at Diagnosis">
        <Barchart
          fieldName="primary_diagnosis__age_at_diagnosis"
          theme={{
            onClick: (config) => chartFilters.age_at_diagnosis(config.data.key),
            axisLeft: { legend: 'Age' },
            axisBottom: { legend: 'Donors' },
          }}
        />
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
        <DoughnutChart fieldName="primary_diagnosis__cancer_type_code" />
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
        <Barchart
          fieldName="primary_site"
          theme={{
            onClick: (config) => chartFilters.primary_site(config.data.key),
            axisLeft: { legend: 'Primary Site' },
            axisBottom: { legend: 'Donors' },
          }}
        />
      </Card>
      <Card title="Gender">
        <Barchart
          fieldName="gender"
          theme={{
            onClick: (config) => chartFilters.gender(config.data.key),
            axisLeft: { legend: 'Genders' },
            axisBottom: { legend: 'Donors' },
          }}
        />
      </Card>
      <Card title="Vital Status">
        <Barchart
          fieldName="vital_status"
          theme={{
            onClick: (config) => chartFilters.vital_status(config.data.key),
            axisLeft: { legend: 'Status' },
            axisBottom: { legend: 'Donors' },
          }}
        />
      </Card>
      <Card title="Experimental Strategy">
        <Barchart
          fieldName="analyses__experiment__experimental_strategy"
          theme={{
            onClick: (config) =>
              chartFilters.analyses__experiment__experimental_strategy(config.data.key),
            axisLeft: { legend: 'Stategy' },
            axisBottom: { legend: 'Donors' },
          }}
        />
      </Card>
    </ChartContainer>
  );
};

export default ChartsLayout;
