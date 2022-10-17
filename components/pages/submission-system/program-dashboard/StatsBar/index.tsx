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

import { useQuery } from '@apollo/client';
import { css } from '@icgc-argo/uikit';
import { Container, PercentBar, styled, Typography } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
import { usePageQuery } from 'global/hooks/usePageContext';
import { ComponentType } from 'react';
import { Col, Row } from 'react-grid-system';
import {
  DashboardSummaryData,
  DashboardSummaryDataVariables,
  POLL_INTERVAL_MILLISECONDS,
} from '../common';
import { EMPTY_PROGRAM_SUMMARY_STATS, useTimeout } from '../DonorDataSummary/common';
import DASHBOARD_SUMMARY_QUERY from '../gql/DASHBOARD_SUMMARY_QUERY';

const StatDesc = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
  justify-content: space-between;
`;

const Statistic: ComponentType<{ quantity: String; description: String }> = ({
  children,
  quantity,
  description,
}) => (
  <StatDesc>
    {/* Div for Quantity */}
    <div>
      <div
        css={css`
          height: 30px;
          padding-bottom: 4px;
        `}
      >
        <Typography variant="title">{quantity}</Typography>
      </div>
      {/* Div for Description */}
      <div
        css={css`
          padding-bottom: 8px;
          min-width: 120px;
        `}
      >
        <Typography color="grey" variant="caption">
          {description}
        </Typography>
      </div>
    </div>

    <div
      css={css`
        padding-bottom: 10px;
      `}
    >
      {children}
    </div>
  </StatDesc>
);

const StatsBar = () => {
  const { shortName: programShortName } = usePageQuery<{ shortName: string }>();
  const pollingTimeout = useTimeout(30000);
  const {
    data: { programDonorSummary: { stats: programDonorSummaryStats }, program } = {
      programDonorSummary: {
        stats: EMPTY_PROGRAM_SUMMARY_STATS,
      },
      program: {
        commitmentDonors: 0,
      },
    },
    loading,
  } = useQuery<DashboardSummaryData, DashboardSummaryDataVariables>(DASHBOARD_SUMMARY_QUERY, {
    variables: { programShortName: programShortName },
    pollInterval: !pollingTimeout ? POLL_INTERVAL_MILLISECONDS : 0,
  });
  const { FEATURE_RNASEQ_ENABLED } = getConfig();

  return (
    <div>
      <Container>
        <Row justify="around">
          <Col>
            {!loading ? (
              <Statistic
                quantity={programDonorSummaryStats.registeredDonorsCount.toLocaleString()}
                description="Registered Donors"
              >
                <PercentBar
                  num={programDonorSummaryStats.registeredDonorsCount}
                  den={program.commitmentDonors}
                  fillColor={
                    programDonorSummaryStats.registeredDonorsCount >= program.commitmentDonors
                      ? 'success'
                      : 'warning'
                  }
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Registered Donors">
                <PercentBar num={0} den={100} fillColor="warning" />
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${Math.round(programDonorSummaryStats.percentageCoreClinical * 100)}%`}
                description="Donors with all Core Clinical Data"
              >
                <PercentBar
                  num={programDonorSummaryStats.percentageCoreClinical * 100}
                  den={100}
                  fillColor={
                    programDonorSummaryStats.percentageCoreClinical >= 1 ? 'success' : 'warning'
                  }
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Donors with all Core Clinical Data">
                <PercentBar num={0} den={100} fillColor="warning" />
              </Statistic>
            )}
          </Col>
          <Col>
            {!loading ? (
              <Statistic
                quantity={`${Math.round(
                  programDonorSummaryStats.percentageTumourAndNormal * 100,
                )}%`}
                description={
                  FEATURE_RNASEQ_ENABLED
                    ? 'Donors with a DNA T | N Matched Pair'
                    : 'Donors with Tumour & Normal'
                }
              >
                <PercentBar
                  num={programDonorSummaryStats.percentageTumourAndNormal * 100}
                  den={100}
                  fillColor={
                    programDonorSummaryStats.percentageTumourAndNormal >= 1 ? 'success' : 'warning'
                  }
                />
              </Statistic>
            ) : (
              <Statistic quantity="..." description="Donors with a DNA T | N Matched Pair">
                <PercentBar num={0} den={100} fillColor="warning" />
              </Statistic>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StatsBar;
