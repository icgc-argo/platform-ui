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

import Icon from 'uikit/Icon';

import { DonorDataReleaseState, ProgramDonorReleaseStats } from './types';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { StatArea, TableLegendContainer, TableLegendStatusIcon } from '../../common';
import { useTheme } from 'uikit/ThemeProvider';
import Typography from 'uikit/Typography';
import { css } from '@emotion/core';
import { Row, Col } from 'react-grid-system';

const emptyProgramDonorSummaryStats: ProgramDonorReleaseStats = {
  registeredDonorsCount: 0,
  fullyReleasedDonorsCount: 0,
  noReleaseDonorsCount: 0,
  partiallyReleasedDonorsCount: 0,
  donorsInvalidWithCurrentDictionaryCount: 0,
};

const DonorSummaryTableLegend = ({
  programDonorSummaryStats = emptyProgramDonorSummaryStats,
}: {
  programDonorSummaryStats: ProgramDonorReleaseStats;
}) => {
  const theme = useTheme();
  return (
    <TableLegendContainer>
      <Typography
        variant="data"
        component="div"
        color="grey"
        css={css`
          line-height: 2;
        `}
      >
        <Row>
          <Col sm={12} md={1}>
            <StatArea.Section>
              <b>{programDonorSummaryStats.registeredDonorsCount.toLocaleString()} donors</b>
            </StatArea.Section>
          </Col>
          <Col sm={12} md={3}>
            <StatArea.Section>
              <StatArea.StatEntryContainer>
                <StatArea.StarIcon
                  fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.FULLY]}
                />
                <b>{programDonorSummaryStats.fullyReleasedDonorsCount.toLocaleString()}</b>
                &nbsp;with fully released files
              </StatArea.StatEntryContainer>
            </StatArea.Section>
            <StatArea.Section>
              <StatArea.StatEntryContainer>
                <StatArea.StarIcon
                  fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.PARTIALLY]}
                />
                <b>{programDonorSummaryStats.partiallyReleasedDonorsCount.toLocaleString()}</b>
                &nbsp;with partially released files
              </StatArea.StatEntryContainer>
            </StatArea.Section>
            <StatArea.Section>
              <StatArea.StatEntryContainer>
                <StatArea.StarIcon
                  fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.NO]}
                  outline={RELEASED_STATE_STROKE_COLOURS[DonorDataReleaseState.NO]}
                />
                <b>{programDonorSummaryStats.noReleaseDonorsCount.toLocaleString()}</b>&nbsp;with no
                released files
              </StatArea.StatEntryContainer>
            </StatArea.Section>
          </Col>
          <Col sm={12} md={3}>
            <StatArea.Section>
              <StatArea.StatEntryContainer>
                <TableLegendStatusIcon fill={'accent1_dimmed'} />
                {/* TODO: update with correct stat */}
                <b>{programDonorSummaryStats.fullyReleasedDonorsCount.toLocaleString()}</b>
                &nbsp;with completed workflow runs
              </StatArea.StatEntryContainer>
            </StatArea.Section>
            <StatArea.Section>
              <StatArea.StatEntryContainer>
                <TableLegendStatusIcon fill={'warning_dark'} />
                {/* TODO: update with correct stat */}
                <b>{programDonorSummaryStats.partiallyReleasedDonorsCount.toLocaleString()}</b>
                &nbsp;with in progress workflow runs
              </StatArea.StatEntryContainer>
            </StatArea.Section>
            <StatArea.Section>
              <StatArea.StatEntryContainer>
                <TableLegendStatusIcon fill={'error'} />
                {/* TODO: update with correct stat */}
                <b>{programDonorSummaryStats.noReleaseDonorsCount.toLocaleString()}</b>&nbsp;with
                failed workflow runs
              </StatArea.StatEntryContainer>
            </StatArea.Section>
          </Col>
          <Col sm={12} md={3}>
            {/* TODO: add stats for pending program QC and require updated clinical data */}
            {programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount > 0 && (
              <StatArea.Section>
                <StatArea.StatEntryContainer>
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
                </StatArea.StatEntryContainer>
              </StatArea.Section>
            )}
          </Col>
        </Row>
      </Typography>
    </TableLegendContainer>
  );
};

export default DonorSummaryTableLegend;
