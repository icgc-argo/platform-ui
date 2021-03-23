import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';
import { FileSummaryInfo, FileAccessState, DataAnalysisInfo, FileEntityData } from './types';
import FILE_ENTITY_QUERY from './FILE_ENTITY_QUERY.gql';
import sqonBuilder from 'sqon-builder';
import {
  dummyFileSummaryInfo,
  dummyDataAnalysisInfo,
  dummyAssociatedDonorsInfo,
  dummyFileRecords,
} from './dummyData';

const useFileEntityData = ({ fileId }: { fileId: string }) => {
  console.log('file id', fileId);
  const filters = sqonBuilder.has('object_id', '4684e526-fbb6-532b-a2de-e3562e51cbcb').build();
  console.log('filters', filters);
  const { data, loading } = useQuery(FILE_ENTITY_QUERY, {
    variables: {
      filters,
    },
  });

  if (loading) {
    return { data: null, loading: true };
  } else if (!loading && data) {
    console.log('entity data', data);

    const entity = data.file.hits.edges[0].node;

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

    const entityData: FileEntityData = {
      summary,
      dataAnalysis,
      donorRecords: dummyAssociatedDonorsInfo,
      fileRecords: dummyFileRecords,
    };

    return { programShortName, entityData, loading };
  }
};

export default useFileEntityData;
