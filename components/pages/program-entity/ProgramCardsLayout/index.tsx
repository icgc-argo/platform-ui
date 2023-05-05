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

import { Container, css, styled, useTheme } from '@icgc-argo/uikit';
import { ComponentType } from 'react';
import { Col, Row } from 'react-grid-system';

import ProgramDonorAndFileCountsTable from './ProgramDonorAndFileCountsTable';
import ProgramSummaryLinkContainer from './ProgramSummaryLinkContatiner';
import ProgramSummaryTable from './ProgramSummaryTable';

import { donorAndFileCountsByDataCategory, donorAndFileCountsByExperimentalStrategy } from './util';
import { ProgramSummaryQuery } from '../type';

const PaddedRow = styled(Row)`
  padding-bottom: 8px;
`;

const PaddedColumn = styled(Col)`
  padding-left: 8px !important;
  padding-right: 8px !important;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ProgramCardsLayout: ComponentType<{ programSummaryQuery: ProgramSummaryQuery }> = ({
  programSummaryQuery,
}) => {
  const theme = useTheme();

  const programSummaryData = {
    'Program Shortname': programSummaryQuery.shortName,
    'Full Program Name': programSummaryQuery.name,
    Description: programSummaryQuery.description,
    Countries: programSummaryQuery.countries,
    'Primary Sites': programSummaryQuery.primarySites,
    Website: programSummaryQuery.website,
    Institutions: programSummaryQuery.institutions,
    'Processing Regions': programSummaryQuery.regions,
    'Cancer Types': programSummaryQuery.cancerTypes,
  };

  return (
    <div
      css={css`
        margin: 0 5%;
      `}
    >
      <PaddedRow
        css={css`
          display: flex;
          align-content: center;
        `}
      >
        <PaddedColumn md={12} sm={12}>
          <Container
            css={css`
              display: flex;
              padding: 20px;
              padding-top: 0px;
              height: 100%;
            `}
          >
            <ProgramSummaryTable data={programSummaryData} title={'Program Summary'} />
            <ProgramSummaryLinkContainer />
          </Container>
        </PaddedColumn>
      </PaddedRow>
      <PaddedRow>
        <PaddedColumn md={6} sm={8}>
          <Container
            css={css`
              padding: 20px;
              padding-top: 0px;
              height: 100%;
            `}
          >
            <ProgramDonorAndFileCountsTable
              data={donorAndFileCountsByDataCategory}
              title={'Donor and File Counts By Data Category'}
            />
          </Container>
        </PaddedColumn>
        <PaddedColumn md={6} sm={6}>
          <Container
            css={css`
              padding: 20px;
              padding-top: 0px;
              height: 100%;
            `}
          >
            <ProgramDonorAndFileCountsTable
              data={donorAndFileCountsByExperimentalStrategy}
              title={'Donor and File Counts By Experimental Strategy'}
            />
          </Container>
        </PaddedColumn>
      </PaddedRow>
    </div>
  );
};

export default ProgramCardsLayout;
