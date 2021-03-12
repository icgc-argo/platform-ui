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

import React, { useRef, useState } from 'react';
import { css } from '@emotion/core';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import Typography from 'uikit/Typography';
import { DashboardCard } from '../common';
import LineChart from './LineChart';
import RangeControlBar from './RangeControlBar';
import { ChartType, DataObj } from './types';
import Legend from './Legend';
import { chartLineColors, convertUnixEpochToJSEpoch } from './utils';
import { format as formatDate} from 'date-fns';

const CHART_HEIGHT = 220;
const CHART_PADDING = 12;

const ClinicalChart = ({
  activeRangeBtn,
  data,
  setActiveRangeBtn,
  title,
  type,
}: {
  activeRangeBtn: string;
  data: DataObj;
  setActiveRangeBtn: any; // type?
  title: string;
  type: ChartType;
}) => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);
  const [activeLines, setActiveLines] = useState(Object.keys(chartLineColors));
  const handleLegendInput = (line: string) => {
    const nextLines = activeLines.includes(line)
      ? activeLines.filter(activeLine => activeLine !== line)
      : activeLines.concat(line);
    setActiveLines(nextLines);
  };

  const dateRange =  data.lines[0].points.map(point => Number(point.x)).sort();
  const dateRangeFrom = convertUnixEpochToJSEpoch(dateRange[0]);
  const dateRangeTo = convertUnixEpochToJSEpoch(dateRange[dateRange.length - 1]);
  const dateRangeFormat = 'Y/MM/dd';

  return (
    <DashboardCard>
      <div style={{ display: 'flex', height: 26, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="default" component="span">
          {title}
        </Typography>
        {type === 'molecular' && (
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
          rangeArray={[formatDate(dateRangeFrom, dateRangeFormat), formatDate(dateRangeTo, dateRangeFormat)]}
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
            data={data}
            hasQuarterLines
            hasYAxisThresholdLine
            height={CHART_HEIGHT}
            horizontalGuides={4}
            precision={0}
            type={type}
            width={width}
            yAxisThreshold={1700} // TODO committed donors
            yAxisThresholdLabel="Committed"
            yAxisTitle="donors"
            />
        </div>
      </div>
    </DashboardCard>
  );
};

export default ClinicalChart;
