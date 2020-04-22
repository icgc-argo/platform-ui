import React from 'react';
import Typography from 'uikit/Typography';
import Container from 'uikit/Container';
import Checkbox from 'uikit/form/Checkbox';
import { css } from 'uikit';
import useTheme from 'uikit/utils/useTheme';
import defaultTheme from 'uikit/theme/defaultTheme';

const getTimelineStyles = (theme: typeof defaultTheme) => {
  const colors = theme.colors;
  return {
    primary_diagnosis: {
      checkboxColor: colors.secondary,
      borderColor: colors.secondary_1,
      backgroundColor: colors.secondary_4,
    },
    specimen: {
      checkboxColor: colors.accent3_dark,
      borderColor: colors.accent3,
      backgroundColor: colors.accent3_4,
    },
    treatment: {
      checkboxColor: colors.accent4,
      borderColor: colors.accent4_1,
      backgroundColor: colors.accent4_4,
    },
    follow_up: {
      checkboxColor: colors.accent2,
      borderColor: colors.accent2_1,
      backgroundColor: colors.accent2_4,
    },
  };
};

const ENTITY_DISPLAY = Object.freeze({
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

const mock = [
  {
    type: 'primary_diagnosis',
    id: 'PRIMARY DIAGNOSIS PD1',
    description: 'Malignant neoplasm of pancreatic something something',
  },
  { type: 'specimen', id: 'SPECIMEN SP0013', description: 'Normal' },
  { type: 'specimen', id: 'SPECIMEN SP0032', description: 'Tumour' },
  { type: 'specimen', id: 'SPECIMEN SP2123', description: 'Tumour' },
  { type: 'specimen', id: 'SPECIMEN SP0123', description: 'Tumour' },
  { type: 'treatment', id: 'TREATMENT TR8982', description: 'Chemotherapy' },
  { type: 'treatment', id: 'TREATMENT TR8982', description: 'Ablation' },
  { type: 'treatment', id: 'TREATMENT TR8982', description: 'Loco-regional progression' },
  { type: 'follow_up', id: 'FOLLOW UP FO2123', description: 'Relapse' },
];

type EntityType = 'primary_diagnosis' | 'specimen' | 'treatment' | 'follow_up';
type Entity = { type: EntityType; id: string; description: string };
type HeaderTypes = {
  entityCounts: { [k in EntityType]: number };
  activeEntities: Array<EntityType>;
  setFilters: (e: Array<EntityType>) => void;
};

const Header = ({ entityCounts, activeEntities, setFilters }: HeaderTypes) => {
  const theme = useTheme();
  const counts: Array<EntityType> = Object.keys(entityCounts) as Array<EntityType>;

  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding-bottom: 9px;
        margin-bottom: 15px;
      `}
    >
      <Typography variant="default">Clinical Timeline</Typography>
      <div
        css={css`
          display: flex;

          > div {
            margin-left: 18px;
          }

          div:first-child {
            margin-left: 6px;
          }

          ${css(theme.typography.data as any)};
        `}
      >
        Show:
        {counts.map(entityKey => {
          const { checkboxColor } = timelineStyles[entityKey];
          const { title } = ENTITY_DISPLAY[entityKey];
          const count = entityCounts[entityKey];

          const changeFilter = () =>
            setFilters(
              activeEntities.includes(entityKey)
                ? activeEntities.filter(e => e !== entityKey)
                : [...activeEntities, entityKey],
            );

          return (
            <div
              css={css`
                margin-left: 3px;
                display: flex;
                &:hover {
                  cursor: pointer;
                }
              `}
              onClick={changeFilter}
            >
              <Checkbox
                value={title}
                checked={activeEntities.includes(entityKey)}
                onChange={changeFilter}
                aria-label={title}
                disabled={count <= 0 || !activeEntities.includes(entityKey)}
                color={checkboxColor}
              />

              <label
                css={css`
                  margin-left: 8px;
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                {`${count} ${title}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ClinicalTimeline = () => {
  const [activeEntities, setActiveEntities] = React.useState<Array<EntityType>>([
    'primary_diagnosis',
    'specimen',
    'treatment',
    'follow_up',
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
      <div>
        {mock
          .filter(d => activeEntities.includes(d.type as EntityType))
          .map(d => (
            <p>{d.type}</p>
          ))}
      </div>
    </Container>
  );
};

export default ClinicalTimeline;
