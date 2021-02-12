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

import Container from 'uikit/Container';
import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import PicClipboard from 'static/clipboard.svg';
import NoData from 'uikit/NoData';
import Link from 'uikit/Link';
import { format as formatDate } from 'date-fns';
import { DashboardCard } from '../common';
import { getConfig } from 'global/config';
import { DOCS_SUBMITTING_CLINICAL_DATA_PAGE } from 'global/constants/docSitePaths';
import LineChart from '../LineChart';
import { makeMockData } from '../LineChart/mockData';

const { DASHBOARD_CHARTS_ENABLED } = getConfig();

// DASHBOARD_CHARTS_ENABLED
// TODO: when the API is ready, this will probably not stay here.
const mockLineChartData = makeMockData('week');
const lineChartData = mockLineChartData[0].lines[0].points.map(({ date, donors }) => ({
  x: date,
  y: donors,
  // TODO: only show year for first instance
  label: formatDate(date*1000, 'd MMM yyyy'),
  // TODO: add line name to tooltip for molecular, e.g. "Raw Reads"
  tooltip: [formatDate(date*1000, 'MMM d, yyyy'), `${donors} donors`],
}));

const getStartedLink = (
  <Typography variant="data" component="span">
    <Link target="_blank" href={DOCS_SUBMITTING_CLINICAL_DATA_PAGE}>
      {' '}
      Get started with clinical data submission »{' '}
    </Link>
  </Typography>
);

export default () => (
  <DashboardCard>
    <Typography variant="default" component="span">
      Completed Core Clinical Data
    </Typography>
    <div
      css={css`
        height: 260px;
        padding-top: 12px;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
      `}
    >
      {DASHBOARD_CHARTS_ENABLED
        ? (
          <LineChart
            data={lineChartData}
            height={300}
            horizontalGuides={5}
            precision={0}
            verticalGuides={1}
            width={500}
            />
          )
        : (
          <NoData title="Coming Soon." link={getStartedLink}>
            <img alt="Coming Soon." src={PicClipboard} />
          </NoData>
        )
      }
    </div>
  </DashboardCard>
);
