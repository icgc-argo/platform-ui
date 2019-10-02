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
  id: string;
  displayName: string;
  recordsCount?: number;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'NONE';

  records: ClinicalSubmissionRecord[];
  dataErrors: ClinicalSubmissionError[];
  dataUpdates: ClinicalSubmissionUpdate[];
};
