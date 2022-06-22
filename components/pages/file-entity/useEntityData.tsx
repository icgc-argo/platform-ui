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

import { useQuery } from '@apollo/client';
import { camelCase, get, isObject, mapKeys } from 'lodash';
import {
  FileSummaryInfo,
  FileAccessState,
  DataAnalysisInfo,
  FileEntityData,
  DonorRecord,
} from './types';
import FILE_ENTITY_QUERY from 'components/pages/file-entity/gql/FILE_ENTITY_QUERY';
import sqonBuilder from 'sqon-builder';
import { FileCentricDocumentField } from '../file-repository/types';

type EntityData = {
  programShortName: string;
  loading: boolean;
  data: FileEntityData;
  access: FileAccessState;
  size: number;
  embargoStage: string;
};

const noData = { programShortName: null, access: null, size: null, data: null, embargoStage: null };

const isValidMetricsObject = (metrics: any) => {
  return (
    isObject(metrics) &&
    Object.values(metrics).length &&
    Object.values(metrics).every((v) => v !== null)
  );
};

const useEntityData = ({ fileId }: { fileId: string }): EntityData => {
  const filters = sqonBuilder.has(FileCentricDocumentField.file_id, fileId).build();
  const { data, loading, error } = useQuery(FILE_ENTITY_QUERY, {
    variables: {
      filters,
    },
    errorPolicy: 'all',
  });

  if (loading) {
    return { ...noData, loading: true };
  } else {
    const entity = get(data, 'file.hits.edges[0].node', null);

    if (!entity) {
      return { ...noData, loading: false };
    }

    if (error) {
      console.error(error.message);
    }

    const programShortName = entity.study_id;
    const size = get(entity, 'file.size', 0);
    const access = entity.file_access;
    const embargoStage = entity.embargo_stage;

    const summary: FileSummaryInfo = {
      fileId: entity.file_id,
      fileName: entity.file.name,
      objectId: entity.object_id,
      fileFormat: entity.file_type,
      size,
      access,
      program: entity.study_id,
      checksum: get(entity, 'file.md5sum'),
      repoName: get(entity, 'repositories.hits.edges[0].node.name'),
      repoCountry: get(entity, 'repositories.hits.edges[0].node.country'),
    };

    const dataAnalysis: DataAnalysisInfo = {
      experimentalStrategy: get(entity, 'analysis.experiment.experimental_strategy'),
      dataCategory: entity.data_category,
      dataType: entity.data_type,
      platform: get(entity, 'analysis.experiment.platform'),
      genomeBuild: null,
      software: entity.analysis_tools,
      workflowType: get(entity, 'analysis.workflow'),
    };

    const donorRecords: DonorRecord[] = get(entity, 'donors.hits.edges', []).map((edge) => {
      const donor = edge.node;

      const specimen = get(donor, 'specimens.hits.edges[0].node');
      const sample = get(specimen, 'samples.hits.edges[0].node');

      return {
        donorId: donor.donor_id,
        submitterDonorId: donor.submitter_donor_id,
        primarySite: null,
        cancerType: null,
        ageAtDiagnosis: null,
        associations: {
          specimenId: specimen.specimen_id,
          specimenType: specimen.specimen_type,
          tumourNormalDesignation: specimen.tumour_normal_designation,
          sampleId: sample.sample_id,
          sampleType: sample.sample_type,
          matchedNormalSampleId: sample.matched_normal_submitter_sample_id,
        },
      };
    });

    const metrics = isValidMetricsObject(entity.metrics)
      ? mapKeys(entity.metrics, (_, key) => camelCase(key))
      : null;

    const entityData: FileEntityData = {
      summary,
      dataAnalysis,
      donorRecords,
      metrics,
    };

    return { programShortName, access, size, embargoStage, data: entityData, loading };
  }
};

export default useEntityData;
