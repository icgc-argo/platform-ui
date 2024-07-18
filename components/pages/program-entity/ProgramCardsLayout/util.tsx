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
import { Link } from '@icgc-argo/uikit';
import sqonBuilder from 'sqon-builder';
import type { ProgramSummaryQuery } from '../types';

export const createProgramSummaryData = (programSummaryQuery: ProgramSummaryQuery) => {
  return {
    'Program Shortname': programSummaryQuery?.shortName || '',
    'Full Program Name': programSummaryQuery?.name || '',
    Description: programSummaryQuery?.description || '',
    Countries: programSummaryQuery?.countries?.join(', ') || '',
    'Primary Sites': programSummaryQuery?.primarySites?.join(', ') || '',
    Website: programSummaryQuery.website ? (
      <Link
        href={programSummaryQuery.website}
        target="_blank"
      >{`${programSummaryQuery.website}`}</Link>
    ) : (
      ''
    ),
    Institutions: programSummaryQuery?.institutions?.join(', ') || '',
    'Data Center': programSummaryQuery?.dataCenter?.name || '',
    'Cancer Types': programSummaryQuery?.cancerTypes?.join(', ') || '',
  };
};

export const createSqonsVariables = (programId) => {
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
    .and(sqonBuilder.has('data_category', 'Transcriptome Profiling').has('study_id', programId))
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
  return {
    SQON_QC,
    SQON_SN,
    SQON_CNUM,
    SQON_STRUC,
    SQON_TP,
    SQON_WXS,
    SQON_WGS,
    SQON_RSEQ,
  };
};

export const createCountsByDataCategoryData = (file) => {
  return [
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
      Category: 'Transcriptome Profiling',
      Donors: file?.transcriptome_profiling?.donors__donor_id?.bucket_count,
      Files: file?.transcriptome_profiling?.file_id?.bucket_count,
    },
  ];
};

export const createExperimentalStrategyData = (file) => {
  return [
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
};
