import React from 'react';
import Typography from 'uikit/Typography';
import Container from 'uikit/Container';
import Checkbox from 'uikit/form/Checkbox';
import { css, styled } from 'uikit';
import useTheme from '../utils/useTheme';
import VerticalTabs from 'uikit/VerticalTabs';
import { withTheme } from 'emotion-theming';
import random from 'lodash/random';
import colors from '../theme/defaultTheme/colors';

const TIMELINE_TYPES = Object.freeze({
  primary_diagnosis: {
    title: 'Primary Diagnosis',
    borderColor: colors.secondary_1,
    backgroundColor: colors.secondary_4,
  },
  specimen: {
    title: 'Specimen',
    borderColor: colors.accent3,
    backgroundColor: colors.accent3_4,
  },
  treatment: {
    title: 'Treatment',
    borderColor: colors.accent4_1,
    backgroundColor: colors.accent4_4,
  },
  follow_up: {
    title: 'Follow Up',
    borderColor: colors.accent2_1,
    backgroundColor: colors.accent2_4,
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

const Header = ({ entityCounts }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid ${theme.colors.grey_2};
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
        {Object.keys(entityCounts).map(entityKey => {
          const { title, color } = TIMELINE_TYPES[entityKey];
          const count = entityCounts[entityKey];

          return (
            <div
              css={css`
                margin-left: 3px;
                display: flex;
              `}
            >
              <Checkbox
                value={title}
                checked
                onChange={x => x}
                aria-label={title}
                disabled={count <= 0}
              />

              <label
                css={css`
                  margin-left: 8px;
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

type ComponentProps = {};
const Component: React.ComponentType<ComponentProps> = () => {
  const [activeEntities, setActiveEntities] = React.useState([]);

  const entityCounts = mock.reduce(
    (acc, entity) => {
      const { type } = entity;
      console.log('type', type);
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
      <Header entityCounts={entityCounts} />
    </Container>
  );
};

export default Component;
