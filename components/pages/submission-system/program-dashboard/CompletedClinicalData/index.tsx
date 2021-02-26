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

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { find } from 'lodash';
import Typography from 'uikit/Typography';
import PicClipboard from 'static/clipboard.svg';
import NoData from 'uikit/NoData';
import Link from 'uikit/Link';
import { DashboardCard } from '../common';
import { getConfig } from 'global/config';
import { DOCS_SUBMITTING_CLINICAL_DATA_PAGE } from 'global/constants/docSitePaths';
import ClinicalChart from '../ClinicalChart';
import { adjustData, makeMockData } from '../ClinicalChart/mockData';
import { rangeButtons } from '../ClinicalChart/utils';

const { FEATURE_DASHBOARD_CHARTS_ENABLED } = getConfig();

const CHART_HEIGHT = 230;
const CHART_PADDING = 12;
const CHART_TITLE = 'Completed Core Clinical Data';

const getStartedLink = (
  <Typography variant="data" component="span">
    <Link target="_blank" href={DOCS_SUBMITTING_CLINICAL_DATA_PAGE}>
      {' '}
      Get started with clinical data submission »{' '}
    </Link>
  </Typography>
);

export default () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');

  // TODO: when API is ready, this should be a reusable hook,
  // or data requests should be made at the page level.
  useEffect(() => {
    const days = find(rangeButtons, { title: activeRangeBtn }).data;
    const mockData = makeMockData(days);
    const adjustedData = adjustData(mockData);
    const clinicalData = find(adjustedData, { chartType: 'molecular'});
    setLineChartData(clinicalData);
  }, [activeRangeBtn]);

  return FEATURE_DASHBOARD_CHARTS_ENABLED && lineChartData !== null
    ? (
      <ClinicalChart
        data={lineChartData}
        activeRangeBtn={activeRangeBtn}
        setActiveRangeBtn={setActiveRangeBtn}
        title={CHART_TITLE}
        />
    ) : (
      <DashboardCard>
        <Typography variant="default" component="span">
          {CHART_TITLE}
        </Typography>
        <div
          css={css`
            height: ${CHART_HEIGHT + CHART_PADDING}px;
            padding: ${CHART_PADDING}px 0 0;
          `}
          >
          <NoData title="Coming Soon." link={getStartedLink}>
            <img alt="Coming Soon." src={PicClipboard} />
          </NoData>
        </div>
      </DashboardCard>
    );
};
