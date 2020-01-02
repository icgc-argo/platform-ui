export type ClinicalSubmissionRecord = {
  row: number;
  fields: {
    value: string;
    name: string;
  }[];
};

export type ClinicalSubmissionError = {
  message: string;
  row: number;
  field: string;
  value: string;
  donorId: string;
  __typename: 'ClinicalSubmissionError';
};

export type ClinicalSubmissionUpdate = {
  row: number;
  field: string;
  newValue: string;
  oldValue: string;
  donorId: string;
  __typename: 'ClinicalSubmissionUpdate';
};

export type ClinicalSubmissionStatus =
  | 'OPEN'
  | 'VALID'
  | 'INVALID'
  | 'PENDING_APPROVAL'
  | 'INVALID_BY_MIGRATION'
  | null;

export type ClinicalSubmissionEntityFile = {
  clinicalType: string;
  displayName: string | null;
  recordsCount?: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'NONE' | 'UPDATE';

  createdAt: string;
  creator: string;
  fileName: string;
  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  schemaErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
  stats: GqlClinicalEntity['stats'];
};

export type GqlClinicalEntity = {
  clinicalType: string;
  batchName?: string;
  creator: string;
  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  schemaErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
  createdAt: string;
  stats?: {
    noUpdate: Array<ClinicalSubmissionRecord['row']>;
    updated: Array<ClinicalSubmissionRecord['row']>;
    new: Array<ClinicalSubmissionRecord['row']>;
    errorsFound: Array<ClinicalSubmissionRecord['row']>;
  };
};
export type GqlClinicalSubmissionData = {
  id: string;
  version: string;
  programShortName: string;
  state?: ClinicalSubmissionStatus;
  updatedAt: string;
  updatedBy: string;
  clinicalEntities: GqlClinicalEntity[];
  fileErrors: ClinicalError[];
  __typename: 'ClinicalSubmissionData';
};
export type ClinicalError = {
  message: string;
  fileNames: string[];
  code: string;
  __typename: 'ClinicalFileError';
};

export type UploadFilesMutationVariables = {
  programShortName: string;
  files: FileList;
};

export type ValidateSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
};

export type SignOffSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
};

export type ClearSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
  fileType?: string;
};

export type ClinicalSubmissionQueryData = {
  clinicalSubmissions: GqlClinicalSubmissionData;
};
