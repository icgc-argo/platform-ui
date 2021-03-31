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

type EntityData = {
  programShortName: string;
  loading: boolean;
  data: FileEntityData;
};

const useEntityData = ({ fileId }: { fileId: string }): EntityData => {
  const filters = sqonBuilder.has('object_id', fileId).build();
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
      // fileRecords: dummyFileRecords,
    };

    return { programShortName, data: entityData, loading };
  }
};

export default useEntityData;
