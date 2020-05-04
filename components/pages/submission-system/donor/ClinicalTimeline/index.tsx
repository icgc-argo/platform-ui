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

const ClinicalTimeline = ({ data }) => {
  const [activeEntities, setActiveEntities] = React.useState<Array<EntityType>>([
    EntityType.FOLLOW_UP,
    EntityType.PRIMARY_DIAGNOSIS,
    EntityType.SPECIMEN,
    EntityType.TREATMENT,
  ]);

  const [activeEntity, setActiveEntity] = React.useState<Entity>(data[0]);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const activeEntityData = get(activeEntity, 'data', []);
  const activeEntitySamples = get(activeEntity, 'samples', []);

  const filteredData = data.filter(
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
        entities={data}
        activeEntities={activeEntities}
        onFiltersChange={activeEntities => {
          setActiveTab(0);
          setActiveEntity(filteredData[0]);
          setActiveEntities(activeEntities);
        }}
      />
      <div
        css={css`
          display: flex;
          flex: 1;
        `}
      >
        {data.length > 0 ? (
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
              entities={filteredData}
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
