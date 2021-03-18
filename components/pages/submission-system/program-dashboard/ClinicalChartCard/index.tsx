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
import ContentPlaceholder from 'uikit/ContentPlaceholder';
import Link from 'uikit/Link';
import { DashboardCard } from '../common';
import { getConfig } from 'global/config';
import ClinicalChart from '../ClinicalChart';
import { adjustData, makeMockData } from '../ClinicalChart/mockData';
import { rangeButtons } from '../ClinicalChart/utils';
import { ChartType } from '../ClinicalChart/types';

type CardProps = {
  chartType: ChartType;
  comingSoonLink: string;
  title: string;
};

const { FEATURE_DASHBOARD_CHARTS_ENABLED } = getConfig();

const CHART_HEIGHT = 230;
const CHART_PADDING = 12;

export default ({ chartType, comingSoonLink, title }: CardProps) => {
  const [lineChartData, setLineChartData] = useState(null);
  const [activeRangeBtn, setActiveRangeBtn] = useState('All');

  // TODO: when API is ready, this should be a reusable hook,
  // or data requests should be made at the page level. TBD
  useEffect(() => {
    const days = find(rangeButtons, { title: activeRangeBtn }).data;
    const mockData = makeMockData(days);
    const adjustedData = adjustData(mockData);
    const clinicalData = find(adjustedData, { chartType });
    setLineChartData(clinicalData);
  }, [activeRangeBtn]);

  const getStartedLink = (
    <Typography variant="data" component="span">
      <Link target="_blank" href={comingSoonLink}>
        {' '}
        Get started with {chartType} data submission &raquo;{' '}
      </Link>
    </Typography>
  );

  return FEATURE_DASHBOARD_CHARTS_ENABLED && lineChartData !== null
    ? (
      <ClinicalChart
        activeRangeBtn={activeRangeBtn}
        chartType={chartType}
        data={lineChartData}
        setActiveRangeBtn={setActiveRangeBtn}
        title={title}
        />
    ) : (
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
          <ContentPlaceholder title="Coming Soon." link={getStartedLink}>
            <img alt="Coming Soon." src={PicClipboard} />
          </ContentPlaceholder>
        </div>
      </DashboardCard>
    );
};
