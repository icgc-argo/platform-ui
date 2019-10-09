export type ClinicalSubmissionRecord = {
  row: number;
  fields: {
    value: string;
    name: string;
  }[];
};

export type ClinicalSubmissionError = {
  type: string;
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

export type ClinicalSubmissionEntityFile = {
  clinicalType: string;
  displayName: string | null;
  recordsCount?: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'NONE';

  createdAt: string;
  creator: string;
  fileName: string;
  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  schemaErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
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
};
export type GqlClinicalSubmissionData = {
  id: string;
  version: string;
  state: 'OPEN' | 'VALID' | 'INVALID' | 'PENDING_APPROVAL';
  clinicalEntities: GqlClinicalEntity[];
  fileErrors: ClinicalError[];
  __typename: 'ClinicalSubmissionData';
};
export type ClinicalError = {
  msg: string;
  fileNames: string[];
  code: string;
  __typename: 'ClinicalError';
};

export type UploadFilesMutationVariables = {
  programShortName: string;
  files: FileList;
};

export type ValidateSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
};

export type ApproveSubmissionMutationVariables = {
  programShortName: string;
  submissionVersion: string;
};

export type ClinicalSubmissionQueryData = {
  clinicalSubmissions: GqlClinicalSubmissionData;
};
