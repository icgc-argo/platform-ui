export enum FileCentricDocumentField {
  'analysis.experiment.experimental_strategy' = 'analysis.experiment.experimental_strategy',
  analysis_tools = 'analysis_tools',
  'analysis.variant_class' = 'analysis.variant_class',
  'analysis.workflow.workflow_name' = 'analysis.workflow.workflow_name',
  data_category = 'data_category',
  data_type = 'data_type',
  'donors.donor_id' = 'donors.donor_id',
  'donors.gender' = 'donors.gender',
  'donors.submitter_donor_id' = 'donors.submitter_donor_id',
  'donors.specimens.specimen_tissue_source' = 'donors.specimens.specimen_tissue_source',
  'donors.specimens.specimen_type' = 'donors.specimens.specimen_type',
  file_access = 'file_access',
  'file.size' = 'file.size',
  file_type = 'file_type',
  object_id = 'object_id',
  study_id = 'study_id',
  release_stage = 'release_stage',
}

export type FileRepositoryTSVColumn = {
  header: string;
  getter: string;
};
