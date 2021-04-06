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

import React, { useEffect, useRef, useState } from 'react';
import { find } from 'lodash';
import { css } from '@emotion/core';
import { format as formatDate, subDays } from 'date-fns';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import Typography from 'uikit/Typography';
import { DashboardCard } from '../common';
import LineChart from './LineChart';
import RangeControlBar from './RangeControlBar';
import {
  ChartType,
  DataObj,
  DonorField,
  ProgramDonorPublishedAnalysisByDateRangeQueryData,
  ProgramDonorPublishedAnalysisByDateRangeQueryVariables
} from './types';
import Legend from './Legend';
import { chartLineColors, convertUnixEpochToJSEpoch, rangeButtons } from './utils';
import PROGRAM_DONOR_PUBLISHED_ANALYSIS_QUERY from './gql/PROGRAM_DONOR_PUBLISHED_ANALYSIS_QUERY.gql';

const CHART_HEIGHT = 220;
const CHART_PADDING = 12;
const CHART_BUCKETS = 7;
const DATE_RANGE_FORMAT = 'Y/MM/dd';

const donorFields = {
  clinical: [
    'createdAt'
  ],
  molecular: [
  'mutectFirstPublishedDate',
  'alignmentFirstPublishedDate',
  'rawReadsFirstPublishedDate',
  'sangerVcsFirstPublishedDate'
  ]
};

export const useProgramDonorPublishedAnalysisByDateRangeQuery = (
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
  programShortName,
  title,
}: {
  chartType: ChartType;
  programShortName: string;
  title: string;
}) => {
  const [dateRangeFrom, setDateRangeFrom] = useState(null);
  const [dateRangeTo, setDateRangeTo] = useState(null);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');

  useEffect(() => {
    const daysInRange = find(rangeButtons, { title: activeRangeBtn }).days;
    const today = new Date();
    const dateRangeStart = subDays(today, daysInRange);
    setDateRangeFrom(dateRangeStart);
    setDateRangeTo(today);
  }, [activeRangeBtn]);

// TODO:
// - improve how i get the dates - i need ISO strings
// - determine the donor fields by clinical or molecular
// - handle error & loading
// - remove mock data
  const {
    data: { programDonorPublishedAnalysisByDateRange = [] } = {},
    error: programDonorPublishedAnalysisByDateRangeQueryError,
    loading: isCardLoading = true,
  } = useProgramDonorPublishedAnalysisByDateRangeQuery(
    CHART_BUCKETS,
    dateRangeFrom,
    dateRangeTo,
    donorFields[chartType] as DonorField[],
    programShortName
  );

  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);
  const [activeLines, setActiveLines] = useState(Object.keys(chartLineColors));
  const handleLegendInput = (line: string) => {
    const nextLines = activeLines.includes(line)
      ? activeLines.filter(activeLine => activeLine !== line)
      : activeLines.concat(line);
    setActiveLines(nextLines);
  };

  return dateRangeFrom && dateRangeTo && (
    <DashboardCard>
      <div style={{ display: 'flex', height: 26, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="default" component="span">
          {title}
        </Typography>
        {chartType === 'molecular' && (
          <Legend
            activeLines={activeLines}
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
        <RangeControlBar
          activeBtn={activeRangeBtn}
          handleBtnClick={setActiveRangeBtn}
          rangeArray={[
            formatDate(dateRangeFrom, DATE_RANGE_FORMAT),
            formatDate(dateRangeTo, DATE_RANGE_FORMAT)
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
            {programDonorPublishedAnalysisByDateRange.length > 0 ? (
              <LineChart
                activeLines={activeLines}
                chartType={chartType}
                data={programDonorPublishedAnalysisByDateRange}
                hasQuarterLines
                hasYAxisThresholdLine
                height={CHART_HEIGHT}
                horizontalGuides={4}
                precision={0}
                width={width}
                yAxisThreshold={1700} // TODO committed donors
                yAxisThresholdLabel="Committed"
                yAxisTitle="donors"
                />
            ): <p>loading</p>}
        </div>
      </div>
    </DashboardCard>
  );
};

export default ClinicalChart;
