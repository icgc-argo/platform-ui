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

import { css } from '@emotion/core';
import Typography from 'uikit/Typography';
import DASHBOARD_SUMMARY_QUERY from '../DASHBOARD_SUMMARY_QUERY.gql';
import { useQuery } from '@apollo/react-hooks';
import { usePageQuery } from 'global/hooks/usePageContext';
import { DashboardCard, DashboardSummaryData, DashboardSummaryDataVariables } from '../common';

export default () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const { data, loading } = useQuery<DashboardSummaryData, DashboardSummaryDataVariables>(
    DASHBOARD_SUMMARY_QUERY,
    {
      variables: { programShortName: programShortName },
      // polling is not necessary here because it only wants the commitmentDonors
    },
  );
  return (
    <DashboardCard>
      <Typography variant="default" component="span">
        Donor Release Summary
      </Typography>

      <div
        css={css`
          margin-top: 40px;
          background-color: #dcdde1;
          border-radius: 8px;
          width: 100%;
          margin-bottom: 8px;
        `}
      >
        &nbsp;
      </div>

      <div
        css={css`
          display: flex;
          align-items: flex-end;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <Typography variant="caption" color="grey">
          With Released Files
        </Typography>

        <div>
          <Typography
            variant="caption"
            bold={true}
            css={css`
              margin-right: 5px;
            `}
          >
            {loading ? '...' : data.program.commitmentDonors}
          </Typography>
          <Typography variant="caption" color="grey">
            Committed
          </Typography>
        </div>
      </div>
    </DashboardCard>
  );
};
