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

import { ProgramSummaryQuery } from '../type';

import { useQuery } from '@apollo/client';
import sqonBuilder from 'sqon-builder';
import DONOR_AND_FILE_COUNT_TABLES_QUERY from '../gql/DONOR_AND_FILE_COUNT_TABLES_QUERY';

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

const ProgramCardsLayout: ComponentType<{
  programSummaryQuery: ProgramSummaryQuery;
  programId: string;
}> = ({ programSummaryQuery, programId }) => {
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

  const SQON_QC = sqonBuilder
    .and(sqonBuilder.has('data_category', 'Quality Control Metrics').has('study_id', programId))
    .build();
  const SQON_SN = sqonBuilder
    .and(sqonBuilder.has('data_category', 'Simple Nucleotide Variation').has('study_id', programId))
    .build();
  const SQON_CNUM = sqonBuilder
    .and(sqonBuilder.has('data_category', 'Copy Number Variation').has('study_id', programId))
    .build();
  const SQON_STRUC = sqonBuilder
    .and(sqonBuilder.has('data_category', 'Structural Variation').has('study_id', programId))
    .build();
  const SQON_TP = sqonBuilder
    .and(sqonBuilder.has('data_category', 'Transciptome Profiling').has('study_id', programId))
    .build();
  const SQON_WXS = sqonBuilder
    .and(
      sqonBuilder
        .has('analysis.experiment.experimental_strategy', 'WXS')
        .has('study_id', programId),
    )
    .build();
  const SQON_WGS = sqonBuilder
    .and(
      sqonBuilder
        .has('analysis.experiment.experimental_strategy', 'WGS')
        .has('study_id', programId),
    )
    .build();
  const SQON_RSEQ = sqonBuilder
    .and(
      sqonBuilder
        .has('analysis.experiment.experimental_strategy', 'RNA-Seq')
        .has('study_id', programId),
    )
    .build();

  const { data: { file = null } = {}, loading } = useQuery(DONOR_AND_FILE_COUNT_TABLES_QUERY, {
    variables: {
      SQON_QC,
      SQON_SN,
      SQON_CNUM,
      SQON_STRUC,
      SQON_TP,
      SQON_WXS,
      SQON_WGS,
      SQON_RSEQ,
    },
  });

  const donorAndFileCountsByDataCategory = [
    {
      Category: 'Quality Control Metrics',
      Donors: file?.quality_control_metrics?.donors__donor_id?.bucket_count,
      Files: file?.quality_control_metrics.file_id.bucket_count,
    },
    {
      Category: 'Simple Nucleotide Variation',
      Donors: file?.simple_nucleotide_variation?.donors__donor_id?.bucket_count,
      Files: file?.simple_nucleotide_variation?.file_id?.bucket_count,
    },
    {
      Category: 'Copy Number Variation',
      Donors: file?.copy_number_variation?.donors__donor_id?.bucket_count,
      Files: file?.copy_number_variation?.file_id?.bucket_count,
    },
    {
      Category: 'Structural Variation',
      Donors: file?.structural_variation?.donors__donor_id?.bucket_count,
      Files: file?.structural_variation?.file_id?.bucket_count,
    },
    {
      Category: 'Transciptome Profiling',
      Donors: file?.transciptome_profiling?.donors__donor_id?.bucket_count,
      Files: file?.transciptome_profiling?.file_id?.bucket_count,
    },
  ];

  const donorAndFileCountsByExperimentalStrategy = [
    {
      Strategies: 'WXS',
      Donors: file?.wxs?.donors__donor_id?.bucket_count,
      Files: file?.wxs?.file_id?.bucket_count,
    },
    {
      Strategies: 'WGS',
      Donors: file?.wgs?.donors__donor_id?.bucket_count,
      Files: file?.wgs?.file_id?.bucket_count,
    },
    {
      Strategies: 'RNA-Seq',
      Donors: file?.rna_seq?.donors__donor_id?.bucket_count,
      Files: file?.rna_seq?.file_id?.bucket_count,
    },
  ];

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
            <ProgramSummaryLinkContainer programId={programId} />
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
