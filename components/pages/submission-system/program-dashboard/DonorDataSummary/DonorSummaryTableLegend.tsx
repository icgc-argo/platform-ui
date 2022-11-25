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

import { css, Icon, Typography, useTheme } from '@icgc-argo/uikit';
import { getConfig } from 'global/config';
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
  const { FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED } = getConfig();
  const theme = useTheme();

  const missingMatchedPairsCount =
    programDonorSummaryStats.dnaTNMatchedPairStatus?.tumorNormalNoMatchedPair || 0;
  const missingSamplesCount =
    (programDonorSummaryStats.dnaTNRegisteredStatus?.tumorOrNormal || 0) +
    (programDonorSummaryStats.dnaTNRegisteredStatus?.noData || 0);
  const missingRawReadsCount = programDonorSummaryStats.dnaTNMatchedPairStatus?.noData || 0;
  const showMissingDNAErrors =
    missingMatchedPairsCount || missingSamplesCount || missingRawReadsCount;

  return (
    <TableLegendContainer>
      <Typography variant="data" component="div" color="grey">
        <Row>
          <Col sm={12} xl={2}>
            <TableLegendSection>
              <b>{programDonorSummaryStats.registeredDonorsCount.toLocaleString()} donors</b>
            </TableLegendSection>
          </Col>
          <Col sm={12} md={4} lg={4} xl={3}>
            <TableLegendSection>
              <TableLegendEntry
                count={programDonorSummaryStats.fullyReleasedDonorsCount}
                icon={
                  <StatArea.StarIcon
                    fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.FULLY]}
                  />
                }
                text="with fully released files"
              />
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry
                count={programDonorSummaryStats.partiallyReleasedDonorsCount}
                icon={
                  <StatArea.StarIcon
                    fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.PARTIALLY]}
                  />
                }
                text="with partially released files"
              />
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry
                count={programDonorSummaryStats.noReleaseDonorsCount}
                icon={
                  <StatArea.StarIcon
                    fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.NO]}
                    outline={RELEASED_STATE_STROKE_COLOURS[DonorDataReleaseState.NO]}
                  />
                }
                text="with no released files"
              />
            </TableLegendSection>
          </Col>
          <Col sm={12} md={4} lg={4} xl={3}>
            <TableLegendSection>
              <TableLegendEntry
                icon={<TableLegendStatusIcon fill={'accent1_dimmed'} type="pill" />}
                text="completed workflow runs"
              />
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry
                icon={<TableLegendStatusIcon fill={'warning_dark'} type="pill" />}
                text="in progress workflow runs"
              />
            </TableLegendSection>
            <TableLegendSection>
              <TableLegendEntry
                icon={<TableLegendStatusIcon fill={'error'} type="pill" />}
                text="failed workflow runs"
              />
            </TableLegendSection>
          </Col>
          {FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED && showMissingDNAErrors && (
            <Col sm={12} md={4} lg={4} xl={4}>
              {!!missingSamplesCount && (
                <TableLegendSection>
                  <TableLegendEntry
                    count={missingSamplesCount}
                    icon={<TableLegendStatusIcon fill={'error_2'} type="box" />}
                    text={'missing samples'}
                  />
                </TableLegendSection>
              )}
              {!!missingMatchedPairsCount && (
                <TableLegendSection>
                  <TableLegendEntry
                    count={missingMatchedPairsCount}
                    icon={<TableLegendStatusIcon fill={'warning_2'} type="box" />}
                    text={'missing DNA T|N matched pair'}
                  />
                </TableLegendSection>
              )}
              {!!missingRawReadsCount && (
                <TableLegendSection>
                  <TableLegendEntry
                    count={missingRawReadsCount}
                    icon={<TableLegendStatusIcon fill={'error_4'} type="box" />}
                    text="missing raw reads"
                  />
                </TableLegendSection>
              )}
            </Col>
          )}
          {programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount > 0 && (
            <Col sm={12}>
              <TableLegendSection>
                <TableLegendEntry
                  count={programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount}
                  icon={
                    <Icon
                      name="warning"
                      fill={theme.colors.error}
                      width="16px"
                      height="15px"
                      css={css`
                        padding-right: 6px;
                        flex-shrink: 0;
                      `}
                    />
                  }
                  text="require clinical updates"
                />
              </TableLegendSection>
            </Col>
          )}
        </Row>
      </Typography>
    </TableLegendContainer>
  );
};

export default DonorSummaryTableLegend;
