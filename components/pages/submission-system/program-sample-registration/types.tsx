export type ClinicalRegistrationError = {
  type: string;
  message: string;
  row: number;
  field: string;
  value: string;
  sampleId: string;
  donorId: string;
  specimenId: string;
  __typename: 'ClinicalRegistrationError';
};

type ClinicalRegistrationStats = {
  count: number;
  rows: number[];
};

export type ClinicalRegistrationRecord = {
  name: string;
  value: string;
};

export type ClinicalRegistrationData = {
  row: number;
  fields: ClinicalRegistrationRecord[];
};

export type ClinicalRegistration = {
  alreadyRegistered: ClinicalRegistrationStats;
  createdAt: string;
  creator: string;
  errors: ClinicalRegistrationError[];
  records: ClinicalRegistrationData[];
  fileName: string;
  id: string;
  newDonors: ClinicalRegistrationStats;
  newSamples: ClinicalRegistrationStats;
  newSpecimens: ClinicalRegistrationStats;
  programShortName: string;
};

export type RegisterState = 'INPROGRESS' | 'FINISHED' | '';
