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

import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';
import {
  FileSummaryInfo,
  FileAccessState,
  DataAnalysisInfo,
  FileEntityData,
  DonorRecord,
} from './types';
import FILE_ENTITY_QUERY from './FILE_ENTITY_QUERY.gql';
import sqonBuilder from 'sqon-builder';
import { FileCentricDocumentField } from '../file-repository/types';

type EntityData = {
  programShortName: string;
  loading: boolean;
  data: FileEntityData;
};

const useEntityData = ({ fileId }: { fileId: string }): EntityData => {
  const filters = sqonBuilder.has(FileCentricDocumentField.object_id, fileId).build();
  const { data, loading } = useQuery(FILE_ENTITY_QUERY, {
    variables: {
      filters,
    },
  });

  if (loading) {
    return { programShortName: null, data: null, loading: true };
  } else {
    if (!data) {
      return { programShortName: null, data: null, loading: false };
    }

    const entity = get(data, 'file.hits.edges[0].node');

    const programShortName = entity.study_id;

    const summary: FileSummaryInfo = {
      fileId: entity.file_id,
      objectId: entity.object_id,
      fileFormat: entity.file_type,
      size: get(entity, 'file.size'),
      access: entity.file_access === 'controlled' && FileAccessState.CONTROLLED,
      program: entity.study_id,
      checksum: get(entity, 'file.md5sum'),
      repoName: get(entity, 'repositories.hits.edges[0].node.country'),
      repoCountry: get(entity, 'repositories.hits.edges[0].node.name'),
    };

    const dataAnalysis: DataAnalysisInfo = {
      experimentalStrategy: get(entity, 'analysis.experiment.experimental_strategy'),
      dataType: null,
      platform: get(entity, 'analysis.experiment.platform'),
      genomeBuild: null,
      software: null,
      workflowType: get(entity, 'analysis.workflow'),
    };

    const donorRecords: DonorRecord[] = get(entity, 'donors.hits.edges', []).map((edge) => {
      const donor = edge.node;

      const specimen = get(donor, 'specimens.hits.edges[0].node');
      const sample = get(specimen, 'samples.hits.edges[0].node');

      return {
        donorId: donor.donor_id,
        submitterDonorId: donor.submitter_id,
        primarySite: null,
        cancerType: null,
        ageAtDiagnosis: null,
        associations: {
          specimenId: specimen.specimen_id,
          tumourNormalDesignation: specimen.tumour_normal_designation,
          sampleId: sample.sample_id,
          sampleType: sample.sample_type,
          matchedNormalSampleId: sample.matched_normal_submitter_sample_id,
        },
      };
    });

    const entityData: FileEntityData = {
      summary,
      dataAnalysis,
      donorRecords,
    };

    return { programShortName, data: entityData, loading };
  }
};

export default useEntityData;
