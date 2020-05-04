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
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'uikit/ThemeProvider';
import NoData from 'uikit/NoData';
import noDataSvg from '../../../../../static/illustration_heart.svg';

let mock = [
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

mock = [];

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

  const [activeEntity, setActiveEntity] = React.useState<Entity>(mock[0]);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const activeEntityData = get(activeEntity, 'data', []);
  const activeEntitySamples = get(activeEntity, 'samples', []);

  const filteredMock = mock.filter(
    ({ type }) => activeEntities.includes(type) || type === EntityType.DECEASED,
  );

  const theme = useTheme();

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
        entities={mock}
        activeEntities={activeEntities}
        setFilters={activeEntities => {
          setActiveTab(0);
          setActiveEntity(filteredMock[0]);
          setActiveEntities(activeEntities);
        }}
      />
      <div
        css={css`
          display: flex;
          flex: 1;
        `}
      >
        {mock.length > 0 ? (
          <>
            <div
              css={css`
                writing-mode: vertical-lr;
                transform: rotate(180deg);
                margin-right: 50px;
                text-align: center;
              `}
            >
              <Typography variant="data">Interval since diagnosis (days)</Typography>
            </div>
            <Timeline
              entities={filteredMock}
              activeTab={activeTab}
              onClickTab={({ entity, idx }) => {
                setActiveEntity(entity);
                setActiveTab(idx);
              }}
            />

            <Row
              style={{
                flex: 1,
                padding: '10px 20px',
                border: `1px solid ${theme.colors.grey_1}`,
                marginLeft: '-1px',
              }}
            >
              <Col>
                <Typography variant="navigation">
                  {ENTITY_DISPLAY[activeEntity.type].title}
                </Typography>
                <div
                  css={css`
                    display: flex;
                    margin-top: 10px;
                  `}
                >
                  <DonorDataTable data={activeEntityData} />
                </div>
              </Col>
              {activeEntitySamples.length > 0 ? (
                <Col>
                  <Typography variant="navigation">
                    Samples from this Specimen ({activeEntitySamples.length})
                  </Typography>
                  <Samples samples={activeEntitySamples} />
                </Col>
              ) : null}
            </Row>
          </>
        ) : (
          <NoData
            css={css`
              flex: 1;
            `}
            title="There is no clinical timeline data for this donor."
          >
            {' '}
            <img alt="no data found." src={noDataSvg} />
          </NoData>
        )}
      </div>
    </Container>
  );
};

export default ClinicalTimeline;
