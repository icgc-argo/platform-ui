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

export enum Entities {
  PRIMARY_DIAGNOSIS = 'Primary Diagnosis',
  SPECIMEN = 'Speciment',
  TREATMENT = 'Treatment',
  FOLLOW_UP = 'Follow Up',
}

const TIMELINE_TYPES = {
  PRIMARY_DIAGNOSIS: {
    title: 'Primary Diagnosis',
    borderColor: colors.secondary_1,
    backgroundColor: colors.secondary_4,
  },
  SPECIMEN: {
    title: 'Specimen',
    borderColor: colors.accent3,
    backgroundColor: colors.accent3_4,
  },
  TREATMENT: {
    title: 'Treatment',
    borderColor: colors.accent4_1,
    backgroundColor: colors.accent4_4,
  },
  FOLLOW_UP: {
    title: 'Follow Up',
    borderColor: colors.accent2_1,
    backgroundColor: colors.accent2_4,
  },
};

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

const DayCount = ({ days }) => (
  <Typography
    variant="data"
    css={css`
      margin-right: 12px;
      text-align: right;
    `}
  >
    {days}
  </Typography>
);

const TimelineItem = withTheme(({ id, description, index, type, theme }) => {
  const { backgroundColor, borderColor } = TIMELINE_TYPES[type];
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin: 0 -1px;
        border: 1px solid ${theme.colors.grey_1};
        border-top: none;
        border-bottom: none;
        ${index === 2
          ? css`
              border: 1px solid ${borderColor};
            `
          : null};
      `}
    >
      <VerticalTabs.Item
        tabStyle={{ border: borderColor, background: backgroundColor }} // border and background, then we can match it, no logic so dont pass Triangle component
        css={css`
          width: 100%;
          border: 0;
          color: black;
        `}
        active={index === 2}
      >
        <div>
          <Typography variant="caption" as="div">
            {id}
          </Typography>
          <Typography variant="data" as="div" bold>
            {description}
          </Typography>
        </div>
      </VerticalTabs.Item>
    </div>
  );
});

const TimelineTabs = styled(VerticalTabs)``;

const Timeline = withTheme(({ entities, theme }) => (
  <div
    css={css`
      flex: 1;
      border: 1px solid ${theme.colors.grey_1};
    `}
  >
    {entities.map(({ id, description, type }, i) => (
      <>
        <div className="day">{random(99, 123)}</div>
        <TimelineItem type={type} id={id} description={description} index={i} />
      </>
    ))}
  </div>
));

const Header = withTheme(({ entities, theme }) => (
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
        ${css(theme.typography.data as any)};
      `}
    >
      Show:
      {mock.map(({ type }) => {
        const { title, color } = TIMELINE_TYPES[type];

        return (
          <div
            css={css`
              margin-left: 3px;
              display: flex;
            `}
          >
            <Checkbox
              value={title}
              checked={activeEntities.includes(type)}
              onChange={() =>
                setActiveEntities(
                  activeEntities.includes(type)
                    ? activeEntities.filter(e => e !== type)
                    : [...activeEntities, type],
                )
              }
              aria-label={title}
              color={color}
            />
            <label
              css={css`
                margin-left: 8px;
              `}
            >
              {title}
            </label>
          </div>
        );
      })}
    </div>
  </div>
));

type ComponentProps = {};
const Component: React.ComponentType<ComponentProps> = () => {
  const [activeEntities, setActiveEntities] = React.useState([]);

  const headerData = mock.reduce(
    (acc, entity) => {
      const { type } = entity;
      console.log('type', type);
      acc[type] + 1;
      return acc;
    },
    { 'Primary Diagnosis': 0, Specimen: 0, Treatment: 0, 'Follow Up': 0 },
  );
  console.log('header data', headerData);
  return (
    <Container
      css={css`
        padding: 12px 14px;
        height: 750px;
        display: flex;
        flex-direction: column;
      `}
    />
  );
};

export default Component;
