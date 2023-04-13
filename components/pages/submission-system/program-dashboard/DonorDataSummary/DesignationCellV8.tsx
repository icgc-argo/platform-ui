/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import { css, styled, TableCellWrapper, UikitTheme, useTheme } from '@icgc-argo/uikit';
import { DonorSummaryEntry } from 'generated/gql_types';
import { ProgramDonorSummaryEntryField } from './types';

const DesignationContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: -8px;
`;

const DesignationEntry = styled('div')`
  &:nth-of-type(2) {
    border-left: solid 1px ${({ theme }) => theme.colors.grey_2};
  }
  text-align: center;
  line-height: 28px;
  flex: 1;
  background: ${({ background }: { background: string }) => background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DesignationCell = ({
  normalCount,
  original,
  tumourCount,
  type,
}: {
  normalCount: number;
  original?: DonorSummaryEntry;
  tumourCount: number;
  type?: ProgramDonorSummaryEntryField;
}) => {
  const theme = useTheme();
  const errorColors = {
    default: 'transparent',
    matchedPairError: theme.colors.warning_2,
    rawReadsError: theme.colors.error_4,
    samplesError: theme.colors.error_2,
  };

  const registeredSamplesNormalError =
    type === 'dnaTNRegistered' && original.registeredNormalSamples === 0;
  const registeredSamplesTumourError =
    type === 'dnaTNRegistered' && original.registeredTumourSamples === 0;

  const matchedPairError = type === 'dnaTNMatchedPair' && original.matchedTNPairsDNA === 0;
  const rawReadsNormalError =
    type === 'dnaTNMatchedPair' &&
    !matchedPairError &&
    original.registeredNormalSamples > original.publishedNormalAnalysis;
  const rawReadsTumourError =
    type === 'dnaTNMatchedPair' &&
    !matchedPairError &&
    original.registeredTumourSamples > original.publishedTumourAnalysis;

  const normalBg = matchedPairError
    ? errorColors.matchedPairError
    : rawReadsNormalError
    ? errorColors.rawReadsError
    : registeredSamplesNormalError
    ? errorColors.samplesError
    : errorColors.default;
  const tumourBg = matchedPairError
    ? errorColors.matchedPairError
    : rawReadsTumourError
    ? errorColors.rawReadsError
    : registeredSamplesTumourError
    ? errorColors.samplesError
    : errorColors.default;

  return (
    <TableCellWrapper
      css={css`
        padding: 0 !important;
        align-items: stretch !important;
      `}
    >
      <DesignationEntry background={normalBg}>{normalCount}N</DesignationEntry>
      <DesignationEntry background={tumourBg}>{tumourCount}T</DesignationEntry>
    </TableCellWrapper>
  );
};

// FEATURE_PROGRAM_DASHBOARD_RNA_ENABLED - remove when flag enabled in production
// this code isn't required once the RNA feature is in production
const isValid = (num: number) => num > 0;
const DesignationEntryStyled = styled('div')`
  text-align: center;
  flex: 1;
  color: ${({ num, theme }: { num: number; theme: UikitTheme }) =>
    isValid(num) ? theme.colors.primary : theme.colors.error};
`;
export const DesignationCellLegacy = ({ left, right }: { left: number; right: number }) => {
  const theme = useTheme();
  return (
    <DesignationContainer>
      <DesignationEntryStyled theme={theme} num={left}>
        {left}N
      </DesignationEntryStyled>
      <DesignationEntryStyled
        theme={theme}
        num={right}
        css={css`
          border-left: solid 1px ${theme.colors.grey_2};
        `}
      >
        {right}T
      </DesignationEntryStyled>
    </DesignationContainer>
  );
};
