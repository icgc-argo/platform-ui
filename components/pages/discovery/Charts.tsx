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

import useFiltersContext from '../file-repository/hooks/useFiltersContext';
import BarChart from './charts/Bar';
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
  const chartFilter = (esDocumentField: string) => {
    const { setFilterFromFieldAndValue } = useFiltersContext();
    return (filterValue) => {
      setFilterFromFieldAndValue({ field: esDocumentField, value: filterValue });
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
        <BarChart field="study_id" onClick={(config) => chartFilters.study_id(config.data.key)} />
      </Card>

      <Card title="RDPC Node" css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}>
        <BarChart field="study_id" onClick={(config) => chartFilters.study_id(config.data.key)} />
      </Card>

      <Card title="Age at Diagnosis">
        <BarChart
          field="age_at_diagnosis"
          onClick={(config) => chartFilters.age_at_diagnosis(config.data.key)}
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
        <DoughnutChart field={undefined} />
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
        <BarChart
          field="primary_site"
          onClick={(config) => chartFilters.primary_site(config.data.key)}
        />
      </Card>

      <Card title="Gender">
        <BarChart field="gender" onClick={(config) => chartFilters.gender(config.data.key)} />
      </Card>

      <Card title="Vital Status">
        <BarChart
          field="vital_status"
          onClick={(config) => chartFilters.vital_status(config.data.key)}
        />
      </Card>

      <Card title="Experimental Strategy">
        <BarChart
          field="analyses__experiment__experimental_strategy"
          onClick={(config) =>
            chartFilters.analyses__experiment__experimental_strategy(config.data.key)
          }
        />
      </Card>
    </ChartContainer>
  );
};

export default ChartsLayout;
