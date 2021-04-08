/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
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

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { find } from 'lodash';
import { css } from '@emotion/core';
import { format as formatDate, subDays } from 'date-fns';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import Typography from 'uikit/Typography';
import { ContentError, ContentLoader } from 'components/placeholders';
import DASHBOARD_SUMMARY_QUERY from '../DASHBOARD_SUMMARY_QUERY.gql';
import { usePageQuery } from 'global/hooks/usePageContext';
import {
  DashboardCard,
  DashboardSummaryData,
  DashboardSummaryDataVariables
} from '../common';
import LineChart from './LineChart';
import RangeControlBar from './RangeControlBar';
import {
  ChartType,
  DonorField,
  ProgramDonorPublishedAnalysisByDateRangeQueryData,
  ProgramDonorPublishedAnalysisByDateRangeQueryVariables
} from './types';
import Legend from './Legend';
import { chartLineDict, rangeButtons } from './utils';
import PROGRAM_DONOR_PUBLISHED_ANALYSIS_QUERY from './gql/PROGRAM_DONOR_PUBLISHED_ANALYSIS_QUERY.gql';

const CHART_HEIGHT = 220;
const CHART_PADDING = 12;
const CHART_BUCKETS = 7;
const DATE_RANGE_DISPLAY_FORMAT = 'Y/MM/dd';

// TODO: replace with program first published date
const TEMP_ALL_START_DATE = new Date('2021-01-01T00:00:00.000Z');

const useProgramDonorPublishedAnalysisByDateRangeQuery = (
  bucketCount: number,
  dateRangeFrom: string,
  dateRangeTo: string,
  donorFields: DonorField[],
  programShortName: string,
  options: Omit<
    QueryHookOptions<ProgramDonorPublishedAnalysisByDateRangeQueryData, ProgramDonorPublishedAnalysisByDateRangeQueryVariables>,
    'variables'
  > = {},
) => {
  const hook = useQuery<ProgramDonorPublishedAnalysisByDateRangeQueryData, ProgramDonorPublishedAnalysisByDateRangeQueryVariables>(
    PROGRAM_DONOR_PUBLISHED_ANALYSIS_QUERY,
    {
      ...options,
      variables: {
        bucketCount,
        dateRangeFrom,
        dateRangeTo,
        donorFields,
        programShortName,
      },
    },
  );
  return hook;
};

const ClinicalChart = ({
  chartType,
  title,
}: {
  chartType: ChartType;
  title: string;
}) => {
  // handle date range selection
  const [dateRangeFrom, setDateRangeFrom] = useState(null);
  const [dateRangeTo, setDateRangeTo] = useState(null);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');

  useEffect(() => {
    const daysInRange = find(rangeButtons, { title: activeRangeBtn }).days;
    const today = new Date();
    const dateRangeStart = activeRangeBtn === 'All'
      ? TEMP_ALL_START_DATE // TODO: change to program first published date
      : subDays(today, daysInRange);
    setDateRangeFrom(dateRangeStart);
    setDateRangeTo(today);
  }, [activeRangeBtn]);

  // get programShortName
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();

  // get committed donors & program first published date
  const {
    data: programQueryData,
    error: programQueryError,
    loading: isProgramQueryLoading
  } = useQuery<DashboardSummaryData, DashboardSummaryDataVariables>(
    DASHBOARD_SUMMARY_QUERY,
    {
      variables: { programShortName: programShortName },
    },
  );

  const donorFieldsByChartType = chartLineDict
    .filter(line => line.chartType === chartType)
    .map(line => line.field);

  const {
    data: { programDonorPublishedAnalysisByDateRange = [] } = {},
    error: rangeQueryError,
    loading: isRangeQueryLoading = true,
  } = useProgramDonorPublishedAnalysisByDateRangeQuery(
    CHART_BUCKETS,
    dateRangeFrom,
    dateRangeTo,
    donorFieldsByChartType as DonorField[],
    programShortName
  );

  console.log({chartType, programQueryData, programDonorPublishedAnalysisByDateRange})

  // make the chart responsive
  const lineChartRef = useRef<HTMLDivElement>(null);
  const { resizing, width: responsiveWidth } = useElementDimension(lineChartRef);
  const [initialWidth, setInitialWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (lineChartRef.current) {
      setInitialWidth(lineChartRef.current.getBoundingClientRect().width);
    }
  });

  // handle the legend
  const [activeLines, setActiveLines] = useState(donorFieldsByChartType);
  const handleLegendInput = (line: string) => {
    const nextLines = activeLines.includes(line)
      ? activeLines.filter(activeLine => activeLine !== line)
      : activeLines.concat(line);
    setActiveLines(nextLines);
  };

  const hasError = rangeQueryError || programQueryError;
  const isLoading = !dateRangeFrom ||
    !dateRangeTo ||
    isRangeQueryLoading ||
    isProgramQueryLoading ||
    programDonorPublishedAnalysisByDateRange.length === 0;

  return (
    <DashboardCard>
      <div style={{
        display: 'flex',
        height: 26,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="default" component="span">
          {title}
        </Typography>
        {chartType === 'molecular' && !isLoading && !hasError && (
          <Legend
            activeLines={activeLines}
            chartType={chartType}
            handleLegendInput={handleLegendInput}
          />
        )}
      </div>
      <div
        css={css`
              height: ${CHART_HEIGHT + CHART_PADDING}px;
              padding: ${CHART_PADDING}px 0;
            `}
      >
        {hasError
          ? <ContentError />
          : isLoading
            ? <ContentLoader />
            : (<>
              <RangeControlBar
                activeBtn={activeRangeBtn}
                handleBtnClick={setActiveRangeBtn}
                rangeArray={[
                  formatDate(dateRangeFrom, DATE_RANGE_DISPLAY_FORMAT),
                  formatDate(dateRangeTo, DATE_RANGE_DISPLAY_FORMAT)
                ]}
              />
              <div
                ref={lineChartRef}
                style={{
                  width: '100%',
                  paddingTop: CHART_PADDING,
                  filter: `blur(${resizing ? 8 : 0}px)`
                }}
              >
                <LineChart
                  activeLines={activeLines}
                  chartType={chartType}
                  data={programDonorPublishedAnalysisByDateRange}
                  hasQuarterLines
                  hasYAxisThresholdLine
                  height={CHART_HEIGHT}
                  horizontalGuides={4}
                  precision={0}
                  width={responsiveWidth || initialWidth}
                  yAxisThreshold={programQueryData.program.commitmentDonors}
                  yAxisThresholdLabel="Committed"
                  yAxisTitle="donors"
                />
              </div>
            </>)}
      </div>
    </DashboardCard>
  );
};

export default ClinicalChart;
