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

import React from 'react';
import { css } from '@emotion/core';
import { Typography } from '@icgc-argo/uikit';
import { ContentPlaceholder } from '@icgc-argo/uikit';
import { Link } from '@icgc-argo/uikit';
import Image from 'next/image';
import { DashboardCard } from 'components/pages/submission-system/program-dashboard/common';
import { getConfig } from 'global/config';
import ClinicalChart from 'components/pages/submission-system/program-dashboard/ClinicalChart';
import { ChartType } from 'components/pages/submission-system/program-dashboard/ClinicalChart/types';

import clipboardIcon from 'images/clipboard.svg';

// TODO: retire this component when we don't need the "coming soon"
// component and the feature flag anymore.
// include <ClinicalChart /> directly in the program dashboard.

type CardProps = {
  chartType: ChartType;
  comingSoonLink: string;
  title: string;
};

const { FEATURE_DASHBOARD_CHARTS_ENABLED } = getConfig();

const CHART_HEIGHT = 230;
const CHART_PADDING = 12;

const ClinicalChartCard = ({ chartType, comingSoonLink, title }: CardProps) => {
  const getStartedLink = (
    <Typography variant="data" component="span">
      <Link target="_blank" href={comingSoonLink}>
        {' '}
        Get started with {chartType} data submission &raquo;{' '}
      </Link>
    </Typography>
  );

  return FEATURE_DASHBOARD_CHARTS_ENABLED ? (
    <ClinicalChart chartType={chartType} title={title} />
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
          <Image alt="Coming Soon" src={clipboardIcon} layout="fixed" width={120} height={88} />
        </ContentPlaceholder>
      </div>
    </DashboardCard>
  );
};

export default ClinicalChartCard;
