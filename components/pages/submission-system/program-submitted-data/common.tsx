export enum CoreClinicalEntities {
  'donor',
  'specimens',
  'primaryDiagnosis',
  'followUps',
  'treatments',
}

export enum CompletionStates {
  all = 'all',
  invalid = 'invalid',
  complete = 'complete',
  incomplete = 'incomplete',
}

export type ClinicalEntity = {
  entityName: string;
  entityFields: string[];
  records: Array<{
    name: string;
    value: any;
  }>;
};

export type CompletionStats = {
  coreCompletion: CoreCompletionFields;
  coreCompletionDate: string;
  coreCompletionPercentage: number;
  overriddenCoreCompletion: [CoreClinicalEntities];
};

export type CoreCompletionFields = {
  [k in CoreClinicalEntities]: number;
};

export type ClinicalErrorData = {
  donorId: string;
  submitterDonorId: string;
  errors: {
    entityName: string;
    errorType: string;
    fieldName: string;
    index: number;
    message: string;
  };
};

export type ClinicalEntityQueryResponse = {
  clinicalData: {
    clinicalEntities: Array<ClinicalEntity>;
    completionStats: Array<CompletionStats>;
    clinicalErrors: Array<ClinicalErrorData>;
  };
};

export type ClinicalFilter = {
  entityTypes: string[];
  page: number;
  limit: number;
  donorIds?: string[];
  submitterDonorIds?: string[];
  completionState?: CompletionStates;
  sort?: string;
};

export const clinicalEntityDisplayNames = {
  sampleRegistration: 'Sample Registration',
  donor: 'Donor',
  specimens: 'Specimens',
  primaryDiagnoses: 'Primary Diagnoses',
  familyHistory: 'Family History',
  treatment: 'Treatment',
  chemotherapy: 'Chemotherapy',
  immunotherapy: 'Immunotherapy',
  surgery: 'Surgery',
  radiation: 'Radiation',
  followUps: 'Follow Ups',
  hormoneTherapy: 'Hormone Therapy',
  exposure: 'Exposure',
  comorbidity: 'Comorbidity',
  biomarker: 'Biomarker',
};

export const clinicalEntityFields = Object.keys(clinicalEntityDisplayNames);

export const clinicalEntityFilters: ClinicalFilter = {
  entityTypes: clinicalEntityFields,
  page: 0,
  limit: 20,
  donorIds: [],
  submitterDonorIds: [],
  completionState: CompletionStates['all'],
  sort: '-donorId',
};
