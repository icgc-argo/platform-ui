import React from 'react';
import Container from 'uikit/Container';
import { css } from 'uikit';
import Header from './header';
import Timeline from './timeline';
import { EntityType, Entity } from './types';
import Typography from 'uikit/Typography';
import DonorDataTable from './table';
import get from 'lodash/get';
import Samples from './samples';

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
  { type: EntityType.SPECIMEN, id: 'SPECIMEN SP0032', description: 'Tumour', interval: 353 },
  { type: EntityType.SPECIMEN, id: 'SPECIMEN SP2123', description: 'Tumour', interval: 3535353 },
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
  },
  { type: EntityType.FOLLOW_UP, id: 'FOLLOW UP FO2123', description: 'Relapse', interval: 111 },
  { type: EntityType.DECEASED, id: 'Vital Status', description: 'Deceased', interval: 330 },
];

export const ENTITY_DISPLAY = Object.freeze({
  primary_diagnosis: {
    title: 'Primary Diagnosis',
  },
  specimen: {
    title: 'Specimen',
  },
  treatment: {
    title: 'Treatment',
  },
  follow_up: {
    title: 'Follow Up',
  },
});

const ClinicalTimeline = () => {
  const [activeEntities, setActiveEntities] = React.useState<Array<EntityType>>([
    EntityType.FOLLOW_UP,
    EntityType.PRIMARY_DIAGNOSIS,
    EntityType.SPECIMEN,
    EntityType.TREATMENT,
  ]);

  // TODO: BAD NAMING
  const [activeEntityIndex, setActiveEntityIndex] = React.useState<number>(0);
  const activeEntity: Entity = mock[activeEntityIndex];
  const activeEntitySamples: Entity['samples'] = get(activeEntity, 'samples', []);

  const entityCounts = mock
    .filter(entity => entity.type !== EntityType.DECEASED)
    .reduce(
      (acc, entity) => {
        const { type } = entity;
        acc[type]++;
        return acc;
      },
      { primary_diagnosis: 0, specimen: 0, treatment: 0, follow_up: 0 },
    );

  return (
    <Container
      css={css`
        padding: 12px 14px;
        height: 750px;
        display: flex;
        flex-direction: column;
      `}
    >
      <Header
        entityCounts={entityCounts}
        activeEntities={activeEntities}
        setFilters={activeEntities => setActiveEntities(activeEntities)}
      />
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            writing-mode: vertical-lr;
            transform: rotate(180deg);
            margin-right: 50px;
            text-align: center;
          `}
        >
          {/**
           *
           * TODO: TYPOGRAPHY!
           */}
          Interval since diagnosis (days)
        </div>
        <Timeline
          entities={mock.filter(
            ({ type }) => activeEntities.includes(type) || type === EntityType.DECEASED,
          )}
          onClickTab={idx => setActiveEntityIndex(idx)}
        />
        {/**
         * TODO: ROWS AND COLS
         */}
        <div>
          <Typography variant="navigation">{ENTITY_DISPLAY[activeEntity.type].title}</Typography>
          <div
            css={css`
              display: flex;
              margin-top: 10px;
            `}
          >
            <DonorDataTable
              data={{
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
              }}
            />
          </div>
          {activeEntitySamples.length > 0 ? (
            <>
              <Typography variant="navigation">
                Samples from this Specimen ({activeEntitySamples.length})
              </Typography>
              <Samples samples={activeEntitySamples} />
            </>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default ClinicalTimeline;
