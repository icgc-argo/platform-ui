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

export const clinicalEntityFilters: ClinicalFilter = {
  entityTypes: [
    'sampleRegistration',
    'donor',
    'specimens',
    'primaryDiagnoses',
    'familyHistory',
    'treatment',
    'chemotherapy',
    'immunotherapy',
    'surgery',
    'radiation',
    'followUps',
    'hormoneTherapy',
    'exposure',
    'comorbidity',
    'biomarker',
  ],
  page: 0,
  limit: 20,
  donorIds: [],
  submitterDonorIds: [],
  completionState: CompletionStates['all'],
  sort: '-donorId',
};
