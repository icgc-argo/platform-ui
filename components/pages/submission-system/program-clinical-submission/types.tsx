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
};

export type ClinicalSubmissionUpdate = {
  row: number;
  field: string;
  newValue: string;
  oldValue: string;
  donorId: string;
};

export type ClinicalSubmissionEntityFile = {
  clinicalType: string;
  displayName: string | null;
  recordsCount?: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'NONE';

  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
};

export type GqlClinicalEntity = {
  clinicalType: string;
  batchName?: string;
  creator: string;
  version: string;
  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
  createdAt: string;
};
export type GqlClinicalSubmissionData = {
  id: string;
  state: 'OPEN' | 'VALID' | 'INVALID' | 'PENDING_APPROVAL';
  clinicalEntities: GqlClinicalEntity[];
  fileErrors: ClinicalError[];
};
export type ClinicalError = {
  msg: string;
  fileNames: string[];
  code: string;
};
