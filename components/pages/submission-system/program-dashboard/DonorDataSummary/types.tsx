export type DonorEntityRecord = {
  releaseState: ReleasedFilesState;
  donorId: string;
  coreFields: number;
  extendedFields: number;
  samples: TumourDesignationPair;
  rawReads: TumourDesignationPair;
  alignment: PipelineStats;
  sangerVC: PipelineStats;
  processingStatus: ProcessingStates;
  lastUpdated: Date | String;
};

export type ReleasedFilesState = 'FULLY' | 'PARTIALLY' | 'NO';

export type TumourDesignationPair = {
  normal: number;
  tumour: number;
};

export type PipelineStats = {
  complete: number;
  inProgress: number;
  error: number;
};

export type ProcessingStates = 'Registered' | 'Processing' | 'Complete';
