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

import React, { useRef } from 'react';
import { css } from '@emotion/core';
import useElementDimension from 'uikit/utils/Hook/useElementDimension';
import Typography from 'uikit/Typography';
import { DashboardCard } from '../common';
import LineChart from './LineChart';
import RangeControlBar from './RangeControlBar';
import { DataObj } from './types';

const CHART_HEIGHT = 230;
const CHART_PADDING = 12;

const ClinicalChart = ({
  activeRangeBtn,
  data,
  setActiveRangeBtn,
  title,
}: {
  activeRangeBtn: string;
  data: DataObj;
  setActiveRangeBtn: any; // type?
  title: string;
}) => {
  const lineChartRef = useRef(null);
  const { resizing, width } = useElementDimension(lineChartRef);

  return data ? (
    <DashboardCard>
      <Typography variant="default" component="span">
        {title}
      </Typography>
      <div
        css={css`
          height: ${CHART_HEIGHT + CHART_PADDING}px;
          padding: ${CHART_PADDING}px 0 0;
        `}
        >
        <RangeControlBar
          activeBtn={activeRangeBtn}
          handleBtnClick={setActiveRangeBtn}
          rangeArray={[0, 1]}
          />
        <div
          ref={lineChartRef}
          style={{
            // border: '1px solid pink',
            width: '100%',
            filter: `blur(${resizing ? 8 : 0}px)`
          }}
          >
          <LineChart
            data={data}
            hasQuarterLines
            height={CHART_HEIGHT}
            horizontalGuides={4}
            precision={0}
            width={width}
            yAxisTitle="donors"
            />
        </div>
      </div>
    </DashboardCard>
  ): null;
};

export default ClinicalChart;
