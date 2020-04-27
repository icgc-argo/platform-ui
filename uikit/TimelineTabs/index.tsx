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

const TIMELINE_TYPES = {
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
};

const mock = [
  {
    type: 'primary_diagnosis',
    id: 'PRIMARY DIAGNOSIS PD1',
    description: 'Malignant neoplasm of pancreatic something something',
    interval: 242222,
  },
  { type: 'specimen', id: 'SPECIMEN SP0013', description: 'Normal', interval: 2 },
  { type: 'specimen', id: 'SPECIMEN SP0032', description: 'Tumour', interval: 353 },
  { type: 'specimen', id: 'SPECIMEN SP2123', description: 'Tumour', interval: 3535353 },
  { type: 'specimen', id: 'SPECIMEN SP0123', description: 'Tumour', interval: 66 },
  { type: 'treatment', id: 'TREATMENT TR8982', description: 'Chemotherapy', interval: 33333 },
  { type: 'treatment', id: 'TREATMENT TR8982', description: 'Ablation', interval: 888774341 },
  {
    type: 'treatment',
    id: 'TREATMENT TR8982',
    description: 'Loco-regional progression',
    interval: 13241241414141,
  },
  { type: 'follow_up', id: 'FOLLOW UP FO2123', description: 'Relapse', interval: 111 },
];

const DayCount = ({ days }) => (
  <div
    css={css`
      height: 46px;
      display: flex;
      align-items: center;
    `}
  >
    <Typography
      variant="data"
      css={css`
        margin-right: 12px;
        text-align: right;
      `}
    >
      {days}
    </Typography>
  </div>
);

const TimelineItem = withTheme(({ id, description, index, type }) => {
  const { backgroundColor, borderColor } = TIMELINE_TYPES[type];
  return (
    <div
      css={css`
        height: 46px;
        display: flex;
        align-items: center;
        width: 100%;
        ${index === 2
          ? css`
              border: 1px solid ${borderColor};
              margin: 0 -1px;
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

const Timeline = withTheme(({ entities, theme }) => (
  <div
    css={css`
      height: 100%;
      display: flex;
    `}
  >
    <div>
      {entities.map(({ type, interval }, i) => (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;

            &::after {
              content: '';
              display: inline-block;
              width: 7px;
              height: 7px;
              border-radius: 25px;
              background-color: ${TIMELINE_TYPES[type].borderColor};
              position: relative;
              left: 4px;
              z-index: 2;
            }
          `}
        >
          <DayCount days={interval} />
        </div>
      ))}
    </div>
    <div
      css={css`
        flex: 1;
        border: 1px solid grey;
        width: 350px;
      `}
    >
      {entities.map(({ id, description, type }, i) => (
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <TimelineItem type={type} id={id} description={description} index={i} />
        </div>
      ))}
    </div>
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
            {/*
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
            />*/}
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

  return (
    <Container
      css={css`
        padding: 12px 14px;
        height: 750px;
        display: flex;
        flex-direction: column;
      `}
    >
      <Header entities={activeEntities} />
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
          Interval since diagnosis (days)
        </div>
        <Timeline entities={mock} />
      </div>
    </Container>
  );
};

export default Component;
