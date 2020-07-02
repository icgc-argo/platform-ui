export enum FileAccessState {
  CONTROLLED = 'Controlled',
}

export type FileSummaryInfo = {
  fileId: string;
  objectId: string;
  fileFormat: string;
  size: number;
  access: FileAccessState;
  program: string;
  checksum: string;
  repoName: string;
  repoCountry: string;
};

export type DataAnalysisInfo = {
  experimentalStrategy: string;
  dataType: string;
  platform: string;
  genomeBuild: string;
  workflowType: string;
  software: string;
};

export type DonorRecord = {
  donorId: string;
  submitterDonorId: string;
  primarySite: string;
  cancerType: string;
  ageAtDiagnosis: string;
  associations: Associations;
};

export type Associations = {
  specimenId: string;
  tumourNormalDesignation: string;
  sampleId: string;
  sampleType: string;
  matchedNormalSampleId: string;
};

export type FileRecord = {
  fileId: string;
  dataType: string;
  analysisWorkflow: string;
  fileFormat: string;
  fileSize: number;
  actions: FileAccessState;
};

export type FileEntityData = {
  summary: FileSummaryInfo;
  dataAnalysis: DataAnalysisInfo;
  donorRecords: Array<DonorRecord>;
  fileRecords: Array<FileRecord>;
};
