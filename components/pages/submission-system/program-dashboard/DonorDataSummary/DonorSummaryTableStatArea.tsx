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

import Icon from 'uikit/Icon';

import { DonorDataReleaseState, ProgramDonorReleaseStats } from './types';
import { RELEASED_STATE_FILL_COLOURS, RELEASED_STATE_STROKE_COLOURS } from './common';
import { StatArea as StatAreaDisplay } from '../../common';
import { useTheme } from 'uikit/ThemeProvider';
import { css } from '@emotion/core';

const emptyProgramDonorSummaryStats: ProgramDonorReleaseStats = {
  registeredDonorsCount: 0,
  fullyReleasedDonorsCount: 0,
  noReleaseDonorsCount: 0,
  partiallyReleasedDonorsCount: 0,
  donorsInvalidWithCurrentDictionaryCount: 0,
};

const DonorStatsArea = ({
  programDonorSummaryStats = emptyProgramDonorSummaryStats,
  className,
}: {
  programDonorSummaryStats: ProgramDonorReleaseStats;
  className?: string;
}) => {
  const theme = useTheme();
  return (
    <StatAreaDisplay.Container className={className}>
      <StatAreaDisplay.Section>
        {programDonorSummaryStats.registeredDonorsCount} donors
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <Icon name="chevron_right" fill="grey_1" width="8px" />
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.FULLY]}
          />
          {programDonorSummaryStats.fullyReleasedDonorsCount} with fully released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.PARTIALLY]}
          />
          {programDonorSummaryStats.partiallyReleasedDonorsCount} with partially released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      <StatAreaDisplay.Section>
        <StatAreaDisplay.StatEntryContainer>
          <StatAreaDisplay.StarIcon
            fill={RELEASED_STATE_FILL_COLOURS[DonorDataReleaseState.NO]}
            outline={RELEASED_STATE_STROKE_COLOURS[DonorDataReleaseState.NO]}
          />
          {programDonorSummaryStats.noReleaseDonorsCount} with no released files
        </StatAreaDisplay.StatEntryContainer>
      </StatAreaDisplay.Section>
      {programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount > 0 && (
        <StatAreaDisplay.Section>
          <StatAreaDisplay.StatEntryContainer>
            <Icon
              name="warning"
              fill={theme.colors.error}
              width="16px"
              height="15px"
              css={css`
                padding-right: 6px;
              `}
            />
            <span
              css={css`
                color: ${theme.colors.error_dark};
              `}
            >
              {programDonorSummaryStats.donorsInvalidWithCurrentDictionaryCount} Invalid donors
            </span>
          </StatAreaDisplay.StatEntryContainer>
        </StatAreaDisplay.Section>
      )}
    </StatAreaDisplay.Container>
  );
};

export default DonorStatsArea;
