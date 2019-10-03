import { ClinicalSubmissionEntityFile } from './types';

export const MOCK_FILE_STATE: Array<ClinicalSubmissionEntityFile> = [
  {
    id: 'donors',
    displayName: 'Donors',
    recordsCount: 2,
    status: 'ERROR',
    records: [
      {
        row: 0,
        fields: [
          {
            name: 'field_1',
            value: 'sdf',
          },
          {
            name: 'field_2',
            value: 'sdf',
          },
          {
            name: 'field_3',
            value: 'sdf',
          },
          {
            name: 'field_4',
            value: 'sdf',
          },
        ],
      },
      {
        row: 1,
        fields: [
          {
            name: 'field_1',
            value: 'sdf',
          },
          {
            name: 'field_2',
            value: 'sdf',
          },
          {
            name: 'field_3',
            value: 'sdf',
          },
          {
            name: 'field_4',
            value: 'sdf',
          },
        ],
      },
      {
        row: 2,
        fields: [
          {
            name: 'field_1',
            value: 'sdf',
          },
          {
            name: 'field_2',
            value: 'sdf',
          },
          {
            name: 'field_3',
            value: 'sdf',
          },
          {
            name: 'field_4',
            value: 'sdf',
          },
        ],
      },
    ],
    dataErrors: [
      {
        row: 1,
        donorId: 'asdf',
        field: 'field_2',
        message: 'Something is wrong here',
        type: 'some error type',
        value: '345',
      },
    ],
    dataUpdates: [
      {
        row: 2,
        donorId: 'asdf',
        field: 'field_2',
        newValue: 'sdf_new',
        oldValue: 'sdf',
      },
    ],
  },
  {
    id: 'specimen',
    displayName: 'Specimen',
    recordsCount: 24,
    status: 'SUCCESS',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'sample',
    displayName: 'Sample',
    recordsCount: 43,
    status: 'WARNING',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_1',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_2',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_3',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_4',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_5',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_6',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_7',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_8',
    displayName: 'Primary Diagnosis',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
  {
    id: 'primary_diagnosis_9',
    displayName: 'Some very long text that will for sure overflow to multiple lines',
    status: 'NONE',
    records: [],
    dataErrors: [],
    dataUpdates: [],
  },
];
