/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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
import { Icon, Typography, useTheme } from '@icgc-argo/uikit';
import { Col, Row } from 'react-grid-system';
import {
  StatArea,
  TableLegendContainer,
  TableLegendEntry,
  TableLegendSection,
  TableLegendStatusIcon,
} from '../../common';
import {
  EMPTY_PROGRAM_SUMMARY_STATS,
  RELEASED_STATE_FILL_COLOURS,
  RELEASED_STATE_STROKE_COLOURS,
} from './common';
import { DonorDataReleaseState, ProgramDonorReleaseStats } from './types';

const DonorSummaryTableLegend = ({
  programDonorSummaryStats = EMPTY_PROGRAM_SUMMARY_STATS,
}: {
  programDonorSummaryStats: ProgramDonorReleaseStats;
}) => {
  const theme = useTheme();
  return (
    <TableLegendContainer>
      <Typography variant="data" component="div" color="grey">
        <Row>
          <Col sm={12} md={12} lg={1}>
            <TableLegendSection>
              <b>{programDonorSummaryStats.registeredDonorsCount.toLocaleString()} donors</b>
            </TableLegendSection>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <TableLegendSection>
              <TableLegendEntry>
                <StatArea.StarIcon
                  fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.FULLY]}
                />
                <b>{programDonorSummaryStats.fullyReleasedDonorsCount.toLocaleString()}</b>
                &nbsp;with fully released files
              </TableLegendEntry>
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry>
                <StatArea.StarIcon
                  fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.PARTIALLY]}
                />
                <b>{programDonorSummaryStats.partiallyReleasedDonorsCount.toLocaleString()}</b>
                &nbsp;with partially released files
              </TableLegendEntry>
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry>
                <StatArea.StarIcon
                  fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.NO]}
                  outline={RELEASED_STATE_STROKE_COLOURS[DonorDataReleaseState.NO]}
                />
                <b>{programDonorSummaryStats.noReleaseDonorsCount.toLocaleString()}</b>&nbsp;with no
                released files
              </TableLegendEntry>
            </TableLegendSection>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <TableLegendSection>
              <TableLegendEntry>
                <TableLegendStatusIcon fill={'accent1_dimmed'} />
                completed workflow runs
              </TableLegendEntry>
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry>
                <TableLegendStatusIcon fill={'warning_dark'} />
                in progress workflow runs
              </TableLegendEntry>
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry>
                <TableLegendStatusIcon fill={'error'} />
                failed workflow runs
              </TableLegendEntry>
            </TableLegendSection>
          </Col>
          <Col sm={12} md={12} lg={3}>
            {/* TODO: add stats for pending program QC and require updated clinical data */}
            {programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount > 0 && (
              <TableLegendSection>
                <TableLegendEntry>
                  <Icon
                    name="warning"
                    fill={theme.colors.error}
                    width="16px"
                    height="15px"
                    css={css`
                      padding-right: 6px;
                    `}
                  />
                  <b>
                    {programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount.toLocaleString()}
                  </b>
                  &nbsp;Invalid donors
                </TableLegendEntry>
              </TableLegendSection>
            )}
          </Col>
        </Row>
      </Typography>
    </TableLegendContainer>
  );
};

export default DonorSummaryTableLegend;
