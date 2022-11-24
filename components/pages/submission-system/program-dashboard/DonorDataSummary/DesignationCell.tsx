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

import { styled, useTheme } from '@icgc-argo/uikit';
import { DonorSummaryEntry } from 'generated/gql_types';

type DesignationCellTypes =
  | 'dnaTNMatchedPair'
  | 'dnaTNRegistered'
  | 'rnaRegisteredSample'
  | 'rnaRawReads';

const DesignationContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: -8px;
  position: absolute;
`;

const DesignationCell = ({
  left,
  original,
  right,
  type,
}: {
  left: number;
  original: DonorSummaryEntry;
  right: number;
  type: DesignationCellTypes;
}) => {
  const theme = useTheme();
  const isValidMatchedPairs = original.matchedTNPairsDNA > 0;
  const DesignationEntry = styled('div')`
    &:nth-of-type(2) {
      border-left: solid 1px ${theme.colors.grey_2};
    }
    text-align: center;
    line-height: 28px;
    flex: 1;
    background: ${!isValidMatchedPairs ? theme.colors.warning_3 : theme.colors.error_4};
  `;

  return (
    <DesignationContainer>
      <DesignationEntry>{left}N</DesignationEntry>
      <DesignationEntry>{right}T</DesignationEntry>
    </DesignationContainer>
  );
};

export default DesignationCell;
