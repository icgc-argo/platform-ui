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

import Container from '@icgc-argo/uikit/Container';
import { css, keyframes } from '@emotion/core';
import { Row, Col } from 'react-grid-system';
import styled from '@emotion/styled-base';
import Typography from '@icgc-argo/uikit/Typography';
import useTheme from '@icgc-argo/uikit/utils/useTheme';
import Button from '@icgc-argo/uikit/Button';
import Icon from '@icgc-argo/uikit/Icon';
import DASHBOARD_SUMMARY_QUERY from '../DASHBOARD_SUMMARY_QUERY.gql';
import { useQuery } from '@apollo/client';
import { usePageQuery } from 'global/hooks/usePageContext';
import _ from 'lodash';
import {
  DashboardSummaryData,
  DashboardSummaryDataVariables,
  POLL_INTERVAL_MILLISECONDS,
} from '../common';
import PercentBar from '@icgc-argo/uikit/PercentBar';
import { useTimeout, EMPTY_PROGRAM_SUMMARY_STATS } from '../DonorDataSummary/common';
import { getConfig } from 'global/config';

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

const Statistic: React.ComponentType<{ quantity: String; description: String }> = ({
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
