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

import { css, DnaLoader } from '@icgc-argo/uikit';
import {
  BarChart,
  ChartsThemeProvider,
  SunburstChart,
  useChartsContext,
} from '@overture-stack/arranger-charts';
import { SQONType, useArrangerData } from '@overture-stack/arranger-components';

import { toArrangerV3Filter } from 'global/utils/arrangerFilter';
import { useMemo } from 'react';
import useFiltersContext from '../file-repository/hooks/useFiltersContext';
import { addInFilters } from '../file-repository/utils';
import { mapFromCodeToCancerType } from './cancerTypeMapping';
import Card from './components/Card';
import { commonStyles } from './components/common';

const getAgeAtDiagnosisFilter = (key, field) => {
  // ranges from query are less than 18, 18 => 65, 65+
  // { key: Less than 18, to: 18 },{ key: 8 to 65, from: 18, to: 66 },{ key: 65 and above, from: 65 }
  switch (key) {
    case '< 18':
      return {
        op: 'and',
        content: [{ op: '<=', content: { field, value: 17 } }],
      };
      break;

    case '18 - 65':
      return {
        op: 'and',
        content: [
          { op: '>=', content: { field, value: 18 } },
          { op: '<=', content: { field, value: 65 } },
        ],
      };
      break;

    case '> 65':
      return {
        op: 'and',
        content: [{ op: '>', content: { field, value: 65 } }],
      };
      break;

    default:
      return {};
  }
};

// https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic
export const chartColors = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#ffff99',
  '#b15928',
];

const ChartLoader = () => (
  <div
    css={css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    })}
  >
    <DnaLoader />
  </div>
);
const ChartEmptyData = () => (
  <div
    css={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontSize: '13px',
      color: '#525767',
    })}
  >
    No Donor data is available for display
  </div>
);

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

const getCancerCodes = (chartConfig): string[] => {
  // either inner ring with codes, or outer ring with parentId of inner ring
  if (chartConfig.data?.parentId) {
    return [chartConfig.data.id];
  } else {
    return chartConfig.data?.children || [];
  }
};

const commonTheme = { axisLeft: { legend: null }, axisBottom: { legend: null } };

// Chart visible vars
const VisibleBars = ({ maxBars, fieldName }) => {
  const { getChartData } = useChartsContext();
  const { isLoading, isError, data } = getChartData(fieldName);
  return isLoading || isError || data?.length === 0 ? null : (
    <div>{`Top ${Math.min(maxBars, data.length)} of ${data.length}`}</div>
  );
};
const defaultVisibleBars = 12;

const ChartsLayout = () => {
  const { setSQON } = useArrangerData();
  const { filters, setFilterFromFieldAndValue, replaceAllFilters } = useFiltersContext();

  // catch all for any filters changes to sync with Arranger context eg. on page refresh
  useMemo(() => {
    setSQON(toArrangerV3Filter(filters) as SQONType);
  }, [filters]);

  const chartFilter = (esDocumentField: string) => {
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
    primary_site: chartFilter('primary_site'),
    vital_status: chartFilter('vital_status'),
    analyses__experiment__experimental_strategy: chartFilter(
      'analyses.experiment.experimental_strategy',
    ),
  };

  return (
    <ChartContainer>
      <ChartsThemeProvider
        colors={chartColors}
        components={{
          EmptyData: ChartEmptyData,
          Loader: ChartLoader,
        }}
      >
        <Card
          title="Program ID"
          Selector={<VisibleBars maxBars={defaultVisibleBars} fieldName="study_id" />}
          css={css({ gridColumnStart: 1, gridRowEnd: 'span 2' })}
        >
          <BarChart
            fieldName="study_id"
            maxBars={defaultVisibleBars}
            handlers={{
              onClick: (config) => {
                return chartFilters.study_id(config.data.key);
              },
            }}
            // @ts-expect-error "nivo" prop not properly spread in lib
            theme={{ ...commonTheme }}
          />
        </Card>

        <Card title="TBD" css={css({ gridColumnStart: 2, gridRowEnd: 'span 1' })}>
          <></>
        </Card>

        <Card
          title="Age at Diagnosis"
          Selector={
            <VisibleBars
              maxBars={defaultVisibleBars}
              fieldName="primary_diagnosis__age_at_diagnosis"
            />
          }
        >
          <BarChart
            fieldName="primary_diagnosis__age_at_diagnosis"
            maxBars={defaultVisibleBars}
            ranges={[
              { key: '< 18', to: 18 },
              { key: '18 - 65', from: 18, to: 66 },
              { key: '> 65', from: 66 },
            ]}
            handlers={{
              onClick: (config) => {
                const field = 'primary_diagnosis.age_at_diagnosis';
                const sqonFilterForChart = getAgeAtDiagnosisFilter(config.data.key, field);
                // @ts-expect-error slight difference in specificity between writing a direct SQON filter and unofficial FileRepo types
                const newFilters = addInFilters(sqonFilterForChart, filters);
                replaceAllFilters(newFilters);
                // @ts-expect-error slight difference in specificity between writing a direct SQON filter and unofficial FileRepo types
                setSQON(toArrangerV3Filter(newFilters));
              },
            }}
            // @ts-expect-error "nivo" prop not properly spread in lib
            theme={{
              sortByKey: ['__missing__', '> 65', '18 - 65', '< 18'],
              ...commonTheme,
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
          <SunburstChart
            fieldName="primary_diagnosis__cancer_type_code"
            mapping={mapFromCodeToCancerType}
            handlers={{
              onClick: (config) => {
                const setFilter = chartFilter('primary_diagnosis.cancer_type_code');
                const cancerCodes = getCancerCodes(config);
                setFilter(cancerCodes);
              },
            }}
          />
        </Card>
        <Card
          title="Primary Site"
          Selector={<VisibleBars maxBars={defaultVisibleBars} fieldName="primary_site" />}
          css={css({
            gridColumnStart: 1,
            gridColumnEnd: 3,
            gridRowStart: 3,
            gridRowEnd: 5,
          })}
        >
          <BarChart
            fieldName="primary_site"
            maxBars={defaultVisibleBars}
            handlers={{
              onClick: (config) => {
                return chartFilters.primary_site(config.data.key);
              },
            }}
            // @ts-expect-error "nivo" prop not properly spread in lib
            theme={{
              ...commonTheme,
            }}
          />
        </Card>
        <Card
          title="Gender"
          Selector={<VisibleBars maxBars={defaultVisibleBars} fieldName="gender" />}
        >
          <BarChart
            fieldName="gender"
            maxBars={defaultVisibleBars}
            handlers={{
              onClick: (config) => {
                return chartFilters.gender(config.data.key);
              },
            }}
            // @ts-expect-error "nivo" prop not properly spread in lib
            theme={{
              sortByKey: ['__missing__', 'Other', 'Female', 'Male'],
              ...commonTheme,
            }}
          />
        </Card>
        <Card
          title="Vital Status"
          Selector={<VisibleBars maxBars={defaultVisibleBars} fieldName="vital_status" />}
        >
          <BarChart
            fieldName="vital_status"
            maxBars={defaultVisibleBars}
            handlers={{
              onClick: (config) => {
                return chartFilters.vital_status(config.data.key);
              },
            }}
            // @ts-expect-error "nivo" prop not properly spread in lib
            theme={{
              ...commonTheme,
            }}
          />
        </Card>
        <Card
          title="Experimental Strategy"
          Selector={
            <VisibleBars
              maxBars={defaultVisibleBars}
              fieldName="analyses__experiment__experimental_strategy"
            />
          }
        >
          <BarChart
            fieldName="analyses__experiment__experimental_strategy"
            maxBars={defaultVisibleBars}
            handlers={{
              onClick: (config) => {
                return chartFilters.analyses__experiment__experimental_strategy(config.data.key);
              },
            }}
            // @ts-expect-error "nivo" prop not properly spread in lib
            theme={{
              ...commonTheme,
            }}
          />
        </Card>
      </ChartsThemeProvider>
    </ChartContainer>
  );
};

export default ChartsLayout;
