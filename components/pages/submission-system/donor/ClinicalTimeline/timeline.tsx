import React from 'react';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import { getTimelineStyles } from './util';
import useTheme from 'uikit/utils/useTheme';
import VerticalTabs from 'uikit/VerticalTabs';
import { Entity, EntityType } from './types';
import { InvalidIcon } from './common';

const DayCount = ({
  days,
  format = days => days.toLocaleString(),
}: {
  days: number;
  format?: (number) => string;
}) => (
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
      {format(days)}
    </Typography>
  </div>
);

type TimeLineItemProps = {
  item: Pick<Entity, 'id' | 'description' | 'type' | 'invalid'>;
  onClick?: () => void;
  disabled?: boolean;
  active: boolean;
};

const TimelineItem = ({ item, active, onClick, disabled }: TimeLineItemProps) => {
  const { type, description, id, invalid } = item;
  const theme = useTheme();
  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);
  const { backgroundColor, borderColor } = timelineStyles[type];

  return (
    <div
      onClick={() => !disabled && onClick()}
      css={css`
        height: 46px;
        display: flex;
        align-items: center;
        width: 100%;
        ${active
          ? css`
              border: 1px solid ${borderColor};
              margin: -1px;
            `
          : null};
      `}
    >
      <VerticalTabs.Item
        tabStyle={{ border: borderColor, background: backgroundColor }}
        css={css`
          height: 100%;
          width: 100%;
          border: 0;
          color: black;
          &:focus {
            ${disabled
              ? css`
                  box-shadow: none;
                `
              : null};
          }
          &:hover {
            ${disabled
              ? css`
                  background: white;
                  cursor: default;
                `
              : null}
          }
        `}
        active={active}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <Typography variant="caption" as="div">
              {id}
            </Typography>
            {invalid ? (
              <InvalidIcon
                css={css`
                  margin-right: 5px;
                `}
              />
            ) : null}
          </div>
          <Typography
            variant="data"
            as="div"
            css={css`
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
            bold={type !== EntityType.DECEASED}
          >
            {description}
          </Typography>
        </div>{' '}
      </VerticalTabs.Item>
    </div>
  );
};

const Timeline = ({
  entities,
  onClickTab,
  activeTab,
}: {
  entities: Array<Entity>;
  activeTab: number;
  onClickTab: ({ entity: Entity, idx: number }) => void;
}) => {
  const theme = useTheme();
  const timelineStyles = React.useMemo(() => getTimelineStyles(theme), [theme]);

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        width: 40px; /* Width for 5 digits which is approximately 270 years */
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
                background-color: ${timelineStyles[type].borderColor};
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
          border: 1px solid ${theme.colors.grey_1};
          width: 350px;
        `}
      >
        {entities.map((entity, i) => (
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <TimelineItem
              item={entity}
              disabled={entity.type === EntityType.DECEASED}
              active={activeTab === i}
              onClick={() => onClickTab({ entity, idx: i })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
