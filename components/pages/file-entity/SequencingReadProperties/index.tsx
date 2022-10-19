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

import { css, styled, Typography, useTheme } from '@icgc-argo/uikit';
import { Col, Row } from 'react-grid-system';
import { FileCard, TableDiv } from '../common';
import { FileMetricsInfo } from '../types';

const SequencingReadProperties = ({ metrics }: { metrics: FileMetricsInfo }) => {
  const theme = useTheme();

  const CenteredCol = styled(Col)`
    text-align: center;
  `;

  const StatNumber = styled(Typography)`
    color: ${theme.colors.primary};
    margin: 0;
  `;

  const StatLabel = styled(Typography)`
    color: ${theme.colors.primary};
    font-size: 12px;
    margin: 0;
  `;

  return (
    <FileCard cardTitle="Sequencing Read Properties">
      <TableDiv>
        <div
          css={css`
            position: relative;
            width: 100%;
            display: flex;
            border: 1px solid ${theme.colors.grey_2};
          `}
        >
          <Col style={{ position: 'relative', overflow: 'hidden' }}>
            <Row
              css={css`
                padding: 10px;
              `}
            >
              <CenteredCol lg={2.4} md={4}>
                <StatNumber>{metrics?.totalReads?.toLocaleString()}</StatNumber>
                <StatLabel>Total Reads</StatLabel>
              </CenteredCol>
              <CenteredCol lg={2.4} md={4}>
                <StatNumber>{metrics?.pairedReads?.toLocaleString()}</StatNumber>
                <StatLabel>Paired Reads</StatLabel>
              </CenteredCol>
              <CenteredCol lg={2.4} md={4}>
                <StatNumber>{metrics?.pairsOnDifferentChromosomes?.toLocaleString()}</StatNumber>
                <StatLabel>Pairs on Different Chromosomes</StatLabel>
              </CenteredCol>
              <CenteredCol lg={2.4} md={4}>
                <StatNumber>{metrics?.averageInsertSize?.toLocaleString()}</StatNumber>
                <StatLabel>Average Insert Size</StatLabel>
              </CenteredCol>
              <CenteredCol lg={2.4} md={4}>
                <StatNumber>{metrics?.averageLength?.toLocaleString()}</StatNumber>
                <StatLabel>Average Length</StatLabel>
              </CenteredCol>
            </Row>
          </Col>
        </div>
      </TableDiv>
    </FileCard>
  );
};

export default SequencingReadProperties;
