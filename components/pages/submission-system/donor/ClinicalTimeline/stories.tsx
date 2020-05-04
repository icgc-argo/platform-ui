import { storiesOf } from '@storybook/react';
import React from 'react';
import ClinicalTimeline from '.';
import { EntityType } from './types';
import { select } from '@storybook/addon-knobs';

const mock = [
  {
    type: EntityType.PRIMARY_DIAGNOSIS,
    id: 'PRIMARY DIAGNOSIS PD1',
    description: 'Malignant neoplasm of pancreatic something something',
    interval: 242222,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplam of pancreas',
      'Number of Positive Lymph Nodes': '2',
      'Number of Examined Lymph Nodes': '',
      'Clinical Tumour Staging System': 'Binet',
      'Clinical Stage Group': '',
      'Stage Suffix': 'A',
      'Clinical T Category': '',
      'Clinical N Category': '',
      'Clinical M Category': '',
      'Presenting Symptoms': 'Back Pain',
      'Performance Status': '',
    },
  },
  {
    type: EntityType.SPECIMEN,
    id: 'SPECIMEN SP0013',
    description: 'Normal',
    interval: 2,
    data: {
      'Primary Diagnosis ID': 'PD1',
      'Age at Diagnosis': '28 years',
      'Cancer Type Code': 'C25.3',
      'Cancer Type': 'Malignant neoplam of pancreas',
      'Number of Positive Lymph Nodes': '2',
      'Number of Examined Lymph Nodes': '',
      'Clinical Tumour Staging System': 'Binet',
      'Clinical Stage Group': '',
    },
    samples: [{ id: 'SAB5353', type: 'Amplified DNA' }, { id: 'SAD3053', type: 'Total DNA' }],
  },
  {
    type: EntityType.SPECIMEN,
    id: 'SPECIMEN SP0032',
    description: 'Tumour',
    interval: 353,
    data: {
      'Primary Diagnosis ID': 'PD1',
    },
  },
  {
    type: EntityType.SPECIMEN,
    id: 'SPECIMEN SP2123',
    description: 'Tumour',
    interval: 3535353,
    data: {
      'Age at Diagnosis': '28 years',
    },
    invalid: true,
  },
  { type: EntityType.SPECIMEN, id: 'SPECIMEN SP0123', description: 'Tumour', interval: 66 },
  {
    type: EntityType.TREATMENT,
    id: 'TREATMENT TR8982',
    description: 'Chemotherapy',
    interval: 33333,
  },
  {
    type: EntityType.TREATMENT,
    id: 'TREATMENT TR8982',
    description: 'Ablation',
    interval: 888774341,
  },
  {
    type: EntityType.TREATMENT,
    id: 'TREATMENT TR8982',
    description: 'Loco-regional progression',
    interval: 13241241414141,
    data: {
      'Clinical Stage Group': '',
    },
  },
  { type: EntityType.FOLLOW_UP, id: 'FOLLOW UP FO2123', description: 'Relapse', interval: 111 },
  { type: EntityType.DECEASED, id: 'Vital Status', description: 'Deceased', interval: 330 },
];

const ClinicalTimelineStories = storiesOf(`${__dirname}`, module).add('Basic', () => {
  const knobs = () => {
    const options = {
      full: mock,
      noData: [],
    };
    return { data: select('Data', options, options.full) };
  };

  return <ClinicalTimeline data={knobs().data} />;
});

export default ClinicalTimelineStories;
