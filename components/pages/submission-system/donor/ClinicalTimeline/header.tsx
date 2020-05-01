import React from 'react';
import Checkbox from 'uikit/form/Checkbox';
import Typography from 'uikit/Typography';
import useTheme from 'uikit/utils/useTheme';
import { getTimelineStyles } from './util';
import { css } from 'uikit';
import { ENTITY_DISPLAY } from './index';
import { EntityType, Entity } from './types';

type HeaderTypes = {
  entities: Array<Entity>;
  activeEntities: Array<EntityType>;
  setFilters: (e: Array<EntityType>) => void;
};

type Filters = Exclude<EntityType, 'deceased'>;
type EntityCounts = { [k in Filters]: number };

export default ({ entities, activeEntities, setFilters }: HeaderTypes) => {
  const theme = useTheme();

  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);

  const entityCounts: EntityCounts = entities
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
        {(Object.keys(entityCounts) as Array<Filters>).map(entityKey => {
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
