import { Values } from 'global/utils/typeUtils';

export const FileCentricDocumentFields = {
  'analysis.experiment.experimental_strategy': 'analysis.experiment.experimental_strategy',
  'analysis.variant_class': 'analysis.variant_class',
  'analysis.workflow.workflow_name': 'analysis.workflow.workflow_name',
  analysis_tools: 'analysis_tools',
  data_category: 'data_category',
  data_type: 'data_type',
  'donors.donor_id': 'donors.donor_id',
  'donors.gender': 'donors.gender',
  'donors.submitter_donor_id': 'donors.submitter_donor_id',
  'donors.specimens.specimen_tissue_source': 'donors.specimens.specimen_tissue_source',
  'donors.specimens.specimen_type': 'donors.specimens.specimen_type',
  embargo_stage: 'embargo_stage',
  'file.size': 'file.size',
  file_access: 'file_access',
  file_id: 'file_id',
  file_number: 'file_number',
  file_type: 'file_type',
  has_clinical_data: 'has_clinical_data',
  object_id: 'object_id',
  release_state: 'release_state',
  study_id: 'study_id',
};

export type FileCentricDocumentField = Values<typeof FileCentricDocumentFields>;

export type FileRepositoryTSVColumn = {
  header: string;
  getter: string;
};
