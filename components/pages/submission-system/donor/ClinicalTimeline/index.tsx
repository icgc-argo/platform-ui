import React from 'react';
import Container from 'uikit/Container';
import { css } from 'uikit';
import Header from './header';
import Timeline from './timeline';
import { EntityType } from './types';
const mock = [
  {
    type: EntityType.PRIMARY_DIAGNOSIS,
    id: 'PRIMARY DIAGNOSIS PD1',
    description: 'Malignant neoplasm of pancreatic something something',
    interval: 242222,
  },
  { type: EntityType.SPECIMEN, id: 'SPECIMEN SP0013', description: 'Normal', interval: 2 },
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

  const entityCounts = mock.reduce(
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
            background: red;
          `}
        />
        <div
          css={css`
            writing-mode: vertical-lr;
            transform: rotate(180deg);
            margin-right: 50px;
            text-align: center;
          `}
        >
          Interval since diagnosis (days)
        </div>
        <Timeline entities={mock.filter(({ type }) => activeEntities.includes(type))} />
      </div>
    </Container>
  );
};

export default ClinicalTimeline;
